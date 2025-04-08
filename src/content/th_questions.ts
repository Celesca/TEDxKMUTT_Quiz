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
  // Add your 3 other questions here with their respective dimensions (TF, SN, JP)
];