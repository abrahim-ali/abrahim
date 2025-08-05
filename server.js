
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

// تحميل المتغيرات من .env
dotenv.config();

const app = express();

// تفعيل CORS للسماح لـ React بالاتصال
app.use(
  cors({
    origin: 'http://localhost:5173', // ← React يعمل هنا
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  })
);

// تفعيل قراءة JSON من الطلبات
app.use(express.json());

// تهيئة Resend
const resend = new Resend('re_Vycp9HWJ_3wWNpLBPmL3Q8i8N5ZNEAC22');

// المسار لإرسال البريد
app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev', // يمكنك تغييره لاحقًا
      to: 'abrahim71192@gmail.com',     // بريدك لتستلم الرسالة
      reply_to: email,
      subject: `[موقعك] ${subject || 'رسالة جديدة'}`,
      html: `
        <h2>رسالة جديدة من ${name}</h2>
        <p><strong>البريد:</strong> ${email}</p>
        <p><strong>الرسالة:</strong></p>
        <p>${message}</p>
        <hr>
        <small>تم الإرسال عبر خدمة البريد الخاصة بك</small>
      `,
    });

    res.json({
      success: true,
      message: 'تم الإرسال بنجاح!',
      data,
    });
  } catch (error) {
    console.error('خطأ في إرسال البريد:', error);
    res.status(500).json({
      success: false,
      message: 'فشل في الإرسال',
      error: error.message,
    });
  }
});

// اختبار السيرفر
app.get('/', (req, res) => {
  res.send('<h1>السيرفر يعمل ✅</h1>');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ السيرفر يعمل على http://localhost:${PORT}`);
});
