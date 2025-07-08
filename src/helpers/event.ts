export function getEventColor(eventIndex: number) {
  if (eventIndex === 0 || eventIndex % 5 === 0) return 'gray'
  if (eventIndex % 5 === 1) return 'purple'
  if (eventIndex % 5 === 2) return 'blue'
  if (eventIndex % 5 === 3) return 'yellow'
  if (eventIndex % 5 === 4) return 'green'
  return 'gray'
}