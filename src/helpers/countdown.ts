import type { ScheduleEvent } from '../types/schedule'
import { campSchedule } from '../data/schedule'

export function getNextEvent(): { event: ScheduleEvent, date: Date } | null {
  const now = new Date()
  for (const day of campSchedule) {
    const campStartDate = new Date('2024-07-01T00:00:00-07:00') // PST
    const dayDate = new Date(campStartDate)
    dayDate.setDate(campStartDate.getDate() + (day.day - 1))
    for (const event of day.events) {
      const [time, modifier] = event.time.split(' ')
      let [hours, minutes] = time.split(':').map(Number)
      if (modifier.toLowerCase() === 'pm' && hours !== 12)
        hours += 12
      if (modifier.toLowerCase() === 'am' && hours === 12)
        hours = 0
      const eventDate = new Date(dayDate)
      eventDate.setHours(hours, minutes, 0, 0)
      if (eventDate > now) {
        return { event, date: eventDate }
      }
    }
  }
  return null
}
