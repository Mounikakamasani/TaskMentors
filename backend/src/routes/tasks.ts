import { Router } from 'express';
import Task from '../models/Task.js';

const router = Router();

router.get('/', async (req, res) => {
  const { q, sortBy = 'deadline', limit = '20', page = '1', category } = req.query as Record<string, string>;

  const filter: any = {};
  if (q) filter.$text = { $search: q };
  if (category) filter.category = category;

  const sort: Record<string, 1 | -1> =
    sortBy === 'progress' ? { progressPercent: -1 } : sortBy === 'recent' ? { createdAt: -1 } : { updatedAt: -1 };

  const numericLimit = Math.min(Number(limit) || 20, 100);
  const numericPage = Math.max(Number(page) || 1, 1);

  const [items, total] = await Promise.all([
    Task.find(filter).populate('mentors').sort(sort).skip((numericPage - 1) * numericLimit).limit(numericLimit),
    Task.countDocuments(filter)
  ]);

  res.json({ items, total, page: numericPage, limit: numericLimit });
});

export default router;


