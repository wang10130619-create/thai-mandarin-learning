import { ArrowLeft, BookOpen, Headphones, Mic, Volume2 } from "lucide-react";
import { Link } from "wouter";

const steps = [
  { n: "01", title: "อ่านคำแปลภาษาไทยก่อน", detail: "เริ่มจากความหมาย ไม่ต้องพยายามจำตัวอักษรจีนทั้งหมดในครั้งแรก" },
  { n: "02", title: "ดูพินอินและเครื่องหมายเสียง", detail: "พินอิน (Pinyin) คือระบบตัวอักษรโรมันที่ช่วยบอกวิธีออกเสียงภาษาจีน เครื่องหมายบนสระช่วยบอกวรรณยุกต์" },
  { n: "03", title: "กดฟังเสียงภาษาจีน", detail: "ฟังหนึ่งรอบโดยยังไม่พูด จากนั้นฟังซ้ำและสังเกตระดับเสียงกับจังหวะ" },
  { n: "04", title: "พูดตามช้า ๆ", detail: "พูดเป็นคำหรือวลีสั้น ๆ ก่อน ไม่ต้องรีบพูดเร็วหรือเลียนแบบสำเนียงให้สมบูรณ์ทันที" },
  { n: "05", title: "ปิดคำแปลแล้วลองพูดเอง", detail: "ลองนึกความหมายและพูดประโยคจากความจำ หากยังไม่ได้ให้เปิดดูและฝึกซ้ำ" },
  { n: "06", title: "ทำแบบฝึกและทบทวน", detail: "ตอบคำถาม ตรวจคำอธิบาย และกลับมาทบทวนคำที่ยังจำไม่ได้ในวันถัดไป" },
];

function playChinese(text: string) {
  if (!("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.72;
  const voices = window.speechSynthesis.getVoices();
  const voice = voices.find((v) => v.lang.toLowerCase() === "zh-cn") ?? voices.find((v) => v.lang.toLowerCase().startsWith("zh"));
  if (voice) utterance.voice = voice;
  window.speechSynthesis.speak(utterance);
  return true;
}

export default function BeginnerGuide() {
  return <main style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px 64px", color: "#25302c", lineHeight: 1.75 }}>
    <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#426b5b", textDecoration: "none", marginBottom: 24 }}><ArrowLeft size={17} /> กลับหน้าหลัก</Link>
    <header style={{ background: "#f2f6f1", borderRadius: 22, padding: "30px 28px", marginBottom: 24 }}>
      <div style={{ color: "#668675", fontWeight: 700, letterSpacing: 1 }}>คู่มือสำหรับผู้เริ่มต้น · ZERO CHINESE KNOWLEDGE</div>
      <h1 style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)", lineHeight: 1.2, margin: "12px 0" }}>เริ่มเรียนภาษาจีนจากศูนย์</h1>
      <p style={{ margin: 0, maxWidth: 680 }}>ไม่จำเป็นต้องรู้ภาษาจีนมาก่อน เรียนตามลำดับนี้ได้ด้วยตัวเอง ใช้คำแปลภาษาไทยเป็นตัวช่วย และค่อย ๆ ฝึกฟังกับพูด</p>
    </header>
    <section style={{ border: "1px solid #e2e9e3", borderRadius: 18, padding: 22, marginBottom: 20 }}>
      <h2 style={{ marginTop: 0 }}>รู้จัก 3 สิ่งก่อนเริ่ม</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 14 }}>
        <article style={{ background: "#fafbf9", borderRadius: 14, padding: 16 }}><strong>汉字 · ตัวอักษรจีน</strong><p>เป็นตัวเขียนที่ใช้แทนคำหรือส่วนของความหมาย เช่น 你 = คุณ, 好 = ดี</p></article>
        <article style={{ background: "#fafbf9", borderRadius: 14, padding: 16 }}><strong>Pinyin · พินอิน</strong><p>เป็นตัวช่วยอ่านออกเสียงด้วยอักษรโรมัน เช่น nǐ hǎo อ่านประกอบกับเสียงตัวอย่าง</p></article>
        <article style={{ background: "#fafbf9", borderRadius: 14, padding: 16 }}><strong>声调 · วรรณยุกต์</strong><p>ระดับเสียงมีผลต่อความหมาย ต้องฝึกฟังและพูดตามเสียงภาษาจีน ไม่เทียบกับเสียงไทยแบบตรงตัว</p></article>
      </div>
    </section>
    <section style={{ border: "1px solid #e2e9e3", borderRadius: 18, padding: 22, marginBottom: 20 }}>
      <h2 style={{ marginTop: 0 }}>ลองฟังคำแรกของคุณ</h2>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
        <div><div style={{ fontSize: 38, fontWeight: 700 }}>你好！</div><div style={{ color: "#668675" }}>Nǐ hǎo</div><div>สวัสดี</div></div>
        <button type="button" onClick={() => playChinese("你好！")} style={{ border: 0, borderRadius: 999, padding: "12px 18px", background: "#426b5b", color: "white", display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer" }}><Volume2 size={17} /> ฟังเสียงภาษาจีน</button>
      </div>
      <p style={{ color: "#64736b", fontSize: 14, marginBottom: 0 }}>หมายเหตุ: เสียงอ่านมาจากเสียงภาษาจีนที่ติดตั้งในอุปกรณ์และเบราว์เซอร์ หากไม่มีเสียงจีนให้เลือก อาจได้ยินเสียงที่แตกต่างกัน</p>
    </section>
    <section style={{ border: "1px solid #e2e9e3", borderRadius: 18, padding: 22, marginBottom: 20 }}>
      <h2 style={{ marginTop: 0 }}>เรียนแต่ละบทตาม 6 ขั้นตอนนี้</h2>
      <ol style={{ paddingLeft: 22, marginBottom: 0 }}>
        {steps.map((step) => <li key={step.n} style={{ padding: "8px 0 12px" }}><strong>{step.title}</strong><div>{step.detail}</div></li>)}
      </ol>
    </section>
    <section style={{ background: "#f7f5ef", borderRadius: 18, padding: 22, marginBottom: 22 }}>
      <h2 style={{ marginTop: 0 }}>ฝึกคนเดียวได้อย่างไร?</h2>
      <ul style={{ paddingLeft: 22 }}>
        <li>ถ้าไม่มีคู่สนทนา ให้พูดทั้งบท A และบท B สลับกัน</li>
        <li>ใช้ปุ่มฟังเสียง แล้วอัดเสียงตัวเองเพื่อฟังเปรียบเทียบ</li>
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
