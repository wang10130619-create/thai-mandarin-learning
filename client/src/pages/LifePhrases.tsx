import { useEffect, useState } from "react";
import { ArrowLeft, Volume2, Play, Square, MessageCircle, BookOpen } from "lucide-react";
import { Link } from "wouter";
import "./LifePhrases.css";
import { extraScenes } from "./lifePhrasesExtra";

type Line = { speaker: "A" | "B"; zh: string; py: string; th: string };
type Scene = { id: string; emoji: string; title: string; setting: string; lines: Line[]; visual?: string; memory?: string; objects?: string[] };
const sceneTitleTh: Record<string,string> = { greeting:"การทักทายและแนะนำตัว", restaurant:"การสั่งอาหารในร้านอาหาร", shopping:"การซื้อของและถามราคา", directions:"การถามทาง", transport:"การเดินทาง", hotel:"การเข้าพักโรงแรม", hospital:"การไปโรงพยาบาล", pharmacy:"การซื้อยา", weather:"การพูดคุยเรื่องอากาศ", family:"การพูดคุยเรื่องครอบครัว", hobbies:"งานอดิเรกและเวลาว่าง", phone:"การคุยโทรศัพท์", appointment:"การนัดหมาย", cafe:"การสั่งเครื่องดื่ม", market:"การซื้อของที่ตลาด" };
const sceneSettingTh: Record<string,string> = { greeting:"ใช้เมื่อพบเพื่อนใหม่และต้องการแนะนำตัวเป็นภาษาจีน", restaurant:"ฝึกสั่งอาหาร ถามเมนู และบอกสิ่งที่ต้องการ", shopping:"ฝึกถามราคา ต่อรอง และเลือกสินค้า" };
const sceneThaiTitle = (scene: Scene) => sceneTitleTh[scene.id] || "บทสนทนาที่ใช้ได้ในชีวิตประจำวัน";
const sceneThaiSetting = (scene: Scene) => sceneSettingTh[scene.id] || "อ่านคำแปลภาษาไทยก่อน แล้วฟังและฝึกพูดประโยคภาษาจีนตามสถานการณ์";

const baseScenes: Scene[] = [
  { id: "greeting", emoji: "👋", title: "打招呼與自我介紹", setting: "在語言課上第一次遇見新朋友", lines: [
    {speaker:"A",zh:"你好！",py:"Nǐ hǎo!",th:"สวัสดี!"},
    {speaker:"B",zh:"你好！你叫什么名字？",py:"Nǐ hǎo! Nǐ jiào shénme míngzi?",th:"สวัสดี! คุณชื่ออะไร?"},
    {speaker:"A",zh:"我叫安娜。你呢？",py:"Wǒ jiào Ānnà. Nǐ ne?",th:"ฉันชื่ออันนา แล้วคุณล่ะ?"},
    {speaker:"B",zh:"我叫大卫。很高兴认识你。",py:"Wǒ jiào Dàwèi. Hěn gāoxìng rènshi nǐ.",th:"ฉันชื่อดาวิด ยินดีที่ได้รู้จัก"},
    {speaker:"A",zh:"我也很高兴认识你。",py:"Wǒ yě hěn gāoxìng rènshi nǐ.",th:"ฉันก็ยินดีที่ได้รู้จักคุณเช่นกัน"},
    {speaker:"B",zh:"你是泰国人吗？",py:"Nǐ shì Tàiguó rén ma?",th:"คุณเป็นคนไทยไหม?"},
    {speaker:"A",zh:"是的，我是泰国人。",py:"Shì de, wǒ shì Tàiguó rén.",th:"ใช่ ฉันเป็นคนไทย"},
    {speaker:"B",zh:"你会说中文吗？",py:"Nǐ huì shuō Zhōngwén ma?",th:"คุณพูดภาษาจีนได้ไหม?"},
    {speaker:"A",zh:"我会说一点儿中文。",py:"Wǒ huì shuō yìdiǎnr Zhōngwén.",th:"ฉันพูดภาษาจีนได้นิดหน่อย"},
    {speaker:"B",zh:"太好了！我们一起练习吧。",py:"Tài hǎo le! Wǒmen yìqǐ liànxí ba.",th:"ดีมากเลย! เรามาฝึกด้วยกันเถอะ"}
  ]},
  { id: "restaurant", emoji: "🍜", title: "在餐廳點餐", setting: "兩位朋友走進餐廳，準備點午餐", lines: [
    {speaker:"A",zh:"你好，请问有菜单吗？",py:"Nǐ hǎo, qǐngwèn yǒu càidān ma?",th:"สวัสดี ขอเมนูหน่อยได้ไหม?"},
    {speaker:"B",zh:"有，请看。",py:"Yǒu, qǐng kàn.",th:"มี เชิญดูได้เลย"},
    {speaker:"A",zh:"这个是什么？",py:"Zhège shì shénme?",th:"อันนี้คืออะไร?"},
    {speaker:"B",zh:"这是牛肉面。",py:"Zhè shì niúròu miàn.",th:"นี่คือบะหมี่เนื้อวัว"},
    {speaker:"A",zh:"听起来不错。多少钱？",py:"Tīng qǐlái búcuò. Duōshao qián?",th:"ฟังดูน่าอร่อย ราคาเท่าไร?"},
    {speaker:"B",zh:"四十五块钱。",py:"Sìshíwǔ kuài qián.",th:"45 หยวน"},
    {speaker:"A",zh:"好，我要一碗牛肉面。",py:"Hǎo, wǒ yào yì wǎn niúròu miàn.",th:"ตกลง ฉันเอาบะหมี่เนื้อหนึ่งชาม"},
    {speaker:"B",zh:"你要喝什么？",py:"Nǐ yào hē shénme?",th:"คุณต้องการดื่มอะไร?"},
    {speaker:"A",zh:"请给我一杯水。",py:"Qǐng gěi wǒ yì bēi shuǐ.",th:"ขอน้ำหนึ่งแก้วค่ะ/ครับ"},
    {speaker:"B",zh:"好的，请稍等。",py:"Hǎo de, qǐng shāo děng.",th:"ได้เลย กรุณารอสักครู่"}
  ]},
  { id: "shopping", emoji: "🛍️", title: "購物與詢問價格", setting: "在市場挑選一件衣服", lines: [
    {speaker:"A",zh:"你好，这件衣服多少钱？",py:"Nǐ hǎo, zhè jiàn yīfu duōshao qián?",th:"สวัสดี เสื้อผ้าตัวนี้ราคาเท่าไร?"},
    {speaker:"B",zh:"一百二十块。",py:"Yì bǎi èrshí kuài.",th:"120 หยวน"},
    {speaker:"A",zh:"有点儿贵，可以便宜一点儿吗？",py:"Yǒudiǎnr guì, kěyǐ piányi yìdiǎnr ma?",th:"แพงนิดหน่อย ลดราคาได้ไหม?"},
    {speaker:"B",zh:"那就一百块吧。",py:"Nà jiù yì bǎi kuài ba.",th:"งั้นเอา 100 หยวนแล้วกัน"},
    {speaker:"A",zh:"有别的颜色吗？",py:"Yǒu bié de yánsè ma?",th:"มีสีอื่นไหม?"},
    {speaker:"B",zh:"有黑色、白色和蓝色。",py:"Yǒu hēisè, báisè hé lánsè.",th:"มีสีดำ สีขาว และสีน้ำเงิน"},
    {speaker:"A",zh:"我想看看蓝色的。",py:"Wǒ xiǎng kànkan lánsè de.",th:"ฉันอยากดูสีน้ำเงิน"},
    {speaker:"B",zh:"好的，这是蓝色的。",py:"Hǎo de, zhè shì lánsè de.",th:"ได้เลย นี่คือสีน้ำเงิน"},
    {speaker:"A",zh:"很好看，我买了。",py:"Hěn hǎokàn, wǒ mǎi le.",th:"สวยมาก ฉันซื้อชิ้นนี้"},
    {speaker:"B",zh:"谢谢，欢迎下次再来。",py:"Xièxie, huānyíng xià cì zài lái.",th:"ขอบคุณ ไว้มาอีกนะ"}
  ]},
  { id: "directions", emoji: "🗺️", title: "問路與搭乘交通工具", setting: "在街上詢問如何去地鐵站", lines: [
    {speaker:"A",zh:"不好意思，请问地铁站在哪儿？",py:"Bù hǎoyìsi, qǐngwèn dìtiě zhàn zài nǎr?",th:"ขอโทษนะ สถานีรถไฟใต้ดินอยู่ที่ไหน?"},
    {speaker:"B",zh:"一直往前走。",py:"Yìzhí wǎng qián zǒu.",th:"เดินตรงไปเรื่อย ๆ"},
    {speaker:"A",zh:"走多远？",py:"Zǒu duō yuǎn?",th:"ต้องเดินไกลแค่ไหน?"},
    {speaker:"B",zh:"大概五分钟。",py:"Dàgài wǔ fēnzhōng.",th:"ประมาณห้านาที"},
    {speaker:"A",zh:"到了以后怎么走？",py:"Dào le yǐhòu zěnme zǒu?",th:"พอถึงแล้วต้องไปทางไหนต่อ?"},
    {speaker:"B",zh:"在红绿灯那里左转。",py:"Zài hónglǜdēng nàli zuǒ zhuǎn.",th:"เลี้ยวซ้ายตรงสัญญาณไฟจราจร"},
    {speaker:"A",zh:"我可以坐公交车吗？",py:"Wǒ kěyǐ zuò gōngjiāo chē ma?",th:"ฉันนั่งรถเมล์ได้ไหม?"},
    {speaker:"B",zh:"可以，前面有公交车站。",py:"Kěyǐ, qiánmiàn yǒu gōngjiāo chē zhàn.",th:"ได้ ป้ายรถเมล์อยู่ข้างหน้า"},
    {speaker:"A",zh:"谢谢你告诉我。",py:"Xièxie nǐ gàosu wǒ.",th:"ขอบคุณที่บอกทาง"},
    {speaker:"B",zh:"不客气，祝你一路顺利！",py:"Bú kèqi, zhù nǐ yílù shùnlì!",th:"ไม่เป็นไร ขอให้เดินทางราบรื่น!"}
  ]},
  { id: "convenience", emoji: "🏪", title: "在便利商店購物", setting: "在便利商店買水和小點心", lines: [
    {speaker:"A",zh:"你好，我想买一瓶水。",py:"Nǐ hǎo, wǒ xiǎng mǎi yì píng shuǐ.",th:"สวัสดี ฉันอยากซื้อน้ำหนึ่งขวด"},
    {speaker:"B",zh:"好的，要冰的还是常温的？",py:"Hǎo de, yào bīng de háishi chángwēn de?",th:"ได้ค่ะ/ครับ เอาแบบเย็นหรืออุณหภูมิห้อง?"},
    {speaker:"A",zh:"我要冰的。",py:"Wǒ yào bīng de.",th:"เอาแบบเย็น"},
    {speaker:"B",zh:"还需要别的吗？",py:"Hái xūyào bié de ma?",th:"ต้องการอย่างอื่นอีกไหม?"},
    {speaker:"A",zh:"有面包吗？",py:"Yǒu miànbāo ma?",th:"มีขนมปังไหม?"},
    {speaker:"B",zh:"有，在那边。",py:"Yǒu, zài nàbiān.",th:"มี อยู่ทางนั้น"},
    {speaker:"A",zh:"这个多少钱？",py:"Zhège duōshao qián?",th:"อันนี้ราคาเท่าไร?"},
    {speaker:"B",zh:"水十块，面包十二块。",py:"Shuǐ shí kuài, miànbāo shí'èr kuài.",th:"น้ำ 10 หยวน ขนมปัง 12 หยวน"},
    {speaker:"A",zh:"我用手机付款。",py:"Wǒ yòng shǒujī fùkuǎn.",th:"ฉันจ่ายด้วยโทรศัพท์มือถือ"},
    {speaker:"B",zh:"好的，已经付好了。",py:"Hǎo de, yǐjīng fù hǎo le.",th:"ได้เลย ชำระเงินเรียบร้อยแล้ว"}
  ]},
  { id: "plans", emoji: "📅", title: "約朋友與安排時間", setting: "兩位朋友約週末一起喝咖啡", lines: [
    {speaker:"A",zh:"你周末有空吗？",py:"Nǐ zhōumò yǒu kòng ma?",th:"สุดสัปดาห์นี้คุณว่างไหม?"},
    {speaker:"B",zh:"星期六有空，怎么了？",py:"Xīngqīliù yǒu kòng, zěnme le?",th:"วันเสาร์ว่าง มีอะไรหรือ?"},
    {speaker:"A",zh:"我们一起喝咖啡，好吗？",py:"Wǒmen yìqǐ hē kāfēi, hǎo ma?",th:"เราไปดื่มกาแฟด้วยกันไหม?"},
    {speaker:"B",zh:"好啊！几点见面？",py:"Hǎo a! Jǐ diǎn jiànmiàn?",th:"ได้เลย! เจอกันกี่โมง?"},
    {speaker:"A",zh:"下午三点怎么样？",py:"Xiàwǔ sān diǎn zěnmeyàng?",th:"บ่ายสามโมงเป็นอย่างไร?"},
    {speaker:"B",zh:"可以，在哪里见？",py:"Kěyǐ, zài nǎli jiàn?",th:"ได้ เจอกันที่ไหน?"},
    {speaker:"A",zh:"在地铁站出口见吧。",py:"Zài dìtiě zhàn chūkǒu jiàn ba.",th:"เจอกันที่ทางออกสถานีรถไฟใต้ดินนะ"},
    {speaker:"B",zh:"好的，我会准时到。",py:"Hǎo de, wǒ huì zhǔnshí dào.",th:"ได้เลย ฉันจะไปให้ตรงเวลา"},
    {speaker:"A",zh:"如果你迟到，给我打电话。",py:"Rúguǒ nǐ chídào, gěi wǒ dǎ diànhuà.",th:"ถ้าคุณมาสาย โทรหาฉันนะ"},
    {speaker:"B",zh:"没问题，星期六见！",py:"Méi wèntí, xīngqīliù jiàn!",th:"ไม่มีปัญหา เจอกันวันเสาร์!"}
  ]},
  { id: "cafe", emoji: "☕", title: "在咖啡店點飲料", setting: "在咖啡店點一杯飲料並選擇甜度", lines: [
    {speaker:"A",zh:"你好，我想点一杯拿铁。",py:"Nǐ hǎo, wǒ xiǎng diǎn yì bēi nátiě.",th:"สวัสดี ฉันขอลาเต้หนึ่งแก้ว"},
    {speaker:"B",zh:"好的，要热的还是冰的？",py:"Hǎo de, yào rè de háishi bīng de?",th:"ได้ค่ะ/ครับ เอาร้อนหรือเย็น?"},
    {speaker:"A",zh:"冰的，谢谢。",py:"Bīng de, xièxie.",th:"เย็น ขอบคุณ"},
    {speaker:"B",zh:"甜度要正常还是少糖？",py:"Tiándù yào zhèngcháng háishi shǎo táng?",th:"เอาความหวานปกติหรือน้ำตาลน้อย?"},
    {speaker:"A",zh:"少糖就好。",py:"Shǎo táng jiù hǎo.",th:"หวานน้อยก็พอ"},
    {speaker:"B",zh:"要大杯还是中杯？",py:"Yào dà bēi háishi zhōng bēi?",th:"เอาแก้วใหญ่หรือกลาง?"},
    {speaker:"A",zh:"中杯多少钱？",py:"Zhōng bēi duōshao qián?",th:"แก้วกลางราคาเท่าไร?"},
    {speaker:"B",zh:"三十五块。",py:"Sānshíwǔ kuài.",th:"35 หยวน"},
    {speaker:"A",zh:"好，请帮我做一杯。",py:"Hǎo, qǐng bāng wǒ zuò yì bēi.",th:"ตกลง ช่วยทำให้ฉันหนึ่งแก้ว"},
    {speaker:"B",zh:"好的，请到旁边等一下。",py:"Hǎo de, qǐng dào pángbiān děng yíxià.",th:"ได้เลย กรุณารอด้านข้างสักครู่"}
  ]},
  { id: "hotel", emoji: "🏨", title: "住宿與飯店入住", setting: "抵達飯店後辦理入住手續", lines: [
    {speaker:"A",zh:"你好，我想办理入住。",py:"Nǐ hǎo, wǒ xiǎng bànlǐ rùzhù.",th:"สวัสดี ฉันต้องการเช็กอิน"},
    {speaker:"B",zh:"请问您有预订吗？",py:"Qǐngwèn nín yǒu yùdìng ma?",th:"ขอถามว่าคุณจองไว้ไหม?"},
    {speaker:"A",zh:"有，我订了一间房。",py:"Yǒu, wǒ dìng le yì jiān fáng.",th:"มี ฉันจองห้องไว้หนึ่งห้อง"},
    {speaker:"B",zh:"请给我看一下护照。",py:"Qǐng gěi wǒ kàn yíxià hùzhào.",th:"ขอดูหนังสือเดินทางหน่อยค่ะ/ครับ"},
    {speaker:"A",zh:"给您。早餐几点开始？",py:"Gěi nín. Zǎocān jǐ diǎn kāishǐ?",th:"นี่ค่ะ/ครับ อาหารเช้าเริ่มกี่โมง?"},
    {speaker:"B",zh:"早上七点到十点。",py:"Zǎoshang qī diǎn dào shí diǎn.",th:"เจ็ดโมงถึงสิบโมงเช้า"},
    {speaker:"A",zh:"房间有无线网络吗？",py:"Fángjiān yǒu wúxiàn wǎngluò ma?",th:"ในห้องมี Wi-Fi ไหม?"},
    {speaker:"B",zh:"有，密码写在房卡上。",py:"Yǒu, mìmǎ xiě zài fángkǎ shàng.",th:"มี รหัสเขียนอยู่บนคีย์การ์ด"},
    {speaker:"A",zh:"请问电梯在哪里？",py:"Qǐngwèn diàntī zài nǎli?",th:"ขอถามว่าลิฟต์อยู่ที่ไหน?"},
    {speaker:"B",zh:"在右边，祝您入住愉快。",py:"Zài yòubiān, zhù nín rùzhù yúkuài.",th:"อยู่ทางขวามือ ขอให้พักอย่างมีความสุข"}
  ]},
  { id: "health", emoji: "🩺", title: "看醫生與描述不舒服", setting: "在診所向醫生說明一般不適", lines: [
    {speaker:"A",zh:"医生您好，我不太舒服。",py:"Yīshēng nín hǎo, wǒ bú tài shūfu.",th:"สวัสดีคุณหมอ ฉันรู้สึกไม่ค่อยสบาย"},
    {speaker:"B",zh:"你哪里不舒服？",py:"Nǐ nǎli bù shūfu?",th:"คุณไม่สบายตรงไหน?"},
    {speaker:"A",zh:"我头疼，还有一点儿咳嗽。",py:"Wǒ tóu téng, hái yǒu yìdiǎnr késou.",th:"ฉันปวดศีรษะและไอนิดหน่อย"},
    {speaker:"B",zh:"你什么时候开始不舒服的？",py:"Nǐ shénme shíhou kāishǐ bù shūfu de?",th:"คุณเริ่มไม่สบายตั้งแต่เมื่อไร?"},
    {speaker:"A",zh:"昨天晚上开始的。",py:"Zuótiān wǎnshang kāishǐ de.",th:"เริ่มตั้งแต่เมื่อคืน"},
    {speaker:"B",zh:"你发烧了吗？",py:"Nǐ fāshāo le ma?",th:"คุณมีไข้ไหม?"},
    {speaker:"A",zh:"我不知道，但是觉得很累。",py:"Wǒ bù zhīdào, dànshì juéde hěn lèi.",th:"ฉันไม่แน่ใจ แต่รู้สึกเหนื่อยมาก"},
    {speaker:"B",zh:"我先给你量一下体温。",py:"Wǒ xiān gěi nǐ liáng yíxià tǐwēn.",th:"ฉันจะวัดอุณหภูมิให้ก่อน"},
    {speaker:"A",zh:"好的，谢谢医生。",py:"Hǎo de, xièxie yīshēng.",th:"ได้ค่ะ/ครับ ขอบคุณคุณหมอ"},
    {speaker:"B",zh:"检查以后，我再告诉你。",py:"Jiǎnchá yǐhòu, wǒ zài gàosu nǐ.",th:"หลังตรวจแล้ว ฉันจะบอกคุณอีกครั้ง"}
  ]},
  { id: "phone", emoji: "📱", title: "打電話與日常聯絡", setting: "打電話確認朋友是否到家", lines: [
    {speaker:"A",zh:"喂，你到家了吗？",py:"Wéi, nǐ dào jiā le ma?",th:"ฮัลโหล คุณถึงบ้านหรือยัง?"},
    {speaker:"B",zh:"我刚到家。你呢？",py:"Wǒ gāng dào jiā. Nǐ ne?",th:"ฉันเพิ่งถึงบ้าน แล้วคุณล่ะ?"},
    {speaker:"A",zh:"我还在路上。",py:"Wǒ hái zài lù shang.",th:"ฉันยังอยู่ระหว่างทาง"},
    {speaker:"B",zh:"你坐什么车回家？",py:"Nǐ zuò shénme chē huí jiā?",th:"คุณนั่งรถอะไรกลับบ้าน?"},
    {speaker:"A",zh:"我坐出租车。",py:"Wǒ zuò chūzū chē.",th:"ฉันนั่งแท็กซี่"},
    {speaker:"B",zh:"路上堵车吗？",py:"Lù shang dǔchē ma?",th:"รถติดไหม?"},
    {speaker:"A",zh:"有一点儿，可能晚十分钟。",py:"Yǒu yìdiǎnr, kěnéng wǎn shí fēnzhōng.",th:"ติดนิดหน่อย อาจช้าไปสิบนาที"},
    {speaker:"B",zh:"没关系，慢慢来。",py:"Méi guānxi, mànman lái.",th:"ไม่เป็นไร ค่อย ๆ มา"},
    {speaker:"A",zh:"到了我再给你打电话。",py:"Dào le wǒ zài gěi nǐ dǎ diànhuà.",th:"ถึงแล้วฉันจะโทรหาอีกครั้ง"},
    {speaker:"B",zh:"好，路上小心！",py:"Hǎo, lù shang xiǎoxīn!",th:"ได้เลย เดินทางระวังนะ!"}
  ]}
];
const scenes: Scene[] = [...baseScenes, ...extraScenes];

export default function LifePhrases() {
  const [activeScene, setActiveScene] = useState(scenes[0].id);
  const [voicesReady, setVoicesReady] = useState(false);
  const [audioError, setAudioError] = useState("");
  const [playing, setPlaying] = useState(false);
  const currentScene = scenes.find((scene) => scene.id === activeScene) ?? scenes[0];

  useEffect(() => {
    if (!("speechSynthesis" in window)) {
      setAudioError("เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง กรุณาลองใช้ Chrome หรือ Edge เวอร์ชันล่าสุด");
      return;
    }
    const update = () => setVoicesReady(window.speechSynthesis.getVoices().length > 0);
    update();
    window.speechSynthesis.addEventListener("voiceschanged", update);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", update);
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (text: string) => {
    if (!("speechSynthesis" in window)) {
      setAudioError("เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-CN";
    utterance.rate = 0.78;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find((item) => item.lang.toLowerCase() === "zh-cn") ?? voices.find((item) => item.lang.toLowerCase().startsWith("zh"));
    if (voice) utterance.voice = voice;
    utterance.onstart = () => { setPlaying(true); setAudioError(""); };
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => { setPlaying(false); setAudioError("播放失败。请检查设备音量及浏览器是否有中文语音。"); };
    window.speechSynthesis.speak(utterance);
  };

  const playAll = () => {
    if (!("speechSynthesis" in window)) {
      setAudioError("เบราว์เซอร์นี้ไม่รองรับการอ่านออกเสียง");
      return;
    }
    window.speechSynthesis.cancel();
    const lines = currentScene.lines;
    lines.forEach((line, index) => {
      const utterance = new SpeechSynthesisUtterance(line.zh);
      utterance.lang = "zh-CN";
      utterance.rate = 0.78;
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find((item) => item.lang.toLowerCase() === "zh-cn") ?? voices.find((item) => item.lang.toLowerCase().startsWith("zh"));
      if (voice) utterance.voice = voice;
      utterance.onstart = () => setPlaying(true);
      utterance.onend = () => { if (index === lines.length - 1) setPlaying(false); };
      utterance.onerror = () => { setPlaying(false); setAudioError("连续播放中断，请检查浏览器语音设置。"); };
      window.speechSynthesis.speak(utterance);
    });
  };

  const stop = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setPlaying(false);
  };

  const sceneVisuals: Record<string, { icon: string; memory: string; objects: string[] }> = {
    greeting: { icon: "👋 🧑🏻‍🤝‍🧑🏻", memory: "看見新朋友，先打招呼，再問名字。", objects: ["👋 你好", "🙋 我叫…", "🤝 很高興認識你"] },
    restaurant: { icon: "🍜 🥢 🍵", memory: "先看菜單、點主食，再選飲料。", objects: ["📖 菜單", "🍜 牛肉面", "🥤 一杯水"] },
    shopping: { icon: "👕 🛍️ 💴", memory: "看到商品，問價格、談折扣、選顏色。", objects: ["👕 衣服", "💴 多少钱？", "🎨 颜色"] },
    directions: { icon: "🗺️ 🚇 📍", memory: "先找地點，再聽方向和所需時間。", objects: ["📍 在哪儿？", "➡️ 往前走", "⏱️ 五分钟"] },
    convenience: { icon: "🏪 🧃 🍞", memory: "挑選商品、確認價格，最後付款。", objects: ["🧃 一瓶水", "🍞 面包", "📱 付款"] },
    plans: { icon: "📅 ☕ 🕒", memory: "約時間要說日期、時刻和見面地點。", objects: ["📅 星期六", "🕒 下午三点", "📍 在…见"] },
    cafe: { icon: "☕ 🧊 🧋", memory: "點飲料時，說品項、冷熱、甜度和杯型。", objects: ["☕ 拿铁", "🧊 冰的", "🍬 少糖"] },
    hotel: { icon: "🏨 🧳 🛎️", memory: "入住時準備預訂資料，並詢問設施。", objects: ["🛎️ 办理入住", "🛂 护照", "📶 无线网络"] },
    health: { icon: "🩺 🌡️ 🏥", memory: "描述哪裡不舒服、何時開始及其他症狀。", objects: ["🤕 头疼", "🤧 咳嗽", "🌡️ 体温"] },
    phone: { icon: "📱 🏠 🚕", memory: "電話聯絡時，說明位置、交通和抵達時間。", objects: ["☎️ 喂", "🏠 到家", "🚕 出租车"] }
  };
  const visual = sceneVisuals[currentScene.id] ?? { icon: currentScene.visual ?? currentScene.emoji, memory: currentScene.memory ?? "先看情境圖，再聽、讀、說。", objects: currentScene.objects ?? [] };

  return <div className="life-page">
    <header className="life-header">
      <Link href="/" className="life-brand"><span className="life-brand-mark">中</span><span>จีนเริ่มต้น<small>เรียนรู้ทีละก้าว</small></span></Link>
      <div className="life-header-links"><Link href="/vocabulary" className="life-back">单词 · คำศัพท์</Link><Link href="/" className="life-back"><ArrowLeft size={16} /> กลับหน้าหลัก</Link></div>
    </header>
    <main className="life-main">
      <section className="life-hero">
        <span className="life-eyebrow"><BookOpen size={15} /> 中文生活会话 · บทสนทนาในชีวิตประจำวัน</span>
        <h1>生活用语 <span>ภาษาจีนที่ใช้ได้ทุกวัน</span></h1>
        <p>ฝึกบทสนทนาตามสถานการณ์จริง อ่านจีนพร้อมพินอินและคำแปลภาษาไทย แล้วกดฟังทีละประโยคหรือเล่นต่อเนื่องทั้งบท</p>
        <div className="life-stats"><span><b>{scenes.length}</b> สถานการณ์</span><span><b>{scenes.reduce((n, s) => n + s.lines.length, 0)}</b> ประโยคพร้อมเสียง</span><span><b>初学者</b> เริ่มเรียนได้ทันที</span></div>
      </section>
      <section className="life-workspace">
        <aside className="life-sidebar"><h2>เลือกสถานการณ์ <small className="life-ui-thai">เลือกหัวข้อที่ต้องการฝึก</small></h2>{scenes.map((scene, index) => <button key={scene.id} className={activeScene === scene.id ? "life-scene-button active" : "life-scene-button"} onClick={() => { stop(); setActiveScene(scene.id); setAudioError(""); }}><span className="life-scene-emoji">{scene.emoji}</span><span><small>สถานการณ์ {String(index + 1).padStart(2, "0")}</small><b>{scene.title}</b><span className="life-scene-thai">{sceneThaiTitle(scene)}</span></span></button>)}</aside>
        <section className="life-dialogue">
          <div className="life-dialogue-heading"><div><span className="life-eyebrow">สถานการณ์ · {String(scenes.findIndex((scene) => scene.id === activeScene) + 1).padStart(2, "0")}</span><h2>{currentScene.emoji} {currentScene.title}</h2><p className="life-scene-thai-heading">{sceneThaiTitle(currentScene)}</p><p>{currentScene.setting}</p><p className="life-ui-thai">{sceneThaiSetting(currentScene)}</p></div><div className="life-audio-actions"><button onClick={playAll} className="life-play-all"><Play size={15} /> เล่นบทสนทนาทั้งหมด</button><button onClick={stop} className="life-stop" disabled={!playing}><Square size={13} /> หยุด</button></div></div>
          {audioError && <p className="life-audio-error" role="status">{audioError}</p>}
          {!voicesReady && !audioError && <p className="life-audio-hint">กำลังโหลดเสียง หากไม่มีเสียงภาษาจีน ระบบจะใช้เสียงภาษาจีนที่เบราว์เซอร์รองรับ</p>}
          <section className="life-visual-memory" aria-label="情境圖像記憶">
            <div className="life-visual-art"><span>{visual.icon}</span><small>ภาพช่วยจำ · ภาพประกอบสถานการณ์</small></div>
            <div className="life-visual-copy"><strong>ดูภาพก่อน แล้วค่อยเรียนภาษาจีน</strong><p>{visual.memory}</p><div className="life-object-tags">{visual.objects.map((item) => <button type="button" key={item} onClick={() => speak(item.replace(/^[^\u4e00-\u9fff]+/, "").split(/[·=]/)[0].trim())} title="ฟังเสียงภาษาจีน">{item} <Volume2 size={12}/></button>)}</div></div>
          </section>
          <div className="life-lines">{currentScene.lines.map((line, index) => <article className={`life-line speaker-${line.speaker.toLowerCase()}`} key={`${currentScene.id}-${index}`}><span className="life-speaker">{line.speaker === "A" ? "甲" : "乙"}</span><div className="life-line-content"><strong className="life-chinese">{line.zh}</strong><span className="life-pinyin">{line.py}</span><span className="life-thai">{line.th}</span></div><button className="life-speak" aria-label={`播放中文：${line.zh}`} title="播放中文" onClick={() => speak(line.zh)}><Volume2 size={18} /></button></article>)}</div>
          <section className="life-grammar-notes" aria-label="句型解析">
            <h3>📝 句型解析 · อธิบายรูปประโยค</h3>
            <article><strong>1. 想 + 動詞 · 想 + คำกริยา</strong><p>ใช้บอกความต้องการ แปลว่า “อยาก…” เช่น <button type="button" className="life-example-speak" onClick={() => speak("我想喝水。")} aria-label="ฟังประโยค 我想喝水"><Volume2 size={13}/> 我想喝水。</button> = ฉันอยากดื่มน้ำ</p></article>
            <article><strong>2. 請問……？· ขอถามว่า…?</strong><p>ใช้ถามข้อมูลอย่างสุภาพ เช่น <button type="button" className="life-example-speak" onClick={() => speak("请问洗手间在哪里？")} aria-label="ฟังประโยค 请问洗手间在哪里"><Volume2 size={13}/> 请问洗手间在哪里？</button> = ขอถามว่าห้องน้ำอยู่ที่ไหน?</p></article>
            <article><strong>3. 可以……嗎？· สามารถ…ได้ไหม?</strong><p>ใช้ถามว่าสามารถทำสิ่งนั้นได้หรือไม่ เช่น <button type="button" className="life-example-speak" onClick={() => speak("可以坐这里吗？")} aria-label="ฟังประโยค 可以坐这里吗"><Volume2 size={13}/> 可以坐这里吗？</button> = นั่งตรงนี้ได้ไหม?</p></article>
            <p className="life-note-reminder">💡 เคล็ดลับ: เข้าใจความหมายภาษาไทยก่อน จากนั้นฟังภาษาจีน อ่านพินอินตาม และลองพูดเองโดยไม่ดูคำแปล</p>
          </section>
          <div className="life-bottom-note"><MessageCircle size={17} /><span>วิธีฝึก: ฟังภาษาจีนก่อน อ่านพินอินและพูดตาม แล้วลองพูดอีกครั้งโดยดูเฉพาะตัวอักษรจีน</span></div>
        </section>
      </section>
    </main>
    <footer className="life-footer">中文 · 拼音 · ภาษาไทย · 聽力練習</footer>
  </div>;
}
