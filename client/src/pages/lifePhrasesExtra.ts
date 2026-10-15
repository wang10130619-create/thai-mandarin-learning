export type ExtraLine = { speaker: "A" | "B"; zh: string; py: string; th: string };
export type ExtraScene = { id: string; emoji: string; title: string; setting: string; lines: ExtraLine[]; visual: string; memory: string; objects: string[] };

export const extraScenes: ExtraScene[] = [
  { id:"market", emoji:"🥬", title:"在市場買水果", setting:"早上到市場挑選水果，詢問價格與新鮮度", visual:"🍎 🍌 🧺 💴", memory:"先說想買什麼，再問價格、數量與是否新鮮。", objects:["🍎 苹果","💴 多少钱？","🧺 一斤"], lines:[
    {speaker:"A",zh:"老板，苹果怎么卖？",py:"Lǎobǎn, píngguǒ zěnme mài?",th:"พ่อค้า/แม่ค้า แอปเปิลขายอย่างไร?"},
    {speaker:"B",zh:"十五块钱一斤。",py:"Shíwǔ kuài qián yì jīn.",th:"15 หยวนต่อครึ่งกิโล"},
    {speaker:"A",zh:"这些新鲜吗？",py:"Zhèxiē xīnxiān ma?",th:"พวกนี้สดไหม?"},
    {speaker:"B",zh:"今天早上刚到的。",py:"Jīntiān zǎoshang gāng dào de.",th:"เพิ่งมาถึงเมื่อเช้านี้"},
    {speaker:"A",zh:"那给我来两斤吧。",py:"Nà gěi wǒ lái liǎng jīn ba.",th:"งั้นเอาสองจิน"},
    {speaker:"B",zh:"好的，一共三十块。",py:"Hǎo de, yígòng sānshí kuài.",th:"ได้ ทั้งหมด 30 หยวน"}
  ]},
  { id:"bus", emoji:"🚌", title:"搭公車與下車", setting:"在公車站確認路線並詢問下車站點", visual:"🚌 🚏 🗺️", memory:"上車前確認方向，快到站時請司機提醒。", objects:["🚏 公交车站","🚌 坐车","📍 下车"], lines:[
    {speaker:"A",zh:"请问，这辆车去市中心吗？",py:"Qǐngwèn, zhè liàng chē qù shì zhōngxīn ma?",th:"ขอโทษ รถคันนี้ไปใจกลางเมืองไหม?"},
    {speaker:"B",zh:"去，你要在哪一站下车？",py:"Qù, nǐ yào zài nǎ yì zhàn xià chē?",th:"ไป คุณจะลงป้ายไหน?"},
    {speaker:"A",zh:"我要在图书馆下车。",py:"Wǒ yào zài túshūguǎn xià chē.",th:"ฉันจะลงที่ห้องสมุด"},
    {speaker:"B",zh:"大概还有六站。",py:"Dàgài hái yǒu liù zhàn.",th:"ประมาณอีกหกป้าย"},
    {speaker:"A",zh:"快到了，可以提醒我吗？",py:"Kuài dào le, kěyǐ tíxǐng wǒ ma?",th:"ใกล้ถึงแล้ว ช่วยเตือนฉันได้ไหม?"},
    {speaker:"B",zh:"没问题。",py:"Méi wèntí.",th:"ไม่มีปัญหา"}
  ]},
  { id:"taxi", emoji:"🚕", title:"搭計程車", setting:"上車後告訴司機目的地與下車位置", visual:"🚕 📍 🏙️", memory:"清楚說出目的地，必要時補充地址或地標。", objects:["🚕 出租车","📍 地址","➡️ 到这里"], lines:[
    {speaker:"A",zh:"师傅，麻烦去这个地址。",py:"Shīfu, máfan qù zhège dìzhǐ.",th:"คุณคนขับ รบกวนไปตามที่อยู่นี้"},
    {speaker:"B",zh:"好的，走这条路可以吗？",py:"Hǎo de, zǒu zhè tiáo lù kěyǐ ma?",th:"ได้ ใช้เส้นทางนี้ได้ไหม?"},
    {speaker:"A",zh:"可以，哪条路比较快？",py:"Kěyǐ, nǎ tiáo lù bǐjiào kuài?",th:"ได้ เส้นทางไหนเร็วกว่ากัน?"},
    {speaker:"B",zh:"今天这边有点儿堵车。",py:"Jīntiān zhèbiān yǒudiǎnr dǔchē.",th:"วันนี้ทางนี้รถติดนิดหน่อย"},
    {speaker:"A",zh:"没关系，安全第一。",py:"Méi guānxi, ānquán dì-yī.",th:"ไม่เป็นไร ความปลอดภัยมาก่อน"},
    {speaker:"B",zh:"到了，我停在路边。",py:"Dào le, wǒ tíng zài lùbiān.",th:"ถึงแล้ว ผมจอดข้างทาง"}
  ]},
  { id:"pharmacy", emoji:"💊", title:"在藥局買常用藥", setting:"向藥師描述輕微不適並詢問用法", visual:"💊 🧑‍⚕️ 🥤", memory:"描述症狀與持續時間，並確認用量；嚴重症狀應就醫。", objects:["🤒 不舒服","💊 怎么吃？","🕒 一天两次"], lines:[
    {speaker:"A",zh:"你好，我有点儿头疼。",py:"Nǐ hǎo, wǒ yǒudiǎnr tóuténg.",th:"สวัสดี ฉันปวดหัวนิดหน่อย"},
    {speaker:"B",zh:"疼了多长时间？",py:"Téng le duō cháng shíjiān?",th:"ปวดมานานแค่ไหนแล้ว?"},
    {speaker:"A",zh:"从今天早上开始。",py:"Cóng jīntiān zǎoshang kāishǐ.",th:"เริ่มตั้งแต่เช้าวันนี้"},
    {speaker:"B",zh:"这个药一天吃两次。",py:"Zhège yào yì tiān chī liǎng cì.",th:"ยานี้กินวันละสองครั้ง"},
    {speaker:"A",zh:"饭前吃还是饭后吃？",py:"Fàn qián chī háishi fàn hòu chī?",th:"กินก่อนอาหารหรือหลังอาหาร?"},
    {speaker:"B",zh:"饭后吃，请看一下说明。",py:"Fàn hòu chī, qǐng kàn yíxià shuōmíng.",th:"กินหลังอาหาร กรุณาอ่านคำแนะนำด้วย"}
  ]},
  { id:"clinic-appointment", emoji:"🩺", title:"預約看診", setting:"打電話向診所預約看診時間", visual:"📞 🩺 📅", memory:"預約時說明日期、時間與姓名，最後確認資訊。", objects:["📅 预约","🕒 几点","🪪 姓名"], lines:[
    {speaker:"A",zh:"你好，我想预约看医生。",py:"Nǐ hǎo, wǒ xiǎng yùyuē kàn yīshēng.",th:"สวัสดี ฉันต้องการนัดพบแพทย์"},
    {speaker:"B",zh:"您想预约哪一天？",py:"Nín xiǎng yùyuē nǎ yì tiān?",th:"คุณต้องการนัดวันไหน?"},
    {speaker:"A",zh:"我想约明天下午。",py:"Wǒ xiǎng yuē míngtiān xiàwǔ.",th:"ฉันอยากนัดพรุ่งนี้ช่วงบ่าย"},
    {speaker:"B",zh:"下午三点可以吗？",py:"Xiàwǔ sān diǎn kěyǐ ma?",th:"บ่ายสามโมงได้ไหม?"},
    {speaker:"A",zh:"可以，我姓林。",py:"Kěyǐ, wǒ xìng Lín.",th:"ได้ ฉันนามสกุลหลิน"},
    {speaker:"B",zh:"好的，明天下午三点见。",py:"Hǎo de, míngtiān xiàwǔ sān diǎn jiàn.",th:"ได้ พรุ่งนี้บ่ายสามโมงพบกัน"}
  ]},
  { id:"weather", emoji:"🌦️", title:"聊天氣與穿著", setting:"出門前和朋友討論天氣與帶傘", visual:"☀️ 🌧️ ☂️", memory:"用冷热、晴雨描述天气，再说准备带什么。", objects:["🌤️ 天气","🌧️ 下雨","☂️ 带伞"], lines:[
    {speaker:"A",zh:"今天天气怎么样？",py:"Jīntiān tiānqì zěnmeyàng?",th:"วันนี้อากาศเป็นอย่างไร?"},
    {speaker:"B",zh:"早上很晴，下午可能下雨。",py:"Zǎoshang hěn qíng, xiàwǔ kěnéng xiàyǔ.",th:"ตอนเช้าแดดดี บ่ายอาจฝนตก"},
    {speaker:"A",zh:"那我带把伞吧。",py:"Nà wǒ dài bǎ sǎn ba.",th:"งั้นฉันพกร่มไป"},
    {speaker:"B",zh:"今天也有一点儿冷。",py:"Jīntiān yě yǒu yìdiǎnr lěng.",th:"วันนี้ก็เย็นนิดหน่อย"},
    {speaker:"A",zh:"我再穿一件外套。",py:"Wǒ zài chuān yí jiàn wàitào.",th:"ฉันจะใส่เสื้อคลุมอีกตัว"},
    {speaker:"B",zh:"这样就准备好了。",py:"Zhèyàng jiù zhǔnbèi hǎo le.",th:"แบบนี้ก็พร้อมแล้ว"}
  ]},
  { id:"home", emoji:"🏠", title:"介紹自己的家", setting:"第一次邀請朋友到家裡，介紹房間", visual:"🏠 🛋️ 🪴", memory:"介紹房間位置與家中物品，常用“这里有……”。", objects:["🏠 家","🛋️ 客厅","🛏️ 房间"], lines:[
    {speaker:"A",zh:"欢迎来我家！",py:"Huānyíng lái wǒ jiā!",th:"ยินดีต้อนรับสู่บ้านฉัน!"},
    {speaker:"B",zh:"谢谢，你家很漂亮。",py:"Xièxie, nǐ jiā hěn piàoliang.",th:"ขอบคุณ บ้านคุณสวยมาก"},
    {speaker:"A",zh:"这是客厅，厨房在那边。",py:"Zhè shì kètīng, chúfáng zài nàbiān.",th:"นี่คือห้องนั่งเล่น ห้องครัวอยู่ทางนั้น"},
    {speaker:"B",zh:"你的房间在哪里？",py:"Nǐ de fángjiān zài nǎli?",th:"ห้องของคุณอยู่ที่ไหน?"},
    {speaker:"A",zh:"在二楼，旁边有一个阳台。",py:"Zài èr lóu, pángbiān yǒu yí ge yángtái.",th:"อยู่ชั้นสอง ข้าง ๆ มีระเบียง"},
    {speaker:"B",zh:"这里很舒服！",py:"Zhèlǐ hěn shūfu!",th:"ที่นี่สบายมาก!"}
  ]},
  { id:"chores", emoji:"🧹", title:"分配家務", setting:"和室友討論打掃與倒垃圾", visual:"🧹 🧽 🗑️", memory:"說清楚要做的家務，並約好誰負責。", objects:["🧹 打扫","🧺 洗衣服","🗑️ 倒垃圾"], lines:[
    {speaker:"A",zh:"今天我们一起打扫房间吧。",py:"Jīntiān wǒmen yìqǐ dǎsǎo fángjiān ba.",th:"วันนี้เรามาทำความสะอาดห้องด้วยกันเถอะ"},
    {speaker:"B",zh:"好，你想做什么？",py:"Hǎo, nǐ xiǎng zuò shénme?",th:"ได้ คุณอยากทำอะไร?"},
    {speaker:"A",zh:"我负责扫地，你擦桌子。",py:"Wǒ fùzé sǎo dì, nǐ cā zhuōzi.",th:"ฉันกวาดพื้น คุณเช็ดโต๊ะ"},
    {speaker:"B",zh:"那谁去倒垃圾？",py:"Nà shéi qù dào lājī?",th:"แล้วใครไปทิ้งขยะ?"},
    {speaker:"A",zh:"我打扫完以后去。",py:"Wǒ dǎsǎo wán yǐhòu qù.",th:"ฉันจะไปหลังทำความสะอาดเสร็จ"},
    {speaker:"B",zh:"太好了，谢谢！",py:"Tài hǎo le, xièxie!",th:"ดีมาก ขอบคุณ!"}
  ]},
  { id:"laundry", emoji:"🧺", title:"在自助洗衣店", setting:"在洗衣店詢問洗衣機與烘乾機", visual:"🧺 🫧 ⏱️", memory:"詢問洗衣程序、所需時間與付款方式。", objects:["🧺 洗衣服","🫧 洗衣机","⏱️ 多久"], lines:[
    {speaker:"A",zh:"请问，洗衣机怎么用？",py:"Qǐngwèn, xǐyījī zěnme yòng?",th:"ขอโทษ เครื่องซักผ้าใช้อย่างไร?"},
    {speaker:"B",zh:"先放衣服，再放洗衣液。",py:"Xiān fàng yīfu, zài fàng xǐyīyè.",th:"ใส่เสื้อผ้าก่อน แล้วใส่น้ำยาซักผ้า"},
    {speaker:"A",zh:"一次要洗多久？",py:"Yí cì yào xǐ duō jiǔ?",th:"ซักหนึ่งครั้งใช้เวลานานเท่าไร?"},
    {speaker:"B",zh:"大概四十分钟。",py:"Dàgài sìshí fēnzhōng.",th:"ประมาณ 40 นาที"},
    {speaker:"A",zh:"旁边可以烘干吗？",py:"Pángbiān kěyǐ hōnggān ma?",th:"ข้าง ๆ อบผ้าให้แห้งได้ไหม?"},
    {speaker:"B",zh:"可以，烘干要另外付钱。",py:"Kěyǐ, hōnggān yào lìngwài fù qián.",th:"ได้ อบแห้งต้องจ่ายเพิ่ม"}
  ]},
  { id:"gym", emoji:"🏋️", title:"在健身房詢問", setting:"第一次去健身房，詢問器材與體驗課", visual:"🏋️ 🧘 💧", memory:"先說明是第一次來，再詢問器材、課程和規則。", objects:["🏋️ 健身房","🧘 课程","💧 休息"], lines:[
    {speaker:"A",zh:"你好，我第一次来这里。",py:"Nǐ hǎo, wǒ dì-yī cì lái zhèlǐ.",th:"สวัสดี นี่เป็นครั้งแรกที่ฉันมาที่นี่"},
    {speaker:"B",zh:"欢迎！你想先了解什么？",py:"Huānyíng! Nǐ xiǎng xiān liǎojiě shénme?",th:"ยินดีต้อนรับ! คุณอยากรู้เรื่องอะไรก่อน?"},
    {speaker:"A",zh:"这些器材怎么使用？",py:"Zhèxiē qìcái zěnme shǐyòng?",th:"อุปกรณ์เหล่านี้ใช้อย่างไร?"},
    {speaker:"B",zh:"我可以先教你基本动作。",py:"Wǒ kěyǐ xiān jiāo nǐ jīběn dòngzuò.",th:"ฉันสอนท่าพื้นฐานให้ก่อนได้"},
    {speaker:"A",zh:"这里有瑜伽课吗？",py:"Zhèlǐ yǒu yújiā kè ma?",th:"ที่นี่มีคลาสโยคะไหม?"},
    {speaker:"B",zh:"有，周三晚上有一节。",py:"Yǒu, zhōusān wǎnshang yǒu yì jié.",th:"มี วันพุธตอนเย็นมีหนึ่งคลาส"}
  ]},
  { id:"library", emoji:"📚", title:"在圖書館借書", setting:"辦理借書證並詢問書籍位置", visual:"📚 🪪 🔖", memory:"先詢問辦證，再說書名、找位置與歸還日期。", objects:["📚 图书馆","🪪 借书证","📅 还书"], lines:[
    {speaker:"A",zh:"你好，我想办借书证。",py:"Nǐ hǎo, wǒ xiǎng bàn jièshūzhèng.",th:"สวัสดี ฉันอยากทำบัตรยืมหนังสือ"},
    {speaker:"B",zh:"请给我看一下身份证件。",py:"Qǐng gěi wǒ kàn yíxià shēnfèn zhèngjiàn.",th:"ขอดูเอกสารประจำตัวหน่อย"},
    {speaker:"A",zh:"好的，办好以后可以借几本？",py:"Hǎo de, bàn hǎo yǐhòu kěyǐ jiè jǐ běn?",th:"ได้ ทำเสร็จแล้วยืมได้กี่เล่ม?"},
    {speaker:"B",zh:"一次最多可以借五本。",py:"Yí cì zuìduō kěyǐ jiè wǔ běn.",th:"ครั้งหนึ่งยืมได้มากสุดห้าเล่ม"},
    {speaker:"A",zh:"中文初级书在哪里？",py:"Zhōngwén chūjí shū zài nǎli?",th:"หนังสือภาษาจีนระดับต้นอยู่ที่ไหน?"},
    {speaker:"B",zh:"在二楼左边的书架上。",py:"Zài èr lóu zuǒbiān de shūjià shàng.",th:"อยู่บนชั้นหนังสือด้านซ้ายชั้นสอง"}
  ]},
  { id:"post-office", emoji:"📦", title:"寄包裹", setting:"到郵局寄送包裹並詢問運送時間", visual:"📦 ✉️ 🏤", memory:"確認地址、重量、費用和預計送達時間。", objects:["📦 包裹","📍 地址","⏱️ 几天"], lines:[
    {speaker:"A",zh:"你好，我想寄一个包裹。",py:"Nǐ hǎo, wǒ xiǎng jì yí ge bāoguǒ.",th:"สวัสดี ฉันต้องการส่งพัสดุหนึ่งชิ้น"},
    {speaker:"B",zh:"请把地址写在这里。",py:"Qǐng bǎ dìzhǐ xiě zài zhèlǐ.",th:"กรุณาเขียนที่อยู่ตรงนี้"},
    {speaker:"A",zh:"寄到这个城市要多少钱？",py:"Jì dào zhège chéngshì yào duōshao qián?",th:"ส่งไปเมืองนี้ราคาเท่าไร?"},
    {speaker:"B",zh:"普通邮寄三十块，快递五十块。",py:"Pǔtōng yóujì sānshí kuài, kuàidì wǔshí kuài.",th:"ส่งธรรมดา 30 หยวน ส่งด่วน 50 หยวน"},
    {speaker:"A",zh:"快递要几天？",py:"Kuàidì yào jǐ tiān?",th:"ส่งด่วนใช้กี่วัน?"},
    {speaker:"B",zh:"一般两天就到了。",py:"Yìbān liǎng tiān jiù dào le.",th:"ปกติสองวันก็ถึง"}
  ]},
  { id:"bank", emoji:"🏦", title:"在銀行辦事", setting:"到銀行詢問開戶所需資料", visual:"🏦 🪪 🖊️", memory:"先說要辦的業務，再詢問需要的證件與填寫方式。", objects:["🏦 银行","🪪 证件","🖊️ 填表"], lines:[
    {speaker:"A",zh:"你好，我想开一个账户。",py:"Nǐ hǎo, wǒ xiǎng kāi yí ge zhànghù.",th:"สวัสดี ฉันอยากเปิดบัญชี"},
    {speaker:"B",zh:"请问您带证件了吗？",py:"Qǐngwèn nín dài zhèngjiàn le ma?",th:"ขอถามว่าคุณนำเอกสารมาหรือยัง?"},
    {speaker:"A",zh:"带了，需要填什么表？",py:"Dài le, xūyào tián shénme biǎo?",th:"นำมาแล้ว ต้องกรอกแบบฟอร์มอะไร?"},
    {speaker:"B",zh:"请先填写这张申请表。",py:"Qǐng xiān tiánxiě zhè zhāng shēnqǐng biǎo.",th:"กรุณากรอกใบสมัครนี้ก่อน"},
    {speaker:"A",zh:"办好以后有银行卡吗？",py:"Bàn hǎo yǐhòu yǒu yínhángkǎ ma?",th:"ทำเสร็จแล้วจะมีบัตรธนาคารไหม?"},
    {speaker:"B",zh:"有，我们会一起给您。",py:"Yǒu, wǒmen huì yìqǐ gěi nín.",th:"มี เราจะให้คุณพร้อมกัน"}
  ]},
  { id:"haircut", emoji:"💇", title:"去理髮店剪頭髮", setting:"向設計師說明想要的髮型與長度", visual:"💇 ✂️ 🪞", memory:"先說剪短或修整，再用長度、瀏海等詞描述需求。", objects:["✂️ 剪头发","📏 短一点","🪞 镜子"], lines:[
    {speaker:"A",zh:"你好，我想剪头发。",py:"Nǐ hǎo, wǒ xiǎng jiǎn tóufa.",th:"สวัสดี ฉันอยากตัดผม"},
    {speaker:"B",zh:"想剪短一点儿吗？",py:"Xiǎng jiǎn duǎn yìdiǎnr ma?",th:"อยากตัดให้สั้นลงหน่อยไหม?"},
    {speaker:"A",zh:"两边短一点，前面不要太短。",py:"Liǎngbiān duǎn yìdiǎnr, qiánmiàn bú yào tài duǎn.",th:"ด้านข้างสั้นหน่อย ด้านหน้าอย่าสั้นเกินไป"},
    {speaker:"B",zh:"需要剪刘海吗？",py:"Xūyào jiǎn liúhǎi ma?",th:"ต้องการตัดหน้าม้าไหม?"},
    {speaker:"A",zh:"要，帮我修整一下。",py:"Yào, bāng wǒ xiūzhěng yíxià.",th:"ต้องการ ช่วยเล็มให้หน่อย"},
    {speaker:"B",zh:"好的，剪完给您看镜子。",py:"Hǎo de, jiǎn wán gěi nín kàn jìngzi.",th:"ได้ ตัดเสร็จแล้วจะให้ดูกระจก"}
  ]},
  { id:"gift", emoji:"🎁", title:"挑選生日禮物", setting:"和朋友一起為生日派對挑選禮物", visual:"🎁 🎂 🎈", memory:"先問對方喜好，再討論禮物種類和預算。", objects:["🎁 礼物","❤️ 喜欢","💴 预算"], lines:[
    {speaker:"A",zh:"我们给小美买什么生日礼物？",py:"Wǒmen gěi Xiǎoměi mǎi shénme shēngrì lǐwù?",th:"เราจะซื้อของขวัญวันเกิดอะไรให้เสี่ยวเหม่ยดี?"},
    {speaker:"B",zh:"她喜欢看书，可以买一本书。",py:"Tā xǐhuan kàn shū, kěyǐ mǎi yì běn shū.",th:"เธอชอบอ่านหนังสือ ซื้อหนังสือสักเล่มได้"},
    {speaker:"A",zh:"这个想法不错，多少钱？",py:"Zhège xiǎngfǎ búcuò, duōshao qián?",th:"ไอเดียนี้ดี ราคาเท่าไร?"},
    {speaker:"B",zh:"大概一百块。",py:"Dàgài yì bǎi kuài.",th:"ประมาณ 100 หยวน"},
    {speaker:"A",zh:"我们再买一张生日卡吧。",py:"Wǒmen zài mǎi yì zhāng shēngrì kǎ ba.",th:"เราซื้อการ์ดวันเกิดอีกใบเถอะ"},
    {speaker:"B",zh:"好，我来写祝福语。",py:"Hǎo, wǒ lái xiě zhùfúyǔ.",th:"ได้ ฉันเขียนคำอวยพรเอง"}
  ]},
  { id:"birthday", emoji:"🎂", title:"參加生日派對", setting:"到朋友家參加生日派對並送上祝福", visual:"🎂 🎈 🎉", memory:"進門打招呼、送禮物，再說生日祝福。", objects:["🎂 生日快乐","🎁 礼物","🎉 派对"], lines:[
    {speaker:"A",zh:"生日快乐！这是送给你的礼物。",py:"Shēngrì kuàilè! Zhè shì sòng gěi nǐ de lǐwù.",th:"สุขสันต์วันเกิด! นี่คือของขวัญสำหรับคุณ"},
    {speaker:"B",zh:"谢谢你，还特意来了。",py:"Xièxie nǐ, hái tèyì lái le.",th:"ขอบคุณที่ตั้งใจมานะ"},
    {speaker:"A",zh:"你许愿了吗？",py:"Nǐ xǔyuàn le ma?",th:"คุณอธิษฐานหรือยัง?"},
    {speaker:"B",zh:"还没有，等大家一起唱歌。",py:"Hái méiyǒu, děng dàjiā yìqǐ chànggē.",th:"ยังเลย รอทุกคนร้องเพลงด้วยกัน"},
    {speaker:"A",zh:"祝你每天都开心！",py:"Zhù nǐ měitiān dōu kāixīn!",th:"ขอให้คุณมีความสุขทุกวัน"},
    {speaker:"B",zh:"谢谢，快来吃蛋糕吧。",py:"Xièxie, kuài lái chī dàngāo ba.",th:"ขอบคุณ มากินเค้กกันเถอะ"}
  ]},
  { id:"movie", emoji:"🎬", title:"約朋友看電影", setting:"和朋友選電影、訂票並約見面時間", visual:"🎬 🍿 🎟️", memory:"討論片名、場次、座位，最後約好碰面地點。", objects:["🎬 电影","🎟️ 电影票","🕒 几点"], lines:[
    {speaker:"A",zh:"周末我们去看电影吧。",py:"Zhōumò wǒmen qù kàn diànyǐng ba.",th:"สุดสัปดาห์เราไปดูหนังกันเถอะ"},
    {speaker:"B",zh:"好啊，你想看哪一部？",py:"Hǎo a, nǐ xiǎng kàn nǎ yí bù?",th:"ได้ คุณอยากดูเรื่องไหน?"},
    {speaker:"A",zh:"我想看这部喜剧片。",py:"Wǒ xiǎng kàn zhè bù xǐjù piàn.",th:"ฉันอยากดูหนังตลกเรื่องนี้"},
    {speaker:"B",zh:"晚上七点有一场。",py:"Wǎnshang qī diǎn yǒu yì chǎng.",th:"ตอนหนึ่งทุ่มมีรอบหนึ่ง"},
    {speaker:"A",zh:"我来买票，我们六点半见。",py:"Wǒ lái mǎi piào, wǒmen liù diǎn bàn jiàn.",th:"ฉันซื้อตั๋วเอง เราเจอกันหกโมงครึ่ง"},
    {speaker:"B",zh:"好，别忘了带爆米花！",py:"Hǎo, bié wàng le dài bàomǐhuā!",th:"ได้ อย่าลืมเอาป๊อปคอร์นมาด้วย!"}
  ]},
  { id:"restaurant-reservation", emoji:"🍽️", title:"預約餐廳與候位", setting:"打電話預約晚餐並確認人數", visual:"🍽️ 📞 🪑", memory:"預約時說日期、時間、人數與姓名。", objects:["📞 预约","👥 几位","🕖 晚上七点"], lines:[
    {speaker:"A",zh:"你好，我想预约今晚的晚餐。",py:"Nǐ hǎo, wǒ xiǎng yùyuē jīnwǎn de wǎncān.",th:"สวัสดี ฉันต้องการจองอาหารเย็นคืนนี้"},
    {speaker:"B",zh:"请问几位？",py:"Qǐngwèn jǐ wèi?",th:"ขอถามว่ากี่ท่าน?"},
    {speaker:"A",zh:"四位，晚上七点。",py:"Sì wèi, wǎnshang qī diǎn.",th:"สี่ท่าน หนึ่งทุ่ม"},
    {speaker:"B",zh:"请问您贵姓？",py:"Qǐngwèn nín guì xìng?",th:"ขอทราบนามสกุลของคุณ"},
    {speaker:"A",zh:"我姓陈，电话号码是……",py:"Wǒ xìng Chén, diànhuà hàomǎ shì…",th:"ฉันนามสกุลเฉิน หมายเลขโทรศัพท์คือ…"},
    {speaker:"B",zh:"好的，已经为您登记好了。",py:"Hǎo de, yǐjīng wèi nín dēngjì hǎo le.",th:"ได้ บันทึกการจองให้เรียบร้อยแล้ว"}
  ]},
  { id:"lost-item", emoji:"🔎", title:"尋找遺失物品", setting:"在服務台詢問是否有人撿到遺失的物品", visual:"🔎 🎒 🪪", memory:"說明物品特徵、最後出現的位置與聯絡方式。", objects:["🔎 找东西","🎒 背包","📍 丢在哪里"], lines:[
    {speaker:"A",zh:"不好意思，我的包不见了。",py:"Bù hǎoyìsi, wǒ de bāo bú jiàn le.",th:"ขอโทษ กระเป๋าของฉันหายไป"},
    {speaker:"B",zh:"您最后在哪里看到的？",py:"Nín zuìhòu zài nǎli kàn dào de?",th:"คุณเห็นครั้งสุดท้ายที่ไหน?"},
    {speaker:"A",zh:"我刚才坐在门口的椅子上。",py:"Wǒ gāngcái zuò zài ménkǒu de yǐzi shàng.",th:"เมื่อกี้ฉันนั่งบนเก้าอี้ตรงทางเข้า"},
    {speaker:"B",zh:"包是什么颜色的？",py:"Bāo shì shénme yánsè de?",th:"กระเป๋าสีอะไร?"},
    {speaker:"A",zh:"是黑色的，里面有我的证件。",py:"Shì hēisè de, lǐmiàn yǒu wǒ de zhèngjiàn.",th:"สีดำ ข้างในมีเอกสารของฉัน"},
    {speaker:"B",zh:"我帮您问一下服务台。",py:"Wǒ bāng nín wèn yíxià fúwùtái.",th:"ฉันช่วยถามที่เคาน์เตอร์บริการให้"}
  ]},
  { id:"wifi", emoji:"📶", title:"詢問 Wi-Fi 密碼", setting:"在咖啡店或住宿處詢問無線網路", visual:"📶 📱 🔑", memory:"詢問網路名稱與密碼，確認是否需要登入。", objects:["📶 无线网络","🔑 密码","📱 连接"], lines:[
    {speaker:"A",zh:"请问这里有无线网络吗？",py:"Qǐngwèn zhèlǐ yǒu wúxiàn wǎngluò ma?",th:"ขอโทษ ที่นี่มี Wi-Fi ไหม?"},
    {speaker:"B",zh:"有，网络名称写在这里。",py:"Yǒu, wǎngluò míngchēng xiě zài zhèlǐ.",th:"มี ชื่อเครือข่ายเขียนอยู่ตรงนี้"},
    {speaker:"A",zh:"密码是什么？",py:"Mìmǎ shì shénme?",th:"รหัสผ่านคืออะไร?"},
    {speaker:"B",zh:"密码是八个数字。",py:"Mìmǎ shì bā ge shùzì.",th:"รหัสผ่านเป็นตัวเลขแปดหลัก"},
    {speaker:"A",zh:"连上了，谢谢！",py:"Lián shàng le, xièxie!",th:"เชื่อมต่อได้แล้ว ขอบคุณ!"},
    {speaker:"B",zh:"不客气，有问题再告诉我。",py:"Bú kèqi, yǒu wèntí zài gàosu wǒ.",th:"ไม่เป็นไร มีปัญหาก็บอกฉันได้"}
  ]},

];
