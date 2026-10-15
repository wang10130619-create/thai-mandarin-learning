import { useEffect, useMemo, useState } from "react";
import { BookOpen, Check, CheckCircle2, ChevronDown, ChevronRight, Clock3, GraduationCap, Headphones, Lightbulb, MessageCircle, NotebookPen, Volume2, Play, Square } from "lucide-react";
import { courseWeeks, type CourseWeek } from "../courseData";
import "./CoursePlan.css";

type Props = { weekOneComplete: boolean };

function speakMandarin(text: string, onEnd?: () => void) {
  if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.78;
  utterance.pitch = 1;
  const chooseVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((item) => item.lang.toLowerCase() === "zh-cn")
      ?? voices.find((item) => item.lang.toLowerCase().startsWith("zh"));
    if (voice) utterance.voice = voice;
    if (onEnd) utterance.onend = onEnd;
    window.speechSynthesis.speak(utterance);
  };
  // Some browsers load voice lists asynchronously; retry after voiceschanged when needed.
  if (window.speechSynthesis.getVoices().length) chooseVoice();
  else {
    let started = false;
    const start = () => { if (started) return; started = true; window.speechSynthesis.removeEventListener?.("voiceschanged", start); chooseVoice(); };
    window.speechSynthesis.addEventListener?.("voiceschanged", start, { once: true });
    window.setTimeout(start, 500);
  }
  return true;
}

function SpeakButton({ text }: { text: string }) {
  const [unavailable, setUnavailable] = useState(false);
  const speak = () => setUnavailable(!speakMandarin(text));
  return <span className="speak-button-wrap"><button className="week-speak-button" onClick={speak} aria-label={`ฟังเสียงภาษาจีน ${text}`} title="ฟังเสียงภาษาจีน"><Volume2 size={13} /></button>{unavailable && <small className="speech-unavailable" role="status">เบราว์เซอร์นี้ไม่รองรับเสียง</small>}</span>;
}

const dialogueScenes: Record<number, { emoji: string; place: string; detail: string }> = {
  2: { emoji: "👋 🧑🏻‍🤝‍🧑🏻", place: "พบเพื่อนใหม่", detail: "ทักทาย ถามชื่อ และแนะนำตัว" },
  3: { emoji: "📱 🔢", place: "แลกข้อมูลตัวเลข", detail: "ถามเบอร์โทรศัพท์และจดหมายเลข" },
  4: { emoji: "☕ 🗓️", place: "นัดพบที่ร้านกาแฟ", detail: "ตกลงวันและเวลานัดหมาย" },
  5: { emoji: "🛍️ 🧺", place: "ซื้อของในร้าน", detail: "ถามราคาและเลือกสินค้า" },
  6: { emoji: "🍜 🥢", place: "สั่งอาหาร", detail: "สั่งเมนูและบอกความต้องการ" },
  7: { emoji: "🏠 🪴", place: "พูดถึงบ้านและครอบครัว", detail: "แนะนำสมาชิกในครอบครัว" },
  8: { emoji: "🗺️ 📍", place: "ถามทางในเมือง", detail: "ถามสถานที่และฟังคำบอกทาง" },
  9: { emoji: "🚇 🧳", place: "เดินทางด้วยขนส่งสาธารณะ", detail: "ถามวิธีไปและเวลาที่ใช้" },
  10: { emoji: "🏫 🕗", place: "เล่ากิจวัตรประจำวัน", detail: "พูดถึงงานและเวลาในแต่ละวัน" },
  11: { emoji: "🩺 🏥", place: "ขอความช่วยเหลือ", detail: "บอกอาการพื้นฐานและขอความช่วยเหลือ" },
  12: { emoji: "🌦️ ☂️", place: "พูดถึงอากาศ", detail: "บอกสภาพอากาศและกิจกรรมที่วางแผนไว้" },
  13: { emoji: "🎉 🧑🏻‍🤝‍🧑🏻", place: "ทบทวนและสนทนา", detail: "นำประโยคที่เรียนมาใช้ในสถานการณ์จริง" },
};

function DialogueIllustration({ week }: { week: CourseWeek }) {
  const scene = dialogueScenes[week.week] ?? { emoji: "💬 👥", place: week.topic, detail: week.goal };
  return <div className="week-dialogue-scene" role="img" aria-label={`ภาพประกอบสถานการณ์ ${scene.place}`}>
    <div className="scene-art"><span className="scene-sparkle">✦</span><span className="scene-emoji">{scene.emoji}</span><span className="scene-speech scene-speech-left">你好！</span><span className="scene-speech scene-speech-right">请问…</span></div>
    <div className="scene-caption"><span className="scene-caption-tag">บทสนทนาจำลอง</span><strong>{scene.place}</strong><p>{scene.detail}</p></div>
  </div>;
}

function DialogueAudioControls({ week }: { week: CourseWeek }) {
  const [playing, setPlaying] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const playNext = (index: number) => {
    if (index >= week.dialogue.length) { setPlaying(false); return; }
    const ok = speakMandarin(week.dialogue[index].zh, () => playNext(index + 1));
    if (!ok) { setUnsupported(true); setPlaying(false); }
  };
  const start = () => { setUnsupported(false); setPlaying(true); playNext(0); };
  const stop = () => { window.speechSynthesis?.cancel(); setPlaying(false); };
  return <div className="dialogue-audio-controls"><button type="button" className="dialogue-play-all" onClick={playing ? stop : start}>{playing ? <Square size={15} /> : <Play size={15} fill="currentColor" />}{playing ? "หยุดบทสนทนา" : "ฟังบทสนทนาทั้งหมด"}</button><span>เสียงจีนกลาง · ฟังทีละประโยคพร้อมเว้นจังหวะ</span>{unsupported && <small role="status">อุปกรณ์นี้ไม่รองรับการอ่านออกเสียง กรุณาลอง Chrome หรือ Edge</small>}</div>;
}

const vocabularyEmoji: Record<string, string> = {
  "名字":"🙋", "姓":"🪪", "朋友":"🧑🏻‍🤝‍🧑🏻", "国家":"🌏", "泰国":"🇹🇭", "中国":"🇨🇳", "汉语":"💬",
  "零":"0️⃣", "一":"1️⃣", "二":"2️⃣", "电话":"📱", "号码":"🔢", "今天":"📅", "明天":"🌅", "星期":"🗓️", "月":"🌙", "点":"🕒",
  "家":"🏠", "家人":"👨‍👩‍👧‍👦", "爸爸":"👨", "妈妈":"👩", "哥哥":"👦", "姐姐":"👧", "照片":"🖼️",
  "米饭":"🍚", "面条":"🍜", "水":"💧", "茶":"🍵", "咖啡":"☕", "鸡肉":"🍗", "菜单":"📖", "好吃":"😋",
  "衣服":"👕", "钱":"💴", "商店":"🏪", "地铁":"🚇", "公交车":"🚌", "出租车":"🚕", "医院":"🏥", "医生":"🩺", "天气":"🌤️"
};
function VocabularyGrid({ week }: { week: CourseWeek }) {
  return <div className="week-vocabulary-grid">{week.words.map((word) => <article className="week-word" key={word.zh}><div className="word-picture" aria-hidden="true">{vocabularyEmoji[word.zh] ?? "🀄"}</div><div className="week-word-title"><strong>{word.zh}</strong><SpeakButton text={word.zh} /></div><span>{word.py}</span><small>{word.th}</small></article>)}</div>;
}

function SentencePatterns({ week }: { week: CourseWeek }) {
  return <div className="week-pattern-list">{week.patterns.map((pattern) => <article className="week-pattern" key={pattern.zh}><div className="pattern-text"><div className="pattern-zh"><strong>{pattern.zh}</strong><SpeakButton text={pattern.zh} /></div><span>{pattern.py}</span><p>{pattern.th}</p></div><div className="pattern-note"><Lightbulb size={14} /><span>{pattern.note}</span></div></article>)}</div>;
}

function LessonSession({ title, activities }: { title: string; activities: CourseWeek["sessionA"] }) {
  const total = activities.reduce((sum, activity) => sum + activity.min, 0);
  return <div className="session-card"><div className="session-heading"><div><span>{title}</span><small>ทำตามลำดับของคุณเอง · หยุดพักได้</small></div><b><Clock3 size={14} /> {total} นาที</b></div><div className="session-activities">{activities.map((activity, index) => <article className="session-activity" key={activity.title}><span className="activity-index">{String(index + 1).padStart(2, "0")}</span><div><strong>{activity.title}</strong><p>{activity.detail}</p></div><span className="activity-minutes">{activity.min} นาที</span></article>)}</div></div>;
}

function WeekUnit({ week, complete, onToggle }: { week: CourseWeek; complete: boolean; onToggle: () => void }) {
  const [answers, setAnswers] = useState<number[]>([-1, -1, -1]);
  const [checked, setChecked] = useState(false);
  const score = useMemo(() => answers.reduce((sum, answer, index) => sum + (answer === week.questions[index]?.answer ? 1 : 0), 0), [answers, week.questions]);
  const [homeworkDone, setHomeworkDone] = useState<number[]>([]);
  const updateAnswer = (questionIndex: number, answerIndex: number) => {
    setAnswers((current) => current.map((value, index) => index === questionIndex ? answerIndex : value));
    setChecked(false);
  };

  return <article className={`week-unit ${complete ? "week-unit-complete" : ""}`} id={`week-${week.week}`}>
    <details className="week-details">
      <summary className="week-summary">
        <span className="week-number">{String(week.week).padStart(2, "0")}</span>
        <span className="week-summary-main"><strong>สัปดาห์ที่ {week.week} · {week.title}</strong><small>{week.chinese} <span>·</span> {week.topic}</small></span>
        <span className="week-summary-time"><Clock3 size={14} /> 2 ครั้ง · ครั้งละ 90 นาที</span>
        <ChevronDown size={18} className="week-chevron" />
      </summary>
      <div className="week-detail-body">
        <div className="week-goal"><span><GraduationCap size={17} /></span><div><b>เป้าหมายประจำสัปดาห์</b><p>{week.goal}</p></div></div>
        <div className="week-pronunciation"><Volume2 size={16} /><div><b>เคล็ดลับการออกเสียง</b><p>{week.pronunciation}</p></div></div>
        <div className="week-block"><div className="week-block-title"><span className="week-block-icon"><BookOpen size={16} /></span><div><h4>คำศัพท์สำคัญ</h4><p>อ่านตัวจีน · พินอิน · ความหมายภาษาไทย</p></div></div><VocabularyGrid week={week} /></div>
        <div className="week-block"><div className="week-block-title"><span className="week-block-icon"><NotebookPen size={16} /></span><div><h4>ประโยคที่ใช้ได้จริง</h4><p>ลองพูดตาม แล้วเปลี่ยนข้อมูลให้เป็นเรื่องของคุณ</p></div></div><SentencePatterns week={week} /></div>
        <div className="week-block"><div className="week-block-title"><span className="week-block-icon"><MessageCircle size={16} /></span><div><h4>บทสนทนาพร้อมภาพประกอบและเสียง</h4><p>ดูสถานการณ์ อ่านพินอินและคำแปลไทย แล้วฟังทีละประโยคหรือฟังต่อเนื่องทั้งบท</p></div></div><DialogueIllustration week={week} /><DialogueAudioControls week={week} /><div className="week-dialogue">{week.dialogue.map((line, index) => <div className="week-dialogue-line" key={`${index}-${line.zh}`}><span className={`dialogue-speaker speaker-${line.speaker.toLowerCase()}`}>{line.speaker}</span><div><div className="dialogue-zh"><strong>{line.zh}</strong><SpeakButton text={line.zh} /></div><span>{line.py}</span><small>{line.th}</small></div></div>)}</div></div>
        <div className="week-block"><div className="week-block-title"><span className="week-block-icon"><Clock3 size={16} /></span><div><h4>แผนเรียน 2 ครั้ง</h4><p>แต่ละครั้งรวม 90 นาที ทำคนเดียวตามคำแนะนำได้</p></div></div><div className="session-grid"><LessonSession title="ครั้งที่ 1 · เรียนรู้และฝึกพื้นฐาน" activities={week.sessionA} /><LessonSession title="ครั้งที่ 2 · ใช้จริงและทบทวน" activities={week.sessionB} /></div></div>
        <div className="week-block week-quiz-block"><div className="week-block-title"><span className="week-block-icon"><CheckCircle2 size={16} /></span><div><h4>แบบทดสอบท้ายสัปดาห์</h4><p>เลือกคำตอบ แล้วตรวจดูคำอธิบาย</p></div></div><div className="week-quiz-list">{week.questions.map((item, questionIndex) => <fieldset className="week-quiz-question" key={item.question}><legend><span>{String(questionIndex + 1).padStart(2, "0")}</span>{item.question}</legend><div className="week-quiz-options">{item.options.map((option, optionIndex) => <label className={`week-quiz-option ${checked && optionIndex === item.answer ? "week-option-right" : checked && answers[questionIndex] === optionIndex ? "week-option-wrong" : ""}`} key={option}><input type="radio" name={`w${week.week}-q${questionIndex}`} checked={answers[questionIndex] === optionIndex} onChange={() => updateAnswer(questionIndex, optionIndex)} /><span>{option}</span>{checked && optionIndex === item.answer && <Check size={15} />}</label>)}</div>{checked && <p className="week-answer-explanation">{answers[questionIndex] === item.answer ? "ถูกต้อง · " : "คำตอบ · "}{item.why}</p>}</fieldset>)}</div><div className="week-quiz-footer"><button className="week-check-button" onClick={() => setChecked(true)}>ตรวจคำตอบ</button>{checked && <span className="week-score">ได้ {score} / {week.questions.length} ข้อ</span>}</div></div>
        <div className="week-homework"><div className="week-block-title"><span className="week-block-icon"><NotebookPen size={16} /></span><div><h4>ฝึกต่อที่บ้าน</h4><p>ทำครั้งละนิดเพื่อจำได้นานขึ้น</p></div></div><div className="week-homework-list">{week.homework.map((task, index) => <label key={task}><input type="checkbox" checked={homeworkDone.includes(index)} onChange={(event) => setHomeworkDone((items) => event.target.checked ? [...items, index] : items.filter((item) => item !== index))} /><span>{task}</span></label>)}</div></div>
        <button className={`week-complete-button ${complete ? "is-complete" : ""}`} onClick={onToggle} aria-pressed={complete}>{complete ? <CheckCircle2 size={17} /> : <span className="week-empty-circle" />}{complete ? "ทำสัปดาห์นี้จบแล้ว · กดเพื่อยกเลิก" : "ทำสัปดาห์นี้จบแล้ว"}</button>
      </div>
    </details>
  </article>;
}

export default function CoursePlan({ weekOneComplete }: Props) {
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);
  useEffect(() => { try { setCompletedWeeks(JSON.parse(localStorage.getItem("thai-mandarin-weeks-complete") || "[]")); } catch { setCompletedWeeks([]); } }, []);
  useEffect(() => { try { localStorage.setItem("thai-mandarin-weeks-complete", JSON.stringify(completedWeeks)); } catch { /* storage may be unavailable */ } }, [completedWeeks]);
  const completedCount = completedWeeks.length + (weekOneComplete ? 1 : 0);
  const toggle = (week: number) => setCompletedWeeks((items) => items.includes(week) ? items.filter((item) => item !== week) : [...items, week].sort((a, b) => a - b));

  return <section className="all-weeks-section" id="all-weeks">
    <div className="all-weeks-heading"><div><span className="eyebrow">เส้นทางเรียนครบหลักสูตร · 12 สัปดาห์</span><h2>ต่อยอดภาษาจีนทีละสัปดาห์</h2><p>สัปดาห์ที่ 1 อยู่ด้านบน; เลือกสัปดาห์อื่นเพื่อเปิดคำศัพท์ บทเรียนสองครั้ง บทสนทนา แบบทดสอบ และการบ้าน</p></div><div className="course-progress-card"><span>ความคืบหน้าทั้งหลักสูตร</span><strong>{completedCount}<small> / 12 สัปดาห์</small></strong><div className="course-progress-track"><i style={{ width: `${completedCount / 12 * 100}%` }} /></div></div></div>
    <div className="week-jump-list">{Array.from({ length: 12 }, (_, index) => { const week = index + 1; const done = week === 1 ? weekOneComplete : completedWeeks.includes(week); return <a href={week === 1 ? "#start" : `#week-${week}`} key={week} className={done ? "jump-done" : ""}><span>{done ? <Check size={12} /> : String(week).padStart(2, "0")}</span><small>{week === 1 ? "เริ่มต้น" : `สัปดาห์ ${week}`}</small></a>; })}</div>
    <div className="week-units">{courseWeeks.map((week) => <WeekUnit key={week.week} week={week} complete={completedWeeks.includes(week.week)} onToggle={() => toggle(week.week)} />)}</div>
    <div className="course-footnote"><Headphones size={16} /><p>ควรพูดออกเสียงทุกครั้ง แม้กำลังเรียนคนเดียว: อ่านคำจีน ฟังหรือเลียนแบบเสียง แล้วพูดจากความจำ ความคืบหน้าจะบันทึกไว้ในเบราว์เซอร์เครื่องนี้</p></div>
  </section>;
}
