<script setup lang="ts">
import { ref, watch } from 'vue'
import { marked } from 'marked';
import IconVector from './IconVector.vue';
import type { Project } from '../class/project.interface';

const props = defineProps<{
  project: Project
}>()

const html = ref("");

watch(() => props.project, async (project) => {
  if (project.content_link) {
    const res = await fetch(project.content_link);
    if (!res.ok) {
      return;
    }
    const content = await res.text();
    html.value = await marked(content);
  } else if (project.content) {
    html.value = await marked(project.content);
  }
}, { immediate: true });
</script>

<template>
  <div class="project-page">
    <header class="project-page-header">
      <div class="project-page-cover">
        <img :src="project.cover" alt="Project cover" />
      </div>
      <div class="project-page-meta">
        <div class="project-card-icon">
          <img :src="project.icon" alt="Project icon" />
        </div>
        <div class="project-page-title">
          <h1>{{ project.title }}</h1>
        </div>
      </div>
      <div class="project-page-control">
        <router-link to="/">
          <icon-vector icon="close" />
        </router-link>
      </div>
    </header>
    <article class="project-page-body">
      <div class="project-page-content" v-html="html"></div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.project-page {
  margin: 2rem;
  background-color: var(--color-background);
  border-radius: 1rem;
  overflow: hidden;

  .project-page-header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: end;
    height: 24rem;
    background-color: black;
    background-image: linear-gradient(135deg, #222, #000);
    border-bottom: 1px solid var(--color-border);

    .project-page-cover {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.75;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.5);
      }
    }

    .project-page-meta {
      position: relative;
      margin: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;

      .project-card-icon {
        margin-right: 1rem;
        padding: 0.75rem;
        width: 4.8rem;
        height: 4.8rem;
        background-color: white;
        border: 1px solid var(--color-border);
        border-radius: 25.5%;
        box-shadow: 0 0.2rem 0.5rem var(--color-shadow);

        >img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .project-page-title {
        flex: 1;

        h1 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: bold;
          color: var(--color-text-white);
        }
      }
    }

    .project-page-control {
      position: absolute;
      right: 0;
      top: 0;
      margin: 1rem;

      >a {
        display: block;
        padding: .25rem;
        border-radius: 0.5rem;
        color: var(--color-text-white);
        background-color: var(--color-overlay-white-light);

        >svg {
          display: block;
        }

        &:hover {
          color: var(--color-text-white-light);
          background-color: var(--color-close);
        }
      }
    }
  }

  .project-page-content {
    padding: 1rem 2rem 2rem 2rem;
    min-height: 20rem;

    :deep(h1) {
      font-size: 1.5rem;
      font-weight: bold;
      margin-block-start: 1.5rem;
    }

    :deep(h2) {
      font-size: 1.25rem;
      font-weight: bold;
      margin-block-start: 1.25rem;
    }

    :deep(h3) {
      font-size: 1.1rem;
      font-weight: bold;
      margin-block-start: 1rem;
    }

    :deep(h4) {
      font-size: 1rem;
      font-weight: bold;
      margin-block-start: 1rem;
    }

    :deep(p) {
      margin-block-start: 1rem;
      line-height: 1.75;
      text-align: justify
    }

    :deep(li) {
      margin: 0.5rem 0 0.5rem 1rem;
      list-style: disc;
      line-height: 1.75;
      text-align: justify
    }
  }

}

@media (max-width: 480px) {

  .project-page {
    margin: 1rem;

    .project-page-content {
      padding: 0.5rem 1rem 1rem 1rem;
    }
  }

}
</style>
