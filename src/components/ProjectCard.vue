<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { _ } from '../class/locale.class'
import IconVector from './IconVector.vue';
import { getCurrentCulture } from '../class/locale.class';
import type { Project } from '../class/project.interface';

defineProps<{
  project: Project
}>()

const locale = getCurrentCulture();

</script>

<template>
  <section class="project-card" :data-year="project.year" :data-locale="locale">
    <div class="project-card-cover">
      <img :src="project.cover" alt="Project cover" loading="lazy" />
    </div>
    <div class="project-card-data">
      <div class="project-card-info">
        <div class="project-card-icon">
          <img :src="project.icon" alt="Project icon" loading="lazy" />
        </div>
        <div class="project-card-title">
          <RouterLink :to="{ name: 'page', params: { id: project.title } }">
            <h3>{{ project.title }}</h3>
          </RouterLink>
          <ul class="project-card-tags">
            <li v-for="name in project.tags.split(',')" :key="name">{{ name.trim() }}</li>
          </ul>
        </div>
      </div>
      <div class="project-card-content">
        <ul class="project-card-properties">
          <li>
            <icon-vector icon="package" />
            <span>{{ project.type }}</span>
          </li>
          <li>
            <icon-vector icon="computer" />
            <span>{{ project.platform }}</span>
          </li>
          <li>
            <icon-vector icon="date" />
            <span>{{ project.year }}</span>
          </li>
          <li>
            <icon-vector icon="software" />
            <span>{{ project.creator }}</span>
          </li>
          <li class="full">
            <icon-vector icon="code" />
            <ul class="project-card-techs">
              <li v-for="name in project.techs.split(',')" :key="name">{{ name.trim() }}</li>
            </ul>
          </li>
        </ul>
        <div class="project-card-description">
          <p>{{ project.description }}</p>
        </div>
        <div class="project-card-action">
          <RouterLink class="icon-button" :to="{ name: 'page', params: { id: project.title } }">
            <icon-vector icon="book" />
            <span>{{ _("BUTTON_DETAIL") }}</span>
          </RouterLink>
          <a class="icon-button" :href="project.demo" target="_blank" v-if="!!project.demo">
            <icon-vector icon="link" />
            <span>{{ _("BUTTON_DEMO") }}</span>
          </a>
          <a class="icon-button" :href="project.source" target="_blank" v-if="!!project.source">
            <icon-vector icon="page" />
            <span>{{ _("BUTTON_SOURCE") }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.project-card {
  display: flex;
  flex-direction: row;
  border-radius: 1rem;
  overflow: hidden;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
}

.project-card-cover {
  flex: 1;
  min-height: 20rem;
  overflow: hidden;
  border-right: 1px solid var(--color-border);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.project-card-data {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.project-card-info {
  padding: 2rem;
  display: flex;
  border-bottom: 1px solid var(--color-border);

  >.project-card-icon {
    margin-right: 1rem;
    padding: 0.75rem;
    width: 4.8rem;
    height: 4.8rem;
    background-color: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: 25.5%;
    box-shadow: 0 0.2rem 0.5rem var(--color-shadow);

    >img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  >.project-card-title {
    display: flex;
    flex: 1;
    flex-direction: column;

    >a {
      display: block;
      flex: 1;

      >h3 {
        font-size: 1.5rem;
        font-weight: bold;
        transition: color 0.25s;
        color: var(--color-link-dark);
      }

      &:hover {
        >h3 {
          color: var(--color-link);
        }
      }
    }

    >.project-card-tags {
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem 1rem;
      flex-wrap: wrap;

      >li {
        font-size: 0.9rem;
        padding: 0.2rem 1rem;
        border-radius: 1rem;
        background-color: var(--color-background-label);
        color: var(--color-text-alt);
      }
    }
  }
}

.project-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;

  >.project-card-properties {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    color: var(--color-text-alt);

    >li {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      overflow: hidden;

      &.full {
        grid-column: 1 / 5;
      }

      >svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      >span {
        flex: 1;
        text-wrap: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      >ul {
        display: flex;
        align-items: center;
        gap: 1rem;

        >li {

          &::before {
            content: '•';
            margin-left: -0.5rem;
            margin-right: 0.5rem;
          }

          &:first-child {

            &::before {
              content: '';
              margin: 0;
            }
          }
        }

      }
    }
  }

  >.project-card-description {
    flex: 1;
    margin-top: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 1rem;

    p {
      margin: 0;
      line-height: 1.75;
      text-align: justify;
    }
  }

  >.project-card-action {
    display: flex;
    gap: 1rem;

    >a {
      font-size: 0.9rem;
      font-weight: bold;
    }

  }
}

.icon-button {
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  color: var(--color-text-white);
  background-color: var(--color-link);
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  >svg {
    width: 1.2rem;
    height: 1.2rem;
  }

  &:hover {
    color: var(--color-text-white-light);
    background-color: var(--color-link-hover);
  }
}

.project-card[data-locale="en"] {
  .project-card-info {
    >.project-card-title {
      >a {
        >h3 {
          font-size: 1.2rem;
          line-height: 1.25;
        }
      }

      >.project-card-tags {
        >li {
          font-size: 0.8rem;
          letter-spacing: -2%;
          padding: 0.1rem 0.5rem;
          text-wrap: nowrap;
        }
      }
    }

  }

  .project-card-content {

    >.project-card-description {
      >p {
        line-height: 1.5;
      }
    }
  }
}

@media (prefers-color-scheme: dark) {
  .project-card-cover {
    background-color: var(--color-black);

    img {
      opacity: 0.8;
    }
  }

  .project-card-info {

    >.project-card-icon {
      background-color: var(--color-text-white);
    }
  }
}

@media (max-width: 960px) {
  .project-card {
    flex-direction: column;
  }

  .project-card-cover {
    flex: auto;
    height: 20rem;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }
}

@media (max-width: 480px) {

  .project-card-info,
  .project-card-content {
    padding: 1rem;
  }

  .project-card-content {
    >.project-card-description {
      margin-top: 0rem;
      margin-bottom: 1rem;
    }
  }
}
</style>
