<script lang='ts'>
  interface Props {
    title: string
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
  }: Props = $props()

  const bgColor = {
    gray: 'bg-event-bg-gray',
    purple: 'bg-event-bg-purple',
    blue: 'bg-event-bg-blue',
    yellow: 'bg-event-bg-yellow',
    green: 'bg-event-bg-green',
  }[color]

  const heightStep = 126

  const height = $derived(isCurrent ? 200 : heightStep * sizeCoefficient)
</script>

<div
  class='relative w-full flex justify-between overflow-hidden rounded-6 px-10 py-6 {bgColor}
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

  <div class='relative flex flex-col gap-3'>
    <p
      class="c-text-black font-semibold font-condensed {isCurrent ? 'text-12/14' : 'text-8/9.5'}
      "
    >
      {title}
    </p>
    <p class='font-regular text-6/6.5 c-text-secondary font-condensed'>{timeFrame}</p>
  </div>

  {#if isCurrent}
    <div class='relative flex flex-col'>
      <p
        class='text-8/9.5 c-text-secondary font-semibold font-condensed'
      >
        Time left: {timeLeft}
      </p>
    </div>
  {/if}

</div>
