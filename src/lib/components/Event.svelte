<script lang='ts'>
  interface Props {
    title: string
    location?: string
    timeLeft: string
    timeFrame: string
    color: 'gray' | 'purple' | 'blue' | 'yellow' | 'green'
    progress?: number
    isCurrent?: boolean
    sizeCoefficient?: number
  }

  const {
    title,
    timeLeft,
    timeFrame,
    sizeCoefficient = 1,
    color,
    progress,
    isCurrent = false,
    location,
  }: Props = $props()

  const bgColor = {
    gray: 'bg-event-bg-gray',
    purple: 'bg-event-bg-purple',
    blue: 'bg-event-bg-blue',
    yellow: 'bg-event-bg-yellow',
    green: 'bg-event-bg-green',
  }[color]

  const isClient = $derived(typeof window !== 'undefined')

  const windowWidth = $derived(isClient ? window.innerWidth : 0)

  const isMobile = $derived(windowWidth < 768)

  const heightStep = $derived(126)

  const height = $derived(isCurrent ? (isMobile ? 140 : 200) : heightStep * sizeCoefficient)
</script>

<div
  class='relative max-w-full w-full flex justify-between overflow-hidden rounded-3 px-6 py-4 md:rounded-6 md:px-10 md:py-6 {bgColor}
  '
  style='height: {height}px'
>
  {#if isCurrent && progress}
    <!-- <div class="absolute h-full top-0 left-0" style="width: {progress}%">
      <div class="h-full bg-[#333]/15 rounded-4"></div>
    </div> -->

    <div class='absolute left-0 h-0.5 w-full bg-accent-yellow' style='top: {progress}%'>
    </div>
  {/if}

  <div class='relative flex flex-col gap-2 md:w-full md:gap-3'>
    <div class='max-w-full flex flex-col justify-between gap-4 md:w-full md:flex-row'>
      <p
        class="break-words text-wrap c-text-black font-semibold font-condensed {isCurrent ? 'text-10/12 md:text-12/14' : 'text-6/7.5 md:text-8/9.5'}
        "
      >
        {title}
      </p>

      {#if location && !isCurrent}
        <p class='min-w-fit text-4/5 c-text-black font-condensed md:text-6/7.5'>
          Location: {location}
        </p>
      {/if}
    </div>
    <p class='font-regular text-4/5 c-text-secondary font-condensed md:text-6/6.5'>{timeFrame}</p>
  </div>

  {#if isCurrent}
    <div class='relative flex flex-col gap-1 md:gap-6'>
      <p
        class='c-text-secondary font-semibold font-condensed md:text-10/11.5'
      >
        Time left: {timeLeft}
      </p>

      {#if location}
        <p class='c-text-secondary font-condensed md:text-6/7.5'>
          Location: {location}
        </p>
      {/if}
    </div>
  {/if}

</div>
