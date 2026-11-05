import { useState } from "react";
import { ArrowLeft, BookOpen, Headphones, Volume2 } from "lucide-react";
import { Link } from "wouter";

const steps = [
  { n: "01", title: "อ่านคำแปลภาษาไทยก่อน", detail: "เริ่มจากความหมาย ไม่ต้องพยายามจำตัวอักษรจีนทั้งหมดในครั้งแรก" },
  { n: "02", title: "ดูพินอินและเครื่องหมายเสียง", detail: "พินอิน (Pinyin) ช่วยบอกวิธีออกเสียง ส่วนเครื่องหมายบนสระบอกวรรณยุกต์" },
  { n: "03", title: "ฟังเสียงจีนให้จบก่อน", detail: "ฟังหนึ่งรอบโดยยังไม่พูด สังเกตระดับเสียง จังหวะ และเสียงท้ายคำ" },
  { n: "04", title: "พูดตามทีละส่วน", detail: "เริ่มจากคำสั้น ๆ แล้วค่อยต่อเป็นประโยค พูดช้าและชัด ไม่ต้องรีบ" },
  { n: "05", title: "ลองพูดโดยไม่ดูคำแปล", detail: "ปิดคำแปลแล้วนึกความหมายจากนั้นพูดเอง หากยังไม่ได้ให้กลับไปฟังอีกครั้ง" },
  { n: "06", title: "ทำแบบฝึกและทบทวน", detail: "ตอบคำถาม ตรวจคำอธิบาย แล้วกลับมาทบทวนคำที่ยังจำไม่ได้ในวันถัดไป" },
];

const cardStyle = { border: "1px solid #e2e9e3", borderRadius: 18, padding: 22, marginBottom: 20 } as const;
const miniCardStyle = { background: "#fafbf9", borderRadius: 14, padding: 16 } as const;

export default function BeginnerGuide() {
  const [audioStatus, setAudioStatus] = useState("");
  const playChinese = (text: string) => {
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setAudioStatus("เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง กรุณาลองใช้ Chrome หรือ Edge เวอร์ชันล่าสุด");
      return;
    }
    window.speechSynthesis.cancel();
    setAudioStatus("กำลังเตรียมเสียงภาษาจีน…");
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.72;
    utterance.onstart = () => setAudioStatus("กำลังเล่นเสียงภาษาจีน ลองฟังให้จบก่อนพูดตาม");
    utterance.onend = () => setAudioStatus("เล่นจบแล้ว ลองพูดตามอีกหนึ่งรอบ");
    utterance.onerror = () => setAudioStatus("เล่นเสียงไม่สำเร็จ กรุณาตรวจสอบเสียงของอุปกรณ์และลองอีกครั้ง");
    const speak = () => {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find((v) => v.lang.toLowerCase() === "zh-cn") ?? voices.find((v) => v.lang.toLowerCase().startsWith("zh"));
      if (voice) utterance.voice = voice;
      else setAudioStatus("ไม่พบเสียงภาษาจีนในอุปกรณ์ ระบบจะลองใช้เสียงเริ่มต้น ซึ่งอาจออกเสียงไม่ถูกต้อง");
      window.speechSynthesis.speak(utterance);
    };
    if (window.speechSynthesis.getVoices().length) speak();
    else {
      let started = false;
      const start = () => {
        if (started) return;
        started = true;
        window.speechSynthesis.removeEventListener?.("voiceschanged", start);
        speak();
      };
      window.speechSynthesis.addEventListener?.("voiceschanged", start, { once: true });
      window.setTimeout(start, 900);
    }
  };

  return <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 64px", color: "#25302c", lineHeight: 1.75 }}>
    <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#426b5b", textDecoration: "none", marginBottom: 24 }}><ArrowLeft size={17} /> กลับหน้าหลัก</Link>
    <header style={{ background: "#f2f6f1", borderRadius: 22, padding: "30px 28px", marginBottom: 24 }}>
      <div style={{ color: "#668675", fontWeight: 700, letterSpacing: 1 }}>คู่มือสำหรับผู้เริ่มต้น · ZERO CHINESE KNOWLEDGE</div>
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)", lineHeight: 1.2, margin: "12px 0" }}>เริ่มเรียนภาษาจีนจากศูนย์</h1>
      <p style={{ margin: 0, maxWidth: 680 }}>ไม่จำเป็นต้องรู้ภาษาจีนมาก่อน เรียนตามลำดับนี้ได้ด้วยตัวเอง ใช้คำแปลภาษาไทยเป็นตัวช่วย และค่อย ๆ ฝึกฟังกับพูด</p>
    </header>

    <section style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>รู้จัก 3 สิ่งก่อนเริ่ม</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,210px),1fr))", gap: 14 }}>
        <article style={miniCardStyle}><strong>汉字 · ตัวอักษรจีน</strong><p>เป็นตัวเขียนที่ใช้แทนคำหรือส่วนของความหมาย เช่น 你 = คุณ, 好 = ดี</p></article>
        <article style={miniCardStyle}><strong>Pinyin · พินอิน</strong><p>เป็นตัวช่วยอ่านออกเสียงด้วยอักษรโรมัน เช่น nǐ hǎo ให้อ่านควบคู่กับเสียงตัวอย่าง</p></article>
        <article style={miniCardStyle}><strong>声调 · วรรณยุกต์</strong><p>ระดับเสียงมีผลต่อความหมาย ต้องฝึกฟังและพูดตามเสียงจีน ไม่เทียบกับเสียงไทยแบบตรงตัว</p></article>
      </div>
    </section>

    <section style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>ลองฟังคำแรกของคุณ</h2>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
        <div><div style={{ fontSize: 38, fontWeight: 700 }}>你好！</div><div style={{ color: "#668675" }}>Nǐ hǎo</div><div>สวัสดี</div></div>
        <button type="button" onClick={() => playChinese("你好！")} style={{ border: 0, borderRadius: 999, padding: "12px 18px", background: "#426b5b", color: "white", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}><Volume2 size={17} /> ฟังเสียงภาษาจีน</button>
      </div>
      <p role="status" aria-live="polite" style={{ color: "#426b5b", fontSize: 14, minHeight: 24, marginBottom: 4 }}>{audioStatus}</p>
      <p style={{ color: "#64736b", fontSize: 14, marginBottom: 0 }}>เสียงอ่านใช้ระบบเสียงของอุปกรณ์และเบราว์เซอร์ ความชัดและสำเนียงอาจต่างกัน หากต้องการฝึกออกเสียงจริงจัง ควรเลือกเสียง Chinese (Mandarin / zh-CN) ในการตั้งค่าอุปกรณ์</p>
    </section>

    <section style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>จุดออกเสียงที่ผู้พูดภาษาไทยควรสังเกต</h2>
      <p>เสียงบางเสียงในภาษาจีนไม่มีเสียงที่ตรงกันพอดีในภาษาไทย อย่าใช้คำอ่านภาษาไทยแทนพินอิน ให้ฟังตัวอย่างแล้วฝึกแยกเสียงทีละคู่</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,230px),1fr))", gap: 14 }}>
        <article style={miniCardStyle}><strong>b / p · d / t · g / k</strong><p>สังเกตลมหายใจที่พ่นออกมา: p、t、k มีลมชัดกว่า b、d、g อย่าออกเสียงทุกคู่เหมือนกัน</p></article>
        <article style={miniCardStyle}><strong>zh / ch / sh / r</strong><p>ปลายลิ้นงอไปด้านหลังเล็กน้อย เสียงกลุ่มนี้ต่างจาก z / c / s ซึ่งลิ้นอยู่ด้านหน้า</p></article>
        <article style={miniCardStyle}><strong>j / q / x</strong><p>ลิ้นอยู่ด้านหน้าใกล้เพดานปาก ไม่ใช่เสียง zh / ch / sh ฝึกฟังความต่างอย่างช้า ๆ</p></article>
        <article style={miniCardStyle}><strong>ü</strong><p>ทำปากคล้ายกำลังออกเสียง “อู” แต่พยายามออกเสียง “อี” โดยคงรูปปากกลมไว้</p></article>
      </div>
      <p style={{ color: "#64736b", fontSize: 14, marginBottom: 0 }}>คำอธิบายตำแหน่งลิ้นและรูปปากเป็นแนวทางเริ่มต้น ไม่ใช่เสียงแทนแบบตรงตัว ควรใช้เสียงเจ้าของภาษาเป็นหลัก</p>
    </section>

    <section style={cardStyle}>
      <h2 style={{ marginTop: 0 }}>เรียนแต่ละบทตาม 6 ขั้นตอนนี้</h2>
      <ol style={{ paddingLeft: 22, marginBottom: 0 }}>
        {steps.map((step) => <li key={step.n} style={{ padding: "8px 0 12px" }}><strong>{step.title}</strong><div>{step.detail}</div></li>)}
      </ol>
    </section>

    <section style={{ background: "#f7f5ef", borderRadius: 18, padding: 22, marginBottom: 22 }}>
      <h2 style={{ marginTop: 0 }}>ฝึกคนเดียวได้อย่างไร?</h2>
      <ul style={{ paddingLeft: 22 }}>
        <li>ถ้าไม่มีคู่สนทนา ให้พูดทั้งบท A และบท B สลับกัน</li>
        <li>ฟังประโยคหนึ่งครั้ง แล้วอัดเสียงตัวเองเพื่อฟังเปรียบเทียบ</li>
        <li>การอัดเสียงเป็นการทบทวนด้วยตัวเอง ไม่ใช่ระบบตรวจวัดความถูกต้องของสำเนียง</li>
        <li>ถ้าไมโครโฟนใช้ไม่ได้ สามารถฝึกพูดโดยไม่บันทึกเสียงได้</li>
        <li>เรียนครั้งละ 20–30 นาทีได้ ไม่จำเป็นต้องเรียนให้จบทุกส่วนในครั้งเดียว</li>
      </ul>
    </section>

    <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
      <Link href="/" style={{ background: "#426b5b", color: "white", borderRadius: 999, padding: "12px 20px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}><BookOpen size={17} /> เริ่มบทเรียนสัปดาห์ที่ 1</Link>
      <Link href="/life-phrases" style={{ border: "1px solid #b9c9bf", color: "#426b5b", borderRadius: 999, padding: "12px 20px", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}><Headphones size={17} /> ฝึกบทสนทนาในชีวิตประจำวัน</Link>
    </div>
  </main>;
}
