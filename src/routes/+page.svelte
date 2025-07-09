<script lang='ts'>
  import type { ScheduleEvent } from '../types/schedule'
  import { onDestroy } from 'svelte'
  import { campSchedule, daysOfCamp } from '../data/schedule'
  import { getEventColor } from '../helpers/event'
  import Event from '../lib/components/Event.svelte'

  let today = $state(1)

  const todaySchedule = $derived(campSchedule.find(day => day.day === today))

  let now = new Date()
  now.setHours(9, 44, 4, 0)

  interface CurrentEvent {
    event: ScheduleEvent
    eventIndex: number
  }

  let countdown = $state('')
  let progress = $state(0) // 0 - 100
  let currentEvent: CurrentEvent | null = $state(null)
  let nextEvent: ScheduleEvent | null = $state(null)
  let eventsLeft: ScheduleEvent[] = $state([])
  let currentTime = $state('')

  function getCurrentEvent() {
    if (!todaySchedule)
      return null
    let lastEvent: CurrentEvent | null = null
    for (const [index, event] of todaySchedule.events.entries()) {
      const [time, modifier] = event.time.split(' ')
      let [hours, minutes] = time.split(':').map(Number)
      if (modifier.toLowerCase() === 'pm' && hours !== 12)
        hours += 12
      if (modifier.toLowerCase() === 'am' && hours === 12)
        hours = 0
      const eventDate = new Date(now)
      eventDate.setHours(hours, minutes, 0, 0)

      if (eventDate.getHours() < 3 && eventDate.getHours() >= 0) {
        eventDate.setDate(eventDate.getDate() + 1)
      }

      console.log(eventDate, now)

      if (eventDate <= now) {
        lastEvent = { event, eventIndex: index }
      }
      else {
        break
      }
    }
    return lastEvent
  }

  function getNextEvent() {
    const currentEventIndex = currentEvent?.eventIndex ?? -1

    if (currentEventIndex + 1 >= (todaySchedule?.events.length ?? 0)) {
      return null
    }

    const nextEvent = todaySchedule?.events[currentEventIndex + 1]

    const nextEventDate = nextEvent ? new Date(now) : null
    if (nextEventDate && nextEvent) {
      const [time, modifier] = nextEvent.time.split(' ')
      let [hours, minutes] = time.split(':').map(Number)
      if (modifier.toLowerCase() === 'pm' && hours !== 12)
        hours += 12
      if (modifier.toLowerCase() === 'am' && hours === 12)
        hours = 0
      nextEventDate.setHours(hours, minutes, 0, 0)
    }

    return nextEvent ? { event: nextEvent, eventDate: nextEventDate } : null
  }

  function getEventsLeft() {
    const currentEventIndex = currentEvent?.eventIndex ?? -1

    const left = todaySchedule?.events.slice(currentEventIndex + 1) ?? []
    return left
  }

  function updateCountdown() {
    currentEvent = getCurrentEvent()

    const nextEventResult = getNextEvent()
    nextEvent = nextEventResult ? nextEventResult.event : null

    if (nextEventResult && nextEventResult.eventDate) {
      let nextEventDate = nextEventResult.eventDate

      if (nextEventDate.getHours() < 3 && nextEventDate.getHours() >= 0) {
        nextEventDate.setDate(nextEventDate.getDate() + 1)
      }

      const diff = nextEventDate.getTime() - now.getTime()
      if (diff > 0) {
        const totalSeconds = Math.floor(diff / 1000)
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = totalSeconds % 60
        countdown = `${hours > 0 ? `${hours}h ` : ''}${minutes}m ${seconds}s`
      }
      else {
        countdown = 'Now!'
      }
    }
    else {
      countdown = 'No more events today.'
    }
  }

  function updateProgress() {
    if (!todaySchedule || !todaySchedule.events.length || !currentEvent) {
      progress = 0
      return
    }

    const event = currentEvent.event
    const eventIndex = currentEvent.eventIndex

    // Get start time of current event
    const [startTime, startModifier] = event.time.split(' ')
    let [startHours, startMinutes] = startTime.split(':').map(Number)
    if (startModifier.toLowerCase() === 'pm' && startHours !== 12)
      startHours += 12
    if (startModifier.toLowerCase() === 'am' && startHours === 12)
      startHours = 0
    const eventStart = new Date(now)
    eventStart.setHours(startHours, startMinutes, 0, 0)

    // Get start time of next event (or end of day if none)
    let eventEnd: Date
    if (eventIndex + 1 < todaySchedule.events.length) {
      const next = todaySchedule.events[eventIndex + 1]
      const [endTime, endModifier] = next.time.split(' ')
      let [endHours, endMinutes] = endTime.split(':').map(Number)
      if (endModifier.toLowerCase() === 'pm' && endHours !== 12)
        endHours += 12
      if (endModifier.toLowerCase() === 'am' && endHours === 12)
        endHours = 0
      eventEnd = new Date(now)
      eventEnd.setHours(endHours, endMinutes, 0, 0)
      if (eventEnd.getHours() < 3 && eventEnd.getHours() >= 0) {
        eventEnd.setDate(eventEnd.getDate() + 1)
      }
    }
    else {
      // If no next event, use end of day (23:59)
      eventEnd = new Date(now)
      eventEnd.setHours(23, 59, 59, 999)
    }

    const total = eventEnd.getTime() - eventStart.getTime()
    const elapsed = now.getTime() - eventStart.getTime()

    if (elapsed <= 0) {
      progress = 0
    }
    else if (elapsed >= total) {
      progress = 100
    }
    else {
      progress = Math.round((elapsed / total) * 100)
    }
  }

  function updateCurrentTime() {
    let hours: number | string = now.getHours() % 12

    if (hours === 0)
      hours = 12

    if (hours < 10)
      hours = `0${hours}`

    let minutes: number | string = now.getMinutes()
    if (minutes < 10)
      minutes = `0${minutes}`

    let seconds: number | string = now.getSeconds()
    if (seconds < 10)
      seconds = `0${seconds}`

    currentTime = `${hours}:${minutes}:${seconds}`
  }

  updateCountdown()
  updateCurrentTime()
  updateProgress()
  currentEvent = getCurrentEvent()
  eventsLeft = getEventsLeft()
  const interval = setInterval(() => {
    // Advance the mock time by 1 second
    now = new Date(now.getTime() + 1000)
    updateCountdown()
    updateCurrentTime()
    currentEvent = getCurrentEvent()
    eventsLeft = getEventsLeft()
    updateProgress()
  }, 1000)

  onDestroy(() => {
    clearInterval(interval)
  })

  function isToday(index: number) {
    return index + 1 === today
  }
</script>

<section class='mx-auto h-480 w-240 flex flex-col rotate-90 gap-5 overflow-hidden py-8 font-sans'>
  <div class='w-full flex gap-5'>
    {#each daysOfCamp.slice(1) as day, idx}
      <button
        class="flex flex-1 items-center justify-center gap-6 rounded-6 px-3.5 py-3 py-5.5 text-10.5/15 font-black font-condensed {isToday(idx) ? 'bg-accent-yellow pl-8.5 c-accent-blue' : 'bg-gray-inactive c-gray-dayweek'}
        "
        onclick={() => {
          today = idx + 1
        }}
      >
        {isToday(idx) ? day.full : day.short}

        {#if isToday(idx)}
          <div class='rounded-4 bg-white px-6 py-2.5'>
            {currentTime}
          </div>
        {/if}
      </button>
    {/each}
  </div>

  {#if todaySchedule}
    {#if currentEvent}
      <Event
        title={currentEvent.event.title}
        timeLeft={countdown}
        timeFrame={`${currentEvent.event.time} ${nextEvent ? `- ${nextEvent.time}` : ''}`}
        color={getEventColor(currentEvent.eventIndex)}
        isCurrent
        location={currentEvent.event.location}
        progress={progress}
      />
    {/if}
  {:else}
    <p>No schedule for today.</p>
  {/if}

  <div class='h-max flex flex-col gap-5'>
    {#each eventsLeft as event, index}
      <div class='flex'>
        <span class='w-35 text-7/8 c-text-secondary font-medium font-condensed'>
          {event.time}
        </span>
        <Event
          title={event.title}
          location={event.location}
          timeLeft={countdown}
          timeFrame={index + 1 === eventsLeft.length ? `${event.time}` : `${event.time} - ${(eventsLeft[index + 1])?.time}`}
          color={getEventColor(index + (currentEvent?.eventIndex ? currentEvent.eventIndex + 1 : 0))}
        />
      </div>
    {/each}
  </div>
</section>
