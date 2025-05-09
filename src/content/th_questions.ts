import { Question } from "@/types/QuizType";

export const personalityQuestions: Question[] = [
  {
    title: "เสียงของการเริ่มต้น",
    question: `คุณลืมตาขึ้นมาในห้องสีขาวที่เงียบจนได้ยินเสียงหัวใจเต้นเบา ๆ

สวัสดีผู้ได้รับเชิญ คุณได้เข้าร่วมโปรเจกต์ลับ "The Silent Loud"
คุณจะได้รับ "พลังแรก" เพื่อใช้ปลุกความเงียบในโลกใบนี้

คุณจะทำอะไรต่อจากนี้ดี`,
    dimension: "EI", // This question tests Extroversion vs Introversion
    answers: [
      { 
        text: "เดินออกจากห้อง ตามหาผู้รับเชิญคนอื่นและพูดคุยด้วย", 
        dimension: "E" // Extrovert
      },
      { 
        text: "ออกเดินสำรวจเงียบ ๆ ท่ามกลางผู้คน", 
        dimension: "E" // Extrovert
      },
      { 
        text: "นั่งลงข้างในห้อง เปิดสมุดจด ทบทวนสิ่งที่เกิดขึ้น", 
        dimension: "I" // Introvert
      },
      { 
        text: "นั่งอยู่ที่เดิม หยิบหูฟังขึ้นมาใส่ หยุดโลกภายนอกให้เงียบสนิท", 
        dimension: "I" // Introvert
      }
    ]
  },
  {
    title: "การตัดสินในความเงียบ",
    question: `ประตูห้องเปิดออก คุณพบใครคนหนึ่งที่น่ารักและใส่ใจทุกคน
ไม่ว่าเขาพูดอะไร ก็ดูน่าค้นหา น่าฟัง

เริ่มมีคนมาล้อมนั่งฟังมากขึ้น
เขาเริ่มเล่าเรื่องราวบางอย่าง ไม่นานก็เกิดข้อถกเถียงขึ้นในวงสนทนา

คุณรู้สึกอย่างไร`,
    dimension: "TF", // This question tests Thinking vs Feeling
    answers: [
      { 
        text: "ห้ามเขาคนนั้น ฉันไม่ปล่อยผ่านอะไรที่ไม่ถูกต้อง", 
        dimension: "T" // Thinking
      },
      { 
        text: "ฉันพยายามทำความเข้าใจเขา และพยายามไกล่เกลี่ยทั้งสองฝ่ายให้เข้าใจกัน", 
        dimension: "T" // Thinking
      },
      { 
        text: "ยังไม่ทำอะไร แต่สงสัยว่าเขาทำแบบนั้นเพราะอะไร ฉันใส่ใจเจตนาของเขามากกว่าการกระทำ", 
        dimension: "F" // Feeling
      },
      { 
        text: "ฉันจะช่วยเขา ส่งเสียงออกไป เขาอาจต้องการเพื่อนร่วมทางและคนที่เข้าใจ", 
        dimension: "F" // Feeling
      }
    ]
  },
  {
    title: "เสียงจากอนาคตที่ไร้ถ้อยคำ",
    question: `ในชั่วขณะ เสียงตรงหน้าเงียบลง
ตรงหน้าคุณปรากฏแสงบางเบา ล่องลอยอยู่กลางอากาศ
มัน "กระซิบ" บางสิ่งที่คุณรับรู้ได้

เมื่อคุณหลับตา และปล่อยให้ใจฟังสิ่งนั้น
คุณ "เห็น" อะไรในใจของคุณ?`,
    dimension: "SN", // This question tests Sensing vs Intuition
    answers: [
      { 
        text: "ภาพชัดของอนาคต ฉันรู้ว่าฉันต้องทำอะไร และจะไปถึงเมื่อไหร่", 
        dimension: "S" // Sensing
      },
      { 
        text: "ฉันสามารถเห็นภาพจำลองของสิ่งที่จะเกิดขึ้นในอนาคต โดยมันเกิดจากสิ่งที่ฉันทำ", 
        dimension: "N" // Intuition
      },
      { 
        text: "ฉันเห็นสิ่งที่เหมือนสัญญาณบางอย่าง มันเป็นภาพที่ควรเกิดขึ้น", 
        dimension: "S" // Sensing
      },
      { 
        text: "ฉันไม่เห็นอะไรแน่ชัด มันเหมือนแรงบันดาลใจ ฉันรู้สึกว่ามันสำคัญกับอนาคตมาก", 
        dimension: "N" // Intuition
      }
    ]
  },
  {
    title: "เมื่อเสียงเปลี่ยนทิศ",
    question: `คุณลืมตาขึ้นและเดินตามแสงไป 
แสงเริ่มสั่นไหว โลกที่เคยมั่นคงเริ่มเปลี่ยนรูป

แต่คุณ...ต้องเดินหน้าต่อในโลกที่ไม่เหมือนเดิม

คุณจะเลือก`,
    dimension: "JP", // This question tests Judging vs Perceiving
    answers: [
      { 
        text: "หยิบสมุดขึ้นมาเขียนสิ่งที่ต้องทำ ฉันไม่รอให้ความวุ่นวายมาควบคุม ฉันควบคุมมันก่อน", 
        dimension: "J" // Judging
      },
      { 
        text: "วางสิ่งที่ต้องทำไว้หลวม ๆ ในหัว แต่ยังเปิดพื้นที่เผื่อการเปลี่ยนแปลง ฉันชอบรู้ว่าฉันกำลังมุ่งไปทางไหน", 
        dimension: "J" // Judging
      },
      { 
        text: "ฉันรอจังหวะ สังเกตสิ่งรอบตัวแล้วค่อยเลือกเมื่อภาพเริ่มชัด ฉันไม่กลัวการเปลี่ยนแปลง เพราะฉันเชื่อว่ามันจะพาเราไปที่ที่เหมาะสม", 
        dimension: "P" // Perceiving
      },
      { 
        text: "เริ่มต้นเดินหน้าต่อ ฉันเชื่อว่าไอเดียดี ๆ มาจากการได้ลอง และถ้าไม่เวิร์กก็แค่ปรับ โลกมันไม่ตายตัวอยู่แล้ว", 
        dimension: "P" // Perceiving
      }
    ]
  }
];