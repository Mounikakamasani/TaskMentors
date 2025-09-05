import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import Mentor from './models/Mentor.js';
import Task from './models/Task.js';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/arqonz';

async function run() {
  await mongoose.connect(mongoUri);
  await Mentor.deleteMany({});
  await Task.deleteMany({});

  const mentors = await Mentor.insertMany(
    Array.from({ length: 12 }).map((_, i) => ({
      fullName: `Mentor ${i + 1}`,
      title: i % 2 === 0 ? 'Web Developer' : 'UI/UX Designer',
      followers: Math.floor(Math.random() * 5000),
      rating: Math.round((3 + Math.random() * 2) * 10) / 10,
      reviews: 50 + Math.floor(Math.random() * 500),
      tasksCompleted: 20 + Math.floor(Math.random() * 80),
      bio: 'Passionate mentor helping learners grow.'
    }))
  );

  await Task.insertMany(
    [
      {
        title: 'Creating Awesome Mobile Apps',
        category: 'Time Limit',
        role: 'UI/UX Design',
        progressPercent: 90,
        durationLabel: '1 Hour',
        mentors: [mentors[0]._id, mentors[1]._id]
      },
      {
        title: 'Creating Fresh Website',
        category: 'Time Limit',
        role: 'Web Developer',
        progressPercent: 85,
        durationLabel: '2 Hour',
        mentors: [mentors[2]._id]
      },
      {
        title: 'Creating Color Palettes',
        category: 'Time Limit',
        role: 'UI/UX Design',
        progressPercent: 100,
        durationLabel: '1 Hour',
        mentors: [mentors[3]._id]
      },
      {
        title: 'Creating Mobile App Design',
        category: 'New Task',
        role: 'UI/UX Design',
        progressPercent: 75,
        durationLabel: '3 Days Left',
        mentors: [mentors[4]._id]
      },
      {
        title: 'Creating Perfect Website',
        category: 'New Task',
        role: 'Web Developer',
        progressPercent: 85,
        durationLabel: '4 Days Left',
        mentors: [mentors[5]._id]
      }
    ]
  );

  console.log('Seeded database with mentors and tasks');
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});


