<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { _, getCurrentCulture } from '../class/locale.class'
import ProjectCard from '../components/ProjectCard.vue'
import ProjectPage from '../components/ProjectPage.vue'
import IconVector from '../components/IconVector.vue'
import TimeLine from '../components/TimeLine.vue'
import type { Project, PortfolioData } from '../class/project.interface'

const portfolioData = ref<PortfolioData>({
  title: '',
  title_page: '...',
  avatar: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  cover: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
  name: '...',
  bio: '...',
  socials: [],
  projects: []
});

const currentProject = ref<Project | null>(null)

const years = ref([2024, 2023, 2022, 2021])
const currentYear = ref(2022)
const isTimeLineVisible = ref(false)

const route = useRoute()
const router = useRouter()

const updateView = (id: string | string[]) => {
  if (id) {
    currentProject.value = portfolioData.value.projects.find(project => project.title === id) || null
  } else {
    currentProject.value = null;
  }
  if (currentProject.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const scrollHandler = () => {
  const main = document.getElementById('main')
  if (main) {
    const offset = window.innerHeight - main.getBoundingClientRect().top
    isTimeLineVisible.value = offset > 400
  }
  const list = [...document.querySelectorAll('.project-card')]
  const current = list.find(item => item.getBoundingClientRect().top >= 0)
  if (current) {
    currentYear.value = Number(current.getAttribute('data-year'))
  }
}

const yearClicked = (year: number) => {
  const list = [...document.querySelectorAll('.project-card')]
  const target = list.find(item => Number(item.getAttribute('data-year')) === year)
  if (target) {
    target.parentElement?.scrollIntoView({ behavior: 'smooth' })
  }
}

const pageOutsideClicked = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    router.push('/')
  }
}

onMounted(async () => {
  const locale = getCurrentCulture()
  portfolioData.value = await fetch(`/api/data?lang=${locale}`).then(res => res.json()) as PortfolioData
  document.title = portfolioData.value.title
  years.value = portfolioData.value.projects.map(project => project.year).filter((year, index, self) => self.indexOf(year) === index).sort((a, b) => b - a)
  updateView(route.params.id)

  window.addEventListener('scroll', scrollHandler)
  window.addEventListener('resize', scrollHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', scrollHandler)
  window.removeEventListener('resize', scrollHandler)
})

watch(() => route.params.id, updateView, { immediate: true })

</script>

<template>
  <header>
    <div class="header-cover">
      <img :src="portfolioData.cover" alt="Cover" />
    </div>
    <div class="container">
      <div class="nav-wrapper">
        <nav class="link">
          <router-link to="/">
            <icon-vector icon="home" />
            <span>{{ _("NAV_HOME") }}</span>
          </router-link>
          <router-link to="/editor" hidden>
            <icon-vector icon="editor" />
            <span>{{ _("NAV_EDITOR") }}</span>
          </router-link>
        </nav>
        <div class="title">
          <h1>{{ portfolioData.title_page }}</h1>
        </div>
        <nav class="lang">
          <a href="/?lang=zh" v-if="getCurrentCulture() === 'en'">
            <icon-vector icon="language" />
            <span>{{ _("NAV_ZH") }}</span>
          </a>
          <a href="/?lang=en" v-if="getCurrentCulture() === 'zh'">
            <icon-vector icon="language" />
            <span>{{ _("NAV_EN") }}</span>
          </a>
        </nav>
      </div>
      <div class="intro">
        <div class="avatar">
          <img :src="portfolioData.avatar" alt="Avatar" />
        </div>
        <div class="name">
          <h2>{{ portfolioData.name }}</h2>
        </div>
        <div class="bio">
          <p>{{ portfolioData.bio }}</p>
        </div>
      </div>
      <div class="social">
        <ul class="social-links">
          <li v-for="link in portfolioData.socials" :key="link.name">
            <a :href="link.url" target="_blank" rel="noreferrer noopener">
              <icon-vector :icon="link.icon" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </header>

  <main id="main">
    <div class="container">
      <ul class="project-items">
        <li v-for="project in portfolioData.projects" :key="project.title">
          <ProjectCard :project="project" />
        </li>
      </ul>
    </div>
  </main>

  <Transition name="timeline">
    <div v-if="!currentProject && isTimeLineVisible" class="timeline-panel">
      <TimeLine :years="years" :currentYear="currentYear" @click="yearClicked" />
    </div>
  </Transition>

  <Transition name="page">
    <aside v-if="currentProject">
      <div class="page-wrapper" @click="pageOutsideClicked">
        <div class="container">
          <ProjectPage :project="currentProject" />
        </div>
      </div>
    </aside>
  </Transition>

  <footer>
    <div class="container">
      <div class="author">
        <p>{{ _("LABEL_CREATE") }}</p>
      </div>
      <div class="powered">
        <p>{{ _("LABEL_POWERED") }}</p>
      </div>
      <div class="copy">
        <p>&copy; <span>{{ new Date().getFullYear() }}</span> <span>{{ _("LABEL_COPYRIGHT") }}</span></p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
header {
  position: relative;
  padding: 1rem 0;
  background-color: var(--color-black);
  background-image: linear-gradient(135deg, var(--color-black-light), var(--color-black));

  >.header-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.45;

    >img {
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .nav-wrapper {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;

    >.title {
      flex: 1;
      text-align: center;
      margin: 0.5rem 0;

      h1 {
        font-size: 1.6rem;
        font-weight: bold;
        color: var(--color-text-white-dark);
      }
    }

    >nav {
      flex: 1;
      display: flex;
      gap: 1rem;
      justify-content: flex-start;

      &.lang {
        justify-content: flex-end;
      }

      >a {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-text-white-dark);
        font-weight: bold;
        font-size: 0.9rem;

        &:hover {
          color: var(--color-text-white);
        }
      }
    }
  }

  .intro {
    position: relative;
    margin: 6rem auto;

    >.avatar {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
      overflow: hidden;
      margin: 2rem auto;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    >.name {
      text-align: center;
      margin: 0.5rem 0;

      >h2 {
        font-size: 2rem;
        font-weight: bold;
        color: var(--color-text-white);
      }
    }

    >.bio {
      font-size: 1.2rem;
      font-weight: bold;
      text-align: center;
      margin: 0.5rem 0;
      color: var(--color-text-white-alt);
    }
  }

  .social {
    position: relative;
    margin: 4rem auto;

    >.social-links {
      display: flex;
      justify-content: center;
      gap: 1rem;

      li {
        a {
          display: block;
          line-height: 1;
          padding: 0.5rem;
          border-radius: 50%;
          color: var(--color-overlay-black-light);
          background-color: var(--color-overlay-white-light);
          transition: background-color 0.3s;

          svg {
            display: block;
            width: 1.6rem;
            height: 1.6rem;
          }

          &:hover {
            color: var(--color-overlay-black);
            background-color: var(--color-overlay-white);
          }
        }
      }
    }
  }
}

main {

  .project-items {
    >li {
      padding-top: 2rem;
    }
  }
}

.timeline-panel {
  position: fixed;
  bottom: 3.2rem;
  right: calc((50vw - 36rem) / 2 - 5rem);
  height: 20rem;
  z-index: 1000;
}

aside {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  overflow: auto;
  display: flex;
  flex-direction: column;
  background-color: #000000D0;

  .page-wrapper {
    flex: 1;
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    .container {
      width: 100%;
    }
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.timeline-enter-active,
.timeline-leave-active {
  transition: opacity 0.25s ease;
}

.timeline-enter-from,
.timeline-leave-to {
  opacity: 0;
}

footer {
  margin: 2rem 0;
  padding: 1rem 0;
  text-align: center;
  font-size: 0.9rem;
  line-height: 1.8;
  color: var(--color-text-alt);
}

.container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 1560px) {
  .timeline-panel {
    display: none;
  }
}

@media (prefers-color-scheme: dark) {
  header {

    >.header-cover {
      opacity: 0.35;
    }
  }
}
</style>