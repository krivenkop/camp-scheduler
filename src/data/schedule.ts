import type { DaySchedule } from '../types/schedule'

export const campSchedule: DaySchedule[] = [
  {
    day: 1,
    events: [
      { time: '5:00 pm', title: 'Registration' },
      { time: '8:00 pm', title: 'Rules and intro' },
      { time: '10:00 pm', title: 'Free-time' },
      { time: '12:00 am', title: 'Lights out' },
    ],
  },
  {
    day: 2,
    events: [
      { time: '8:30 am', title: 'Warms up', location: 'Main Field' },
      { time: '9:00 am', title: 'Breakfast', location: 'Cafeteria' },
      { time: '10:00 am', title: 'Worship', location: 'Main Building' },
      { time: '10:30 am', title: 'Devotional' },
      { time: '11:10 am', title: 'Work-time' },
      { time: '1:10 pm', title: 'Lunch' },
      { time: '2:30 pm', title: 'Big Game - Tournament' },
      { time: '6:00 pm', title: 'Lunch' },
      { time: '7:30 pm', title: 'Worship/Service/Announcements' },
      { time: '10:00 pm', title: 'Free time' },
      { time: '12:00 am', title: 'Lights out' },
    ],
  },
  {
    day: 3,
    events: [
      { time: '8:30 am', title: 'Warm-up' },
      { time: '9:00 am', title: 'Breakfast' },
      { time: '10:00 am', title: 'Worship' },
      { time: '10:30 am', title: 'Devotional' },
      { time: '11:10 am', title: 'Free-time' },
      { time: '1:00 pm', title: 'Lunch' },
      { time: '2:00 pm', title: 'Adventure Game' },
      { time: '6:00 pm', title: 'Dinner' },
      { time: '7:30 pm', title: 'Worship/Service/Announcements' },
      { time: '9:00 pm', title: 'Free-time' },
      { time: '10:00 pm', title: 'Movie/Bonfire' },
      { time: '1:00 am', title: 'Lights-out' },
    ],
  },
  {
    day: 4,
    events: [
      { time: '8:30 am', title: 'Warm-up' },
      { time: '9:00 am', title: 'Breakfast' },
      { time: '10:00 am', title: 'Worship' },
      { time: '10:30 am', title: 'Devotional' },
      { time: '11:10 am', title: 'Go to Lake' },
      { time: '1:00 pm', title: 'Lunch @ the Lake' },
      { time: '2:30 pm', title: 'Water Games on the Lake' },
      { time: '6:00 pm', title: 'Dinner' },
      { time: '7:30 pm', title: 'Worship/Service/Announcements' },
      { time: '9:00 pm', title: 'Free-time/Bonfire' },
      { time: '12:00 am', title: 'Night Game' },
    ],
  },
  {
    day: 5,
    events: [
      { time: '10:00 am', title: 'Breakfast' },
      { time: '11:00 am', title: 'Worship/Award Ceremony' },
      { time: '12:00 pm', title: 'Cleanup Time' },
      { time: '1:00 pm', title: 'Lunch' },
    ],
  },
]

export const daysOfCamp = [
  { full: 'Monday', short: 'Mon' },
  { full: 'Tuesday', short: 'Tue' },
  { full: 'Wednesday', short: 'Wed' },
  { full: 'Thursday', short: 'Thu' },
  { full: 'Friday', short: 'Fri' },
  { full: 'Saturday', short: 'Sat' },
]
