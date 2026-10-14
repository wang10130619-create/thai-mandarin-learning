import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, BookOpen, Check, CheckCircle2, ChevronRight, Clock3, Headphones, Mic, Pause, Play, RotateCcw, Sparkles, Volume2, Waves } from "lucide-react";
import "./Home.css";
import CoursePlan from "./CoursePlan";
import DailyPhrases from "./DailyPhrases";

const lessonSpeech: Record<string, string> = {
  "ฟังเสียงทักทาย": "你好！",
  "เสียงตัวอย่าง: mā · má · mǎ · mà": "妈 麻 马 骂",
  "เปิดเสียงแบบฝึก": "妈 骂 麻 马 麻 妈 马 骂",
  "ฟังตัวอย่างเต็ม": "你好。我叫安娜。我是泰国人。很高兴认识你。",
};

function speakChinese(text: string, rate = 0.78) {
  if (!("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = rate;
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((candidate) => candidate.lang.toLowerCase().startsWith("zh-cn")) ?? voices.find((candidate) => candidate.lang.toLowerCase().startsWith("zh"));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
  return true;
}

const sections = [
  { id: "start", n: "01", title: "เริ่มต้น", time: "5 นาที" },
  { id: "tones", n: "02", title: "รู้จัก 4 เสียง", time: "12 นาที" },
  { id: "listening", n: "03", title: "ฝึกฟัง", time: "8 นาที" },
  { id: "phrases", n: "04", title: "แนะนำตัว", time: "15 นาที" },
  { id: "dialogue", n: "05", title: "พบเพื่อนใหม่", time: "15 นาที" },
  { id: "practice", n: "06", title: "ทบทวนและพูด", time: "35 นาที" },
];

const quizQuestions = [
  { question: "เสียงใดมีลักษณะไต่สูงขึ้น?", options: ["mā · เสียง 1", "má · เสียง 2", "mà · เสียง 4"], answer: 1 },
  { question: "“我叫……” หมายความว่าอะไร?", options: ["ฉันชื่อ…", "ฉันเป็นคนไทย", "ยินดีที่ได้รู้จัก"], answer: 0 },
  { question: "ประโยคใดแปลว่า “ฉันเป็นคนไทย”?", options: ["你好。", "我叫安娜。", "我是泰国人。"], answer: 2 },
];

function AudioLesson({ title, detail }: { title: string; detail: string; src?: string }) {
  const [unsupported, setUnsupported] = useState(false);
  const play = () => { if (!speakChinese(lessonSpeech[title] || "你好！")) setUnsupported(true); };
  return <div className="audio-lesson"><div className="audio-icon"><Volume2 size={19} /></div><div className="audio-copy"><strong>{title}</strong><span>{detail}</span><button type="button" className="speech-play-button" onClick={play}><Volume2 size={15} /> ฟังเสียงภาษาจีน</button>{unsupported && <small role="status">此瀏覽器不支援語音合成，請改用支援中文語音的瀏覽器。</small>}</div></div>;
}

function SectionTitle({ eyebrow, title, detail }: { eyebrow: string; title: string; detail?: string }) {
  return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{detail && <p>{detail}</p>}</div>;
}

export default function Home() {
  const [done, setDone] = useState<string[]>([]);
  const [toneAnswer, setToneAnswer] = useState("");
  const [toneResult, setToneResult] = useState<"correct" | "retry" | "">("");
  const [answers, setAnswers] = useState<number[]>([-1, -1, -1]);
  const [quizChecked, setQuizChecked] = useState(false);
  const [learnerName, setLearnerName] = useState("");
  const [recording, setRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState("");
  const [recordingError, setRecordingError] = useState("");
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    try { setDone(JSON.parse(localStorage.getItem("thai-mandarin-week1-progress") || "[]")); } catch { setDone([]); }
  }, []);
  useEffect(() => {
    try { localStorage.setItem("thai-mandarin-week1-progress", JSON.stringify(done)); } catch { /* Private browsing may disable storage. */ }
  }, [done]);
  useEffect(() => () => {
    if (recordingUrl) URL.revokeObjectURL(recordingUrl);
    streamRef.current?.getTracks().forEach((track) => track.stop());
  }, [recordingUrl]);

  const toggleDone = (id: string) => setDone((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const markComplete = (id: string) => <button className={`complete-button ${done.includes(id) ? "is-done" : ""}`} onClick={() => toggleDone(id)} aria-pressed={done.includes(id)}>{done.includes(id) ? <Check size={16} /> : <span className="empty-check" />} {done.includes(id) ? "เรียนส่วนนี้แล้ว" : "ทำส่วนนี้เสร็จแล้ว"}</button>;
  const checkTone = () => setToneResult(toneAnswer.replace(/[^1-4]/g, "") === "14232134" ? "correct" : "retry");
  const checkQuiz = () => setQuizChecked(true);
  const score = answers.reduce((sum, choice, i) => sum + (choice === quizQuestions[i].answer ? 1 : 0), 0);

  const startRecording = async () => {
    setRecordingError("");
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setRecordingError("เบราว์เซอร์นี้ไม่รองรับการบันทึกเสียง ลองใช้อุปกรณ์บันทึกเสียงในโทรศัพท์แทนได้"); return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      recorder.ondataavailable = (event) => { if (event.data.size) chunksRef.current.push(event.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        setRecordingUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };
      recorder.start(); setRecording(true);
    } catch {
      setRecordingError("ยังไม่ได้รับอนุญาตให้ใช้ไมโครโฟน ลองกดอนุญาตในเบราว์เซอร์ หรือฝึกโดยไม่บันทึกเสียงก็ได้");
    }
  };
  const stopRecording = () => { recorderRef.current?.stop(); setRecording(false); };

  return <div className="course-site">
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="กลับไปด้านบน"><span className="brand-mark">中</span><span>จีนเริ่มต้น<span className="wordmark-sub">เรียนรู้ทีละก้าว</span></span></a>
      <nav className="top-nav" aria-label="เมนูหลัก"><a href="#all-weeks">หลักสูตร 12 สัปดาห์</a><a href="#daily-phrases">วลีใช้จริง</a><a href="#tones">ฝึกเสียง</a><a href="#practice">ทดสอบตัวเอง</a></nav>
      <button className="print-button" onClick={() => window.print()}><BookOpen size={16} /> พิมพ์บทเรียน</button>
    </header>

    <main id="top">
      <section className="hero-section">
        <div className="hero-grain" />
        <div className="hero-copy">
          <div className="hero-kicker"><span className="live-dot" /> หลักสูตร 12 สัปดาห์ <span className="kicker-divider" /> ผู้เริ่มต้น</div>
          <h1>เริ่มพูดจีน<br /><em>จากเสียงแรก</em></h1>
          <p className="hero-thai">ฝึกเสียงวรรณยุกต์ แล้วแนะนำตัวเป็นภาษาจีนได้ด้วยตัวเอง</p>
          <p className="hero-caption">เรียนทีละขั้น ฟังตัวอย่างจริง และพูดตามในจังหวะของคุณ</p>
          <div className="hero-meta"><span><Clock3 size={16} /> ครั้งละ 90 นาที</span><span><Headphones size={16} /> มีเสียงตัวอย่าง</span><span><Sparkles size={16} /> ไม่ต้องมีพื้นฐาน</span></div>
          <a className="primary-cta" href="#start">เริ่มสัปดาห์ที่ 1 <ArrowUpRight size={17} /></a>
        </div>
        <div className="hero-art-wrap"><div className="hero-note note-one">你好！<small>สวัสดี</small></div><div className="hero-art hero-illustration" role="img" aria-label="ภาพประกอบการฝึกสนทนาภาษาจีน"><span>你好！</span><div className="illustration-people"><b>👩🏻</b><b>👨🏻</b></div><small>一起练习中文 · ฝึกภาษาจีนด้วยกัน</small></div><div className="hero-note note-two"><span className="note-wave">↗</span> ฟัง · พูด · เรียนรู้</div></div>
        <div className="hero-index">01 <span>— 12 สัปดาห์</span></div>
      </section>

      <div className="course-layout" id="course-map">
        <aside className="course-rail"><div className="rail-title">เส้นทางเรียน <span>90 นาที</span></div><div className="progress-meta"><span>ความคืบหน้า</span><b>{done.length} / 6</b></div><div className="progress-track"><span style={{ width: `${done.length / 6 * 100}%` }} /></div><nav className="lesson-nav" aria-label="สารบัญบทเรียน">{sections.map((section) => <a href={`#${section.id}`} key={section.id} className={done.includes(section.id) ? "nav-done" : ""}><span className="nav-number">{done.includes(section.id) ? <Check size={14} /> : section.n}</span><span>{section.title}<small>{section.time}</small></span><ChevronRight size={15} className="nav-chevron" /></a>)}</nav><div className="rail-tip"><Waves size={18} /><p>เคล็ดลับวันนี้</p><small>ฟังให้ชัดก่อน แล้วค่อยพูดตาม ไม่ต้องรีบ</small></div></aside>

        <div className="lesson-content">
          <section className="lesson-panel intro-panel" id="start"><div className="panel-topline"><span className="step-chip">01</span><span className="duration"><Clock3 size={14} /> 5 นาที</span></div><SectionTitle eyebrow="เริ่มต้น · ก่อนเริ่มเรียน" title="ทักทายตัวเองก่อน" detail="ยินดีต้อนรับ! ฟังเสียงหนึ่งรอบ แล้วพูดตามด้วยน้ำเสียงสบาย ๆ" /><div className="first-phrase"><div><span className="hanzi">你好！</span><span className="pinyin">Nǐ hǎo!</span><span className="translation">สวัสดี</span></div><AudioLesson title="ฟังเสียงทักทาย" detail="เสียงตัวอย่างจากบทแนะนำตัว" src={undefined} /></div>{markComplete("start")}</section>

          <section className="lesson-panel tone-panel" id="tones"><div className="panel-topline"><span className="step-chip">02</span><span className="duration"><Clock3 size={14} /> 12 นาที</span></div><SectionTitle eyebrow="ฝึกออกเสียง · วรรณยุกต์" title="สี่เสียง เปลี่ยนความหมาย" detail="ภาษาจีนกลางใช้ระดับเสียงต่างกัน ลองฟังจังหวะเสียงแล้ววาดเส้นตามด้วยนิ้ว" /><div className="tone-illustration"><div className="tone-fallback" role="img" aria-label="แนวเสียงจีนสี่เสียง"><span>第一声 <b>→</b></span><span>第二声 <b>↗</b></span><span>第三声 <b>↘↗</b></span><span>第四声 <b>↘</b></span></div><span>ดูแนวเสียง · จากซ้ายไปขวา</span></div><div className="tone-cards"><article className="tone-card tone-1"><span className="tone-label">เสียงที่ 1 · สูงคงที่</span><div className="tone-arrow">→</div><strong>mā</strong><p>เสียงเรียบและยาว</p></article><article className="tone-card tone-2"><span className="tone-label">เสียงที่ 2 · ไต่ขึ้น</span><div className="tone-arrow">↗</div><strong>má</strong><p>ระดับเสียงสูงขึ้น</p></article><article className="tone-card tone-3"><span className="tone-label">เสียงที่ 3 · ต่ำแล้วขึ้น</span><div className="tone-arrow">↘↗</div><strong>mǎ</strong><p>ลงต่ำแล้ววกขึ้น</p></article><article className="tone-card tone-4"><span className="tone-label">เสียงที่ 4 · ตกลง</span><div className="tone-arrow">↘</div><strong>mà</strong><p>เสียงสั้นและตกลง</p></article></div><div className="callout"><span className="callout-icon"><Headphones size={18} /></span><p><strong>ฟัง 3 รอบ:</strong> รอบแรกฟังอย่างเดียว · รอบสองพูดตาม · รอบสามใช้มือวาดเส้นเสียงพร้อมออกเสียง</p></div><AudioLesson title="เสียงตัวอย่าง: mā · má · mǎ · mà" detail="พูดช้า ชัด และเว้นช่วงให้ฝึกตาม" src={undefined} /><div className="soft-note"><Sparkles size={17} /><p>คนไทยคุ้นเคยกับวรรณยุกต์ แต่เสียงไทยและจีนไม่ตรงกันทั้งหมด ลองเลียนแบบเสียงจีนโดยตรง แทนการเทียบเสียงแบบหนึ่งต่อหนึ่ง</p></div>{markComplete("tones")}</section>

          <section className="lesson-panel listening-panel" id="listening"><div className="panel-topline"><span className="step-chip">03</span><span className="duration"><Clock3 size={14} /> 8 นาที</span></div><SectionTitle eyebrow="ฝึกฟัง · จับเสียง" title="ฟังแล้วจับคู่เสียง" detail="ตั้งใจฟังเสียงทั้ง 8 ตัว แล้วกรอกเลขเสียงตามลำดับที่ได้ยิน" /><div className="listening-card"><div className="listening-card-head"><div className="listening-symbol"><Headphones size={21} /></div><div><strong>แบบฝึกเสียงลำดับ</strong><span>1 = mā &nbsp; 2 = má &nbsp; 3 = mǎ &nbsp; 4 = mà</span></div></div><AudioLesson title="เปิดเสียงแบบฝึก" detail="ฟังซ้ำได้ตามต้องการ ก่อนส่งคำตอบ" src={undefined} /><label className="answer-label" htmlFor="tone-answer">ลำดับตัวเลข 8 ตัว <span>เช่น 1-2-3-4...</span></label><div className="answer-row"><input id="tone-answer" inputMode="numeric" maxLength={15} value={toneAnswer} onChange={(event) => { setToneAnswer(event.target.value); setToneResult(""); }} placeholder="พิมพ์ตัวเลขที่ได้ยิน เช่น 1-4-2-3" /><button className="small-cta" onClick={checkTone}>ตรวจคำตอบ <ArrowUpRight size={15} /></button></div>{toneResult && <div className={`result-note ${toneResult}`} role="status">{toneResult === "correct" ? "ถูกต้อง! ฟังจับลำดับเสียงได้ครบแล้ว" : "ยังไม่ตรง ลองฟังซ้ำอีกครั้ง แล้วกรอกตัวเลขทั้ง 8 ตัว"}</div>}<details className="answer-reveal"><summary>ดูเฉลยหลังจากลองทำแล้ว</summary><p>1 – 4 – 2 – 3 – 2 – 1 – 3 – 4</p></details></div>{markComplete("listening")}</section>

          <section className="lesson-panel phrases-panel" id="phrases"><div className="panel-topline"><span className="step-chip">04</span><span className="duration"><Clock3 size={14} /> 15 นาที</span></div><SectionTitle eyebrow="ฝึกพูด · ประโยคใช้จริง" title="สี่ประโยคแนะนำตัว" detail="ฟังประโยคตัวอย่าง แล้วฝึกเป็นวลี ไม่ต้องท่องกฎไวยากรณ์ก่อน" /><div className="phrases-list"><article className="phrase-row"><span className="phrase-count">01</span><div><strong>你好。</strong><span>Nǐ hǎo.</span><small>สวัสดี</small></div><span className="phrase-tone">เสียง 3 + เสียง 3</span></article><article className="phrase-row"><span className="phrase-count">02</span><div><strong>我叫安娜。</strong><span>Wǒ jiào Ānnà.</span><small>ฉันชื่อแอนนา · เปลี่ยนชื่อเป็นของคุณ</small></div><span className="phrase-tone">เริ่มด้วยชื่อของคุณ</span></article><article className="phrase-row"><span className="phrase-count">03</span><div><strong>我是泰国人。</strong><span>Wǒ shì Tàiguó rén.</span><small>ฉันเป็นคนไทย</small></div><span className="phrase-tone">ใช้บอกสัญชาติ</span></article><article className="phrase-row"><span className="phrase-count">04</span><div><strong>很高兴认识你。</strong><span>Hěn gāoxìng rènshi nǐ.</span><small>ยินดีที่ได้รู้จัก</small></div><span className="phrase-tone">พูดอย่างเป็นมิตร</span></article></div><AudioLesson title="ฟังตัวอย่างเต็ม" detail="ฟังทีละประโยค แล้วลองพูดต่อเนื่องตามจังหวะ" src={undefined} /><label className="name-input-label" htmlFor="learner-name">ลองใส่ชื่อจีนที่คุณเลือก</label><div className="name-preview"><input id="learner-name" value={learnerName} onChange={(event) => setLearnerName(event.target.value)} placeholder="เช่น 安娜" /><span>我叫{learnerName || "＿＿"}。</span></div><p className="micro-copy">ยังไม่มีชื่อจีน? ใช้ชื่อเล่นที่คุณสะดวก หรือถามผู้สอนช่วยเลือกในครั้งถัดไป</p>{markComplete("phrases")}</section>

          <section className="lesson-panel dialogue-panel" id="dialogue"><div className="panel-topline"><span className="step-chip">05</span><span className="duration"><Clock3 size={14} /> 15 นาที</span></div><SectionTitle eyebrow="ฝึกบทสนทนา · สถานการณ์จริง" title="พบเพื่อนใหม่" detail="ฝึกบทสนทนาสั้น ๆ สลับพูดทั้งสองบทบาทได้ แม้กำลังเรียนคนเดียว" /><div className="dialogue-scene"><div className="dialogue-illustration" role="img" aria-label="ภาพประกอบบทสนทนา"><span>👩🏻‍🎓</span><span>👋</span><span>👨🏻‍🎓</span></div><span>สถานการณ์: พบเพื่อนใหม่</span></div><div className="dialogue-lines"><div className="dialogue-line"><span className="speaker speaker-a">A</span><div><strong>你好！</strong><span>Nǐ hǎo! · สวัสดี!</span></div></div><div className="dialogue-line"><span className="speaker speaker-b">B</span><div><strong>你好！我叫＿＿。</strong><span>Nǐ hǎo! Wǒ jiào __. · สวัสดี! ฉันชื่อ＿＿</span></div></div><div className="dialogue-line"><span className="speaker speaker-a">A</span><div><strong>我叫＿＿。我是泰国人。</strong><span>Wǒ jiào __. Wǒ shì Tàiguó rén. · ฉันชื่อ＿＿ ฉันเป็นคนไทย</span></div></div><div className="dialogue-line"><span className="speaker speaker-b">B</span><div><strong>很高兴认识你！</strong><span>Hěn gāoxìng rènshi nǐ! · ยินดีที่ได้รู้จัก!</span></div></div></div><div className="practice-steps"><span><b>1</b> อ่านตามบท</span><span><b>2</b> พูดโดยดูเฉพาะจีน</span><span><b>3</b> ลองพูดจากความจำ</span></div>{markComplete("dialogue")}</section>

          <section className="lesson-panel practice-panel" id="practice"><div className="panel-topline"><span className="step-chip">06</span><span className="duration"><Clock3 size={14} /> 35 นาที</span></div><SectionTitle eyebrow="ทบทวนบทเรียน · ตรวจความเข้าใจ" title="ทบทวน แล้วพูดด้วยตัวเอง" detail="ตอบคำถามสามข้อ ก่อนอัดเสียงแนะนำตัว 20–30 วินาที" /><div className="quiz-list">{quizQuestions.map((item, questionIndex) => <fieldset className="quiz-question" key={item.question}><legend><span>{String(questionIndex + 1).padStart(2, "0")}</span>{item.question}</legend><div className="quiz-options">{item.options.map((option, optionIndex) => <label className={`quiz-option ${quizChecked && answers[questionIndex] === optionIndex ? (optionIndex === item.answer ? "option-correct" : "option-wrong") : ""}`} key={option}><input type="radio" name={`question-${questionIndex}`} checked={answers[questionIndex] === optionIndex} onChange={() => { setAnswers((current) => current.map((value, i) => i === questionIndex ? optionIndex : value)); setQuizChecked(false); }} /><span>{option}</span>{quizChecked && optionIndex === item.answer && <CheckCircle2 size={17} />}</label>)}</div></fieldset>)}</div><div className="quiz-actions"><button className="small-cta" onClick={checkQuiz}>ตรวจแบบทดสอบ <ArrowUpRight size={15} /></button>{quizChecked && <span className="quiz-score">คะแนน {score} / 3 {score === 3 ? "· เก่งมาก!" : "· ทบทวนแล้วลองใหม่ได้"}</span>}</div>
            <div className="final-speaking"><div className="final-speaking-head"><div><span className="eyebrow">ภารกิจท้ายบท · 20–30 วินาที</span><h3>แนะนำตัวเป็นภาษาจีน</h3></div><span className="mic-badge"><Mic size={20} /></span></div><div className="final-script"><strong>你好。我叫{learnerName || "＿＿"}。我是泰国人。很高兴认识你。</strong><span>Nǐ hǎo. Wǒ jiào {learnerName || "__"}. Wǒ shì Tàiguó rén. Hěn gāoxìng rènshi nǐ.</span></div><div className="record-row"><button className={`record-button ${recording ? "recording" : ""}`} onClick={recording ? stopRecording : startRecording}>{recording ? <><span className="record-pulse" /> หยุดบันทึก</> : <><Mic size={16} /> {recordingUrl ? "บันทึกใหม่" : "เริ่มบันทึกเสียงของฉัน"}</>}</button><span>เสียงเก็บไว้ในอุปกรณ์นี้เท่านั้น</span></div>{recordingError && <p className="record-error" role="status">{recordingError}</p>}{recordingUrl && <div className="recorded-audio"><span>เสียงของคุณ · ฟังทบทวน</span><audio controls src={recordingUrl} /><a href={recordingUrl} download="my-mandarin-introduction.webm">ดาวน์โหลดเสียง</a></div>}<div className="privacy-note"><CheckCircle2 size={16} /> การบันทึกทำงานในเบราว์เซอร์นี้เท่านั้น ไม่มีการอัปโหลดเสียง</div></div>
            <div className="final-checklist"><h3>ก่อนจบบท เช็กตัวเอง</h3>{["ฉันกล้าพูดภาษาจีนออกเสียง", "ฉันลองเลียนเสียงวรรณยุกต์ทั้งสี่", "ฉันแนะนำชื่อและบอกสัญชาติได้", "ฉันพูดว่า ‘ยินดีที่ได้รู้จัก’ ได้"].map((label) => <label key={label}><input type="checkbox" /> <span>{label}</span></label>)}</div>{markComplete("practice")}</section>

          <section className="vocab-strip"><div><span className="eyebrow">คำที่ควรจำ</span><h2>เก็บไว้ใช้ครั้งหน้า</h2></div><div className="vocab-items"><span><b>你好</b><small>สวัสดี</small></span><span><b>我</b><small>ฉัน</small></span><span><b>叫</b><small>ชื่อว่า</small></span><span><b>是</b><small>เป็น / คือ</small></span><span><b>泰国人</b><small>คนไทย</small></span></div></section>
          <div className="end-card"><div className="end-icon"><Sparkles size={20} /></div><div><strong>ทำได้ดีมาก คุณจบบทแรกแล้ว</strong><p>ทบทวนวันละ 5 นาที: ฟังเสียงหนึ่งรอบ แล้วแนะนำตัวอีกหนึ่งรอบ</p></div><a href="#top" aria-label="กลับไปเริ่มต้น"><ArrowDown size={17} /></a></div>
        </div>
      </div>
      <DailyPhrases />
      <CoursePlan weekOneComplete={sections.every((section) => done.includes(section.id))} />
    </main>
    <footer className="site-footer"><span>你好 · ภาษาจีนกลางสำหรับผู้เริ่มต้น</span><button onClick={() => window.print()}><RotateCcw size={14} /> พิมพ์หรือบันทึกเป็น PDF</button></footer>
  </div>;
}
