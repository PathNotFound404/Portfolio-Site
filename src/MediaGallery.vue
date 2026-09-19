<template>
  <div class="gallery">
    <div
      class="viewer"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <iframe
        v-if="current.type === 'video'"
        :key="index"
        class="media"
        :src="embedUrl(current)"
        :title="current.title || 'Project video'"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowfullscreen
      ></iframe>
      <img
        v-else
        :key="index"
        class="media"
        :src="current.src"
        :alt="current.alt || ''"
      />

      <template v-if="items.length > 1">
        <button class="arrow arrow-prev" aria-label="Previous" @click="prev">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="arrow arrow-next" aria-label="Next" @click="next">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
        <span class="counter">{{ index + 1 }} / {{ items.length }}</span>
      </template>
    </div>

    <div v-if="items.length > 1" class="thumbs">
      <button
        v-for="(item, i) in items"
        :key="i"
        ref="thumbRefs"
        class="thumb"
        :class="{ active: i === index }"
        :aria-label="thumbLabel(item, i)"
        :aria-current="i === index"
        @click="index = i"
      >
        <img v-if="thumbSrc(item)" :src="thumbSrc(item)" alt="" loading="lazy" />
        <i v-if="item.type === 'video'" class="fa-solid fa-circle-play play-icon"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  items: { type: Array, required: true }
})

const index = ref(0)
const thumbRefs = ref([])
const current = computed(() => props.items[index.value])

function prev() {
  index.value = (index.value - 1 + props.items.length) % props.items.length
}

function next() {
  index.value = (index.value + 1) % props.items.length
}

function embedUrl(item) {
  const id = encodeURIComponent(item.id)
  if (item.provider === 'vimeo') return `https://player.vimeo.com/video/${id}`
  return `https://www.youtube-nocookie.com/embed/${id}`
}

function thumbSrc(item) {
  if (item.type === 'image') return item.src
  if (item.provider === 'youtube') return `https://img.youtube.com/vi/${encodeURIComponent(item.id)}/mqdefault.jpg`
  return null
}

function thumbLabel(item, i) {
  const kind = item.type === 'video' ? 'video' : 'photo'
  return `Show ${kind} ${i + 1}`
}

function onKeydown(e) {
  if (props.items.length < 2) return
  if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}

let touchStartX = 0

function onTouchStart(e) {
  touchStartX = e.changedTouches[0].clientX
}

function onTouchEnd(e) {
  if (props.items.length < 2) return
  const dx = e.changedTouches[0].clientX - touchStartX
  if (Math.abs(dx) < 50) return
  if (dx > 0) prev()
  else next()
}

watch(index, (i) => {
  thumbRefs.value[i]?.scrollIntoView({ block: 'nearest', inline: 'center' })
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 0;
  min-width: 0;
  height: 100%;
}

.viewer {
  position: relative;
  flex: 1;
  min-height: 0;
  background: #000;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.media {
  width: 100%;
  height: 100%;
  border: 0;
  object-fit: contain;
  display: block;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid #444;
  background: rgba(7, 7, 7, 0.7);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
}

.arrow:hover { background: rgba(255, 255, 255, 0.15); }
.arrow-prev { left: 10px; }
.arrow-next { right: 10px; }

.counter {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 13px;
  color: #ccc;
  background: rgba(7, 7, 7, 0.7);
  padding: 3px 9px;
  border-radius: 999px;
  pointer-events: none;
}

.thumbs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  flex-shrink: 0;
  scrollbar-width: none;
}

.thumbs::-webkit-scrollbar { display: none; }

.thumb {
  position: relative;
  flex: 0 0 auto;
  width: 84px;
  height: 56px;
  padding: 0;
  background: #1a1a1a;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.15s, border-color 0.15s;
}

.thumb:hover { opacity: 1; }

.thumb.active {
  opacity: 1;
  border-color: #fff;
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.play-icon {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;
  text-shadow: 0 0 6px rgba(0, 0, 0, 0.8);
}

@media (max-width: 900px) {
  .gallery {
    height: auto;
    flex-shrink: 0;
  }
  .viewer {
    flex: none;
    aspect-ratio: 16 / 9;
  }
}
</style>
