import { Router } from 'express';
import Mentor from '../models/Mentor.js';

const router = Router();

router.get('/', async (req, res) => {
  const { q, sortBy = 'popular', limit = '20', page = '1' } = req.query as Record<string, string>;
  const filter = q ? { $text: { $search: q } } : {};

  const sort: Record<string, 1 | -1> =
    sortBy === 'rating' ? { rating: -1 } : sortBy === 'recent' ? { createdAt: -1 } : { followers: -1 };

  const numericLimit = Math.min(Number(limit) || 20, 100);
  const numericPage = Math.max(Number(page) || 1, 1);

  const [items, total] = await Promise.all([
    Mentor.find(filter).sort(sort).skip((numericPage - 1) * numericLimit).limit(numericLimit),
    Mentor.countDocuments(filter)
  ]);

  res.json({ items, total, page: numericPage, limit: numericLimit });
});

export default router;


