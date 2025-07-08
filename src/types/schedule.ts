export interface ScheduleEvent {
  time: string // e.g., "5:00 pm"
  title: string // e.g., "Registration"
  description?: string
}

export interface DaySchedule {
  day: number // e.g., 1 for Day 1
  events: ScheduleEvent[]
}
