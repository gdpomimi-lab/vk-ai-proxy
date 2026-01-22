import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.get('/', (req, res) => {
  res.send('vk-ai-proxy is running ✅');
});

app.post('/', (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ ok: false, error: 'Missing prompt' });
  }

  res.json({
    ok: true,
    reply: `服务器真实收到：${prompt}`
  });
});

app.listen(PORT, () => {
  console.log(`vk-ai-proxy running on ${PORT}`);
});