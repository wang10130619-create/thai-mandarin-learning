import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, BookOpen, Headphones, RotateCcw, Square, Volume2 } from "lucide-react";
import "./DailyPhrases.css";

type Phrase = { zh: string; py: string; th: string };
const phraseGroups: { id: string; title: string; hint: string; items: Phrase[] }[] = [
  { id: "greet", title: "ทักทายและสุภาพ", hint: "เริ่มบทสนทนาอย่างเป็นมิตร", items: [
    { zh: "你好！", py: "Nǐ hǎo!", th: "สวัสดี!" }, { zh: "早上好！", py: "Zǎoshang hǎo!", th: "สวัสดีตอนเช้า!" }, { zh: "谢谢。", py: "Xièxie.", th: "ขอบคุณ" }, { zh: "不客气。", py: "Bú kèqi.", th: "ไม่เป็นไร / ด้วยความยินดี" }, { zh: "对不起。", py: "Duìbuqǐ.", th: "ขอโทษ" }, { zh: "没关系。", py: "Méi guānxi.", th: "ไม่เป็นไร" }, { zh: "再见！", py: "Zàijiàn!", th: "ลาก่อน!" },
  ] },
  { id: "help", title: "ถามและขอความช่วยเหลือ", hint: "ใช้เมื่อฟังไม่ทันหรือไม่เข้าใจ", items: [
    { zh: "请说慢一点儿。", py: "Qǐng shuō màn yìdiǎnr.", th: "กรุณาพูดช้าลงหน่อย" }, { zh: "请再说一遍。", py: "Qǐng zài shuō yí biàn.", th: "กรุณาพูดอีกครั้ง" }, { zh: "我听不懂。", py: "Wǒ tīng bù dǒng.", th: "ฉันฟังไม่เข้าใจ" }, { zh: "可以帮我一下吗？", py: "Kěyǐ bāng wǒ yíxià ma?", th: "ช่วยฉันสักหน่อยได้ไหม?" }, { zh: "洗手间在哪儿？", py: "Xǐshǒujiān zài nǎr?", th: "ห้องน้ำอยู่ที่ไหน?" }, { zh: "请帮帮我。", py: "Qǐng bāngbang wǒ.", th: "กรุณาช่วยฉันหน่อย" },
  ] },
  { id: "food", title: "กินและดื่ม", hint: "ใช้ที่ร้านอาหารหรือร้านกาแฟ", items: [
    { zh: "我要这个。", py: "Wǒ yào zhège.", th: "ฉันเอาอันนี้" }, { zh: "我要一杯水。", py: "Wǒ yào yì bēi shuǐ.", th: "ฉันขอน้ำหนึ่งแก้ว" }, { zh: "不要辣。", py: "Bú yào là.", th: "ไม่เอาเผ็ด" }, { zh: "好吃吗？", py: "Hǎochī ma?", th: "อร่อยไหม?" }, { zh: "请给我菜单。", py: "Qǐng gěi wǒ càidān.", th: "ขอเมนูหน่อยค่ะ/ครับ" }, { zh: "买单，谢谢。", py: "Mǎidān, xièxie.", th: "คิดเงินด้วย ขอบคุณ" },
  ] },
  { id: "shop", title: "ซื้อของและถามราคา", hint: "ซื้อของใช้หรือของฝาก", items: [
    { zh: "这个多少钱？", py: "Zhège duōshao qián?", th: "อันนี้ราคาเท่าไร?" }, { zh: "太贵了。", py: "Tài guì le.", th: "แพงไปหน่อย" }, { zh: "我要两个。", py: "Wǒ yào liǎng ge.", th: "ฉันเอาสองชิ้น" }, { zh: "可以便宜一点儿吗？", py: "Kěyǐ piányi yìdiǎnr ma?", th: "ลดให้อีกนิดได้ไหม?" }, { zh: "我可以试一下吗？", py: "Wǒ kěyǐ shì yíxià ma?", th: "ฉันลองได้ไหม?" },
  ] },
  { id: "travel", title: "เดินทางและบอกอาการ", hint: "ใช้ถามทาง ระหว่างเดินทาง และบอกความรู้สึก", items: [
    { zh: "地铁站在哪儿？", py: "Dìtiě zhàn zài nǎr?", th: "สถานีรถไฟใต้ดินอยู่ที่ไหน?" }, { zh: "请带我去机场。", py: "Qǐng dài wǒ qù jīchǎng.", th: "กรุณาพาฉันไปสนามบิน" }, { zh: "一直走。", py: "Yìzhí zǒu.", th: "เดินตรงไปเรื่อย ๆ" }, { zh: "请在这里停车。", py: "Qǐng zài zhèlǐ tíngchē.", th: "กรุณาจอดตรงนี้" }, { zh: "要多久？", py: "Yào duō jiǔ?", th: "ใช้เวลานานเท่าไร?" }, { zh: "我迷路了。", py: "Wǒ mílù le.", th: "ฉันหลงทางแล้ว" }, { zh: "我饿了 / 我渴了。", py: "Wǒ è le / Wǒ kě le.", th: "ฉันหิวแล้ว / ฉันหิวน้ำแล้ว" }, { zh: "我累了。", py: "Wǒ lèi le.", th: "ฉันเหนื่อยแล้ว" },
  ] },
];

let stopActiveRepeat: (() => void) | null = null;

function SpeakPhrase({ text }: { text: string }) {
  const [repeating, setRepeating] = useState(false);
  const repeatsLeft = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const stop = useCallback(() => {
    repeatsLeft.current = 0;
    cancelTimer();
    if (stopActiveRepeat === stop) stopActiveRepeat = null;
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setRepeating(false);
  }, [cancelTimer]);
  const speakOne = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.82;
    const voice = window.speechSynthesis.getVoices().find((candidate) => candidate.lang.toLowerCase().startsWith("zh-cn"))
      ?? window.speechSynthesis.getVoices().find((candidate) => candidate.lang.toLowerCase().startsWith("zh"));
    if (voice) utterance.voice = voice;
    utterance.onend = () => {
      if (repeatsLeft.current > 0) {
        repeatsLeft.current -= 1;
        timer.current = setTimeout(speakOne, 550);
      } else {
        setRepeating(false);
        if (stopActiveRepeat === stop) stopActiveRepeat = null;
      }
    };
    utterance.onerror = () => {
      repeatsLeft.current = 0;
      cancelTimer();
      setRepeating(false);
      if (stopActiveRepeat === stop) stopActiveRepeat = null;
    };
    window.speechSynthesis.speak(utterance);
  }, [text, stop, cancelTimer]);
  useEffect(() => () => {
    if (stopActiveRepeat === stop) stop();
    else {
      repeatsLeft.current = 0;
      cancelTimer();
    }
  }, [stop, cancelTimer]);

  const playOnce = useCallback(() => {
    if (stopActiveRepeat) stopActiveRepeat();
    else if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    speakOne();
  }, [speakOne]);
  const repeatThreeTimes = useCallback(() => {
    if (repeating) return stop();
    if (!("speechSynthesis" in window)) return;
    if (stopActiveRepeat) stopActiveRepeat();
    else window.speechSynthesis.cancel();
    cancelTimer();
    repeatsLeft.current = 2;
    setRepeating(true);
    stopActiveRepeat = stop;
    speakOne();
  }, [repeating, stop, cancelTimer, speakOne]);
  return <div className="daily-audio-actions"><button type="button" className="daily-speak" title="ฟังหนึ่งครั้ง" aria-label={`ฟังหนึ่งครั้ง ${text}`} onClick={playOnce}><Volume2 size={15} /></button><button type="button" className={`daily-repeat ${repeating ? "is-repeating" : ""}`} title={repeating ? "หยุดการเล่นซ้ำ" : "ฟังซ้ำ 3 รอบ"} aria-label={repeating ? `หยุดการเล่นซ้ำ ${text}` : `ฟังซ้ำ 3 รอบ ${text}`} aria-pressed={repeating} onClick={repeatThreeTimes}>{repeating ? <Square size={12} fill="currentColor" /> : <RotateCcw size={14} />}</button></div>;
}

export default function DailyPhrases() {
  const [activeGroup, setActiveGroup] = useState("all");
  const visibleGroups = activeGroup === "all" ? phraseGroups : phraseGroups.filter((group) => group.id === activeGroup);
  const phraseCount = phraseGroups.reduce((sum, group) => sum + group.items.length, 0);
  return <section className="daily-phrases-section" id="daily-phrases">
    <div className="daily-phrases-heading"><div><span className="eyebrow">คลังวลีใช้จริง · {phraseCount} ประโยค</span><h2>ภาษาจีนที่ใช้ได้ทุกวัน</h2><p>เลือกสถานการณ์ · กดลำโพงเพื่อฟังหนึ่งครั้ง · กดลูกศรวนเพื่อฟังประโยคซ้ำ 3 รอบ แล้วพูดตาม</p></div><div className="daily-phrase-badge"><BookOpen size={20} /><span>ฟัง · อ่านพินอิน · พูดตาม</span></div></div>
    <div className="pronunciation-answer"><div className="pronunciation-answer-icon"><Headphones size={18} /></div><div><strong>มีบทเรียนการออกเสียงอยู่แล้ว และเพิ่มเสียงอ่านในวลีเหล่านี้ด้วย</strong><p>บทเรียนสัปดาห์ที่ 1 สอนเสียงวรรณยุกต์จีน 4 เสียง มีภาพแนวเสียง เสียงตัวอย่างแบบช้า และแบบฝึกฟังจับเสียง ส่วนวลีใหม่มีพินอินให้อ่านและปุ่มฟังภาษาจีน ความชัดของเสียงอ่านอาจต่างกันตามเสียงภาษาจีนที่ติดตั้งในอุปกรณ์</p><a href="#tones">ไปดูบทเรียน 4 เสียง <ArrowRight size={14} /></a></div></div>
    <div className="daily-filter" role="tablist" aria-label="เลือกสถานการณ์ของวลี">{[{ id: "all", title: "ทั้งหมด" }, ...phraseGroups.map(({ id, title }) => ({ id, title }))].map((item) => <button type="button" role="tab" aria-selected={activeGroup === item.id} className={activeGroup === item.id ? "selected" : ""} key={item.id} onClick={() => setActiveGroup(item.id)}>{item.title}</button>)}</div>
    <div className="daily-group-list">{visibleGroups.map((group) => <section className="daily-phrase-group" key={group.id}><div className="daily-group-title"><h3>{group.title}</h3><span>{group.hint}</span></div><div className="phrase-group-audio"><span className="phrase-group-audio-icon"><Headphones size={16} /></span><div className="phrase-group-audio-copy"><strong>ฟังเสียงตัวอย่างทั้งหมวด</strong><small>เสียงพูดภาษาจีนกลาง · ฟังแล้วพูดตามทีละประโยค</small></div><button type="button" className="group-speak-button" onClick={() => { if (!("speechSynthesis" in window)) return; window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(group.items.map((item) => item.zh).join("。")); utterance.lang = "zh-CN"; utterance.rate = 0.78; const voice = window.speechSynthesis.getVoices().find((candidate) => candidate.lang.toLowerCase().startsWith("zh-cn")) ?? window.speechSynthesis.getVoices().find((candidate) => candidate.lang.toLowerCase().startsWith("zh")); if (voice) utterance.voice = voice; window.speechSynthesis.speak(utterance); }}><Volume2 size={15} /> ฟังทั้งหมวดนี้</button></div><div className="daily-phrase-grid">{group.items.map((phrase) => <article className="daily-phrase-card" key={`${phrase.zh}-${phrase.th}`}><div className="daily-phrase-card-top"><strong>{phrase.zh}</strong><SpeakPhrase text={phrase.zh} /></div><span className="daily-phrase-pinyin">{phrase.py}</span><p>{phrase.th}</p></article>)}</div></section>)}</div>
    <div className="daily-phrase-tip"><span>ฝึกวันละ 5 นาที</span><p>เลือก 3 ประโยคจากวันนี้ · กดลูกศรวนเพื่อฟังทีละประโยคซ้ำ 3 รอบ · พูดตาม · ปิดพินอินแล้วลองพูดจากความจำ</p></div>
  </section>;
}
