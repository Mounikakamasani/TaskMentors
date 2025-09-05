export const mockMentors = [
  { _id: 'm1', fullName: 'Jessica Jane', title: 'Web Developer', followers: 4021, rating: 4.7, reviews: 250, tasksCompleted: 40, bio: 'I am Jessica Jane, a developer and mentor.' },
  { _id: 'm2', fullName: 'Abraham Lincoln', title: '3D Design', followers: 3281, rating: 4.5, reviews: 150, tasksCompleted: 32, bio: '3D designer with 5+ years of experience.' },
  { _id: 'm3', fullName: 'Curious George', title: 'UI/UX Design', followers: 4057, rating: 4.7, reviews: 250, tasksCompleted: 40, bio: 'I love simple usable interfaces.' },
  { _id: 'm4', fullName: 'Alex Stanton', title: 'UI/UX Designer', followers: 4012, rating: 4.8, reviews: 190, tasksCompleted: 60, bio: 'Helping brands craft delightful products.' },
  { _id: 'm5', fullName: 'Antoine Griezmann', title: 'Android Developer', followers: 5030, rating: 4.8, reviews: 300, tasksCompleted: 50, bio: 'Android developer and mentor at DNX.' },
  { _id: 'm6', fullName: 'Anna White', title: '3D Design', followers: 4012, rating: 4.8, reviews: 170, tasksCompleted: 60, bio: 'Professional 3D designer at Blender company.' }
];

export const mockTasks = [
  { _id: 't1', title: 'Creating Awesome Mobile Apps', category: 'Time Limit', role: 'UI/UX Design', progressPercent: 90, durationLabel: '1 Hour', mentors: [mockMentors[0], mockMentors[1]] },
  { _id: 't2', title: 'Creating Fresh Website', category: 'Time Limit', role: 'Web Developer', progressPercent: 85, durationLabel: '2 Hour', mentors: [mockMentors[2]] },
  { _id: 't3', title: 'Creating Color Palettes', category: 'Time Limit', role: 'UI/UX Design', progressPercent: 100, durationLabel: '1 Hour', mentors: [mockMentors[3]] },
  { _id: 't4', title: 'Creating Mobile App Design', category: 'New Task', role: 'UI/UX Design', progressPercent: 75, durationLabel: '3 Days Left', mentors: [mockMentors[4], mockMentors[5]] },
  { _id: 't5', title: 'Creating Perfect Website', category: 'New Task', role: 'Web Developer', progressPercent: 85, durationLabel: '4 Days Left', mentors: [mockMentors[0]] },
  { _id: 't6', title: 'Mobile App Design', category: 'New Task', role: 'Android Developer', progressPercent: 65, durationLabel: '3 Days Left', mentors: [mockMentors[2], mockMentors[3]] }
];


