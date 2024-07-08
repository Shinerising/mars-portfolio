<script setup lang="ts">
const props = defineProps<{
  years: number[],
  currentYear: number,
}>()

const emit = defineEmits<{
  click: [year: number]
}>();
</script>

<template>
  <div class="timeline-wrapper">
    <ul class="timeline">
      <li v-for="year in props.years" :key="year" :class="{ 'current': year === props.currentYear }"
        @click="emit('click', year)">
        <span>{{ year }}</span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.timeline-wrapper {
  height: 100%;

  .timeline {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0;
    margin: 0;
    list-style: none;

    &::before {
      content: '';
      position: absolute;
      top: 0.4rem;
      right: 0.4rem;
      width: 0.2rem;
      opacity: 0.5;
      height: calc(100% - 0.8rem);
      border-radius: 0.1rem;
      background-color: var(--color-border);
      pointer-events: none;
    }

    li {
      position: relative;
      display: flex;
      align-items: center;
      color: var(--color-border);
      font-size: 0.8rem;
      font-weight: bold;
      gap: 0.5rem;
      cursor: pointer;
      transform-origin: calc(100% - 0.6rem) center;
      transition: color 0.25s, transform 0.25s;

      span {
        display: block;
      }

      &::after {
        content: '';
        display: block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: currentColor;
      }

      &:hover {
        transform: scale(1.2);
        color: var(--color-border-hover);
      }

      &.current {
        transform: scale(1.2);
        color: var(--color-text);
      }

    }
  }
}
</style>
