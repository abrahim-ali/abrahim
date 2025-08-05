import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors());
app.use(express.json());

// إعداد ناقل البريد
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abrahim71192@gmail.com',
    pass: 'dszllhgppxhtqkpg'
  }
});

app.post('/send-email', async (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'abrahim71192@gmail.com',
    replyTo: email,
    subject: `رسالة من ${name}`,
    text: message,
    html: `<p><strong>من:</strong> ${name} (${email})</p><p>${message}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'تم الإرسال بنجاح' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'فشل إرسال البريد' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
