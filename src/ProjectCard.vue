<template>
  <div class="project-card">
    <h3>{{ project.name }}</h3>
    <div class="tags">
      <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
    <p>{{ project.description }}</p>
    <a :href="linkHref" target="_blank" class="project-link">
      <i :class="linkIconClass"></i> {{ linkLabel }}
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: Object
})

const selectedLinkType = computed(() => {
  if (props.project?.preferredLink === 'live' && props.project?.live) return 'live'
  if (props.project?.preferredLink === 'github' && props.project?.github) return 'github'
  if (props.project?.live) return 'live'
  return 'github'
})

const linkHref = computed(() => {
  if (selectedLinkType.value === 'live') return props.project?.live
  return props.project?.github
})

const linkLabel = computed(() => {
  if (selectedLinkType.value === 'live') return 'View Live App'
  return 'View on GitHub'
})

const linkIconClass = computed(() => {
  if (selectedLinkType.value === 'live') return 'fa-solid fa-arrow-up-right-from-square'
  return 'fa-brands fa-github'
})
</script>

<style scoped>
.project-card {
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: border-color 0.15s;
  width: 100%;
  min-height: 240px;
  box-sizing: border-box;
}

.project-card:hover { border-color: #444; }

h3 {
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  margin: 0;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  font-size: 13px;
  background: #2a2a2a;
  color: #888;
  padding: 4px 9px;
  border-radius: 999px;
  border: 1px solid #333;
}

p {
  font-size: 16px;
  color: #888;
  line-height: 1.6;
  margin: 0;
  flex: 1;
  overflow: hidden;
  line-clamp: 4;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.project-link {
  display: inline-flex;
  align-items: center;
  align-self: flex-start; 
  gap: 6px;
  font-size: 14px;
  color: #666;
  text-decoration: none;
  transition: color 0.15s;
}

.project-link:hover { color: #fff; }
</style>