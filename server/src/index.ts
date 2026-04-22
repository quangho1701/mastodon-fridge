import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes will be added in future milestones:
//   /auth/verify      (Milestone 1)
//   /api/extract      (Milestone 2)
//   /api/fridge-items  (Milestone 3+)
//   /api/events        (Milestone 5)
//   /api/gallery       (Milestone 6)

app.listen(PORT, () => {
  console.log(`Mastodon Fridge server running on port ${PORT}`);
});

export default app;
