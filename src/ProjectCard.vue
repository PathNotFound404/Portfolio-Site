<template>
  <div
    ref="cardRef"
    class="project-card"
    :class="{ 'is-hidden': hidden }"
    role="button"
    tabindex="0"
    :aria-label="`${project.name}, open details`"
    @click="select"
    @keydown.enter.self.prevent="select"
    @keydown.space.self.prevent="select"
  >
    <h3>{{ project.name }}</h3>
    <div class="tags">
      <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
    <p>{{ project.description }}</p>
    <div class="card-footer">
      <a :href="linkHref" target="_blank" class="project-link" @click.stop>
        <i :class="linkIconClass"></i> {{ linkLabel }}
      </a>
      <span v-if="project.media?.length" class="media-count">
        <i class="fa-solid fa-images"></i> {{ project.media.length }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useProjectLink } from './useProjectLink.js'

const props = defineProps({
  project: Object,
  hidden: Boolean
})

const emit = defineEmits(['select'])

const cardRef = ref(null)
const { linkHref, linkLabel, linkIconClass } = useProjectLink(() => props.project)

function select() {
  emit('select', props.project, cardRef.value)
}

defineExpose({ el: cardRef })
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
  cursor: pointer;
}

.project-card:hover { border-color: #444; }

.project-card:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 2px;
}

.project-card.is-hidden { visibility: hidden; }

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

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
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

.media-count {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
}
</style>
