<template>
  <Teleport to="body">
    <div class="modal-root">
      <div ref="backdropRef" class="backdrop" @click="close"></div>

      <div
        ref="dialogRef"
        class="dialog"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
        tabindex="-1"
        :style="rectStyle"
      >
        <div ref="innerRef" class="inner">
          <button class="close-btn" aria-label="Close" @click="close">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="content" :class="{ 'has-media': hasMedia }">
            <MediaGallery v-if="hasMedia" :items="project.media" />

            <section class="details">
              <h2 :id="titleId">{{ project.name }}</h2>
              <div class="tags">
                <span v-for="tag in project.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
              <p>{{ project.description }}</p>
              <a :href="linkHref" target="_blank" rel="noopener noreferrer" class="project-link">
                <i :class="linkIconClass"></i> {{ linkLabel }}
              </a>
            </section>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import MediaGallery from './MediaGallery.vue'
import { useProjectLink } from './useProjectLink.js'

const props = defineProps({
  project: { type: Object, required: true },
  originEl: { type: Object, default: null }
})

const emit = defineEmits(['close'])

const DURATION = 380
const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)'

const titleId = `project-modal-title-${props.project.id}`
const hasMedia = computed(() => props.project.media?.length > 0)
const { linkHref, linkLabel, linkIconClass } = useProjectLink(() => props.project)

const backdropRef = ref(null)
const dialogRef = ref(null)
const innerRef = ref(null)

function computeTarget() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const mobile = vw <= 900
  const width = mobile ? vw - 16 : Math.min(1100, vw * 0.94)
  const height = mobile ? vh - 32 : Math.min(760, vh * 0.9)
  return { top: (vh - height) / 2, left: (vw - width) / 2, width, height }
}

const target = ref(computeTarget())

const rectStyle = computed(() => ({
  top: `${target.value.top}px`,
  left: `${target.value.left}px`,
  width: `${target.value.width}px`,
  height: `${target.value.height}px`
}))

function frame(rect, radius) {
  return {
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    borderRadius: `${radius}px`
  }
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function originRect() {
  const el = props.originEl
  if (!el || !el.isConnected) return null
  const rect = el.getBoundingClientRect()
  return rect.width > 0 && rect.height > 0 ? rect : null
}

let animations = []

function animate(el, keyframes, options) {
  const a = el.animate(keyframes, { duration: DURATION, easing: EASE, ...options })
  animations.push(a)
  return a
}

function open() {
  const from = originRect()
  animate(backdropRef.value, [{ opacity: 0 }, { opacity: 1 }], { easing: 'ease-out' })

  if (!from || prefersReducedMotion()) {
    animate(dialogRef.value, [{ opacity: 0 }, { opacity: 1 }], { duration: 150, easing: 'ease-out' })
    return
  }

  animate(dialogRef.value, [frame(from, 10), frame(target.value, 12)])
  animate(innerRef.value, [{ opacity: 0 }, { opacity: 1 }], {
    duration: DURATION * 0.5,
    delay: DURATION * 0.45,
    easing: 'ease-out',
    fill: 'backwards'
  })
}

let closing = false

async function close() {
  if (closing) return
  closing = true

  const current = dialogRef.value.getBoundingClientRect()
  const to = originRect()
  animations.forEach(a => a.cancel())
  animations = []

  const running = [
    animate(backdropRef.value, [{ opacity: 1 }, { opacity: 0 }], { easing: 'ease-in', fill: 'forwards' })
  ]

  if (!to || prefersReducedMotion()) {
    running.push(animate(dialogRef.value, [{ opacity: 1 }, { opacity: 0 }], { duration: 150, easing: 'ease-in', fill: 'forwards' }))
  } else {
    running.push(animate(dialogRef.value, [frame(current, 12), frame(to, 10)], { fill: 'forwards' }))
    running.push(animate(innerRef.value, [{ opacity: 1 }, { opacity: 0 }], {
      duration: DURATION * 0.3,
      easing: 'ease-in',
      fill: 'forwards'
    }))
  }

  try {
    await Promise.all(running.map(a => a.finished))
  } catch {
    // animation cancelled (e.g. unmounted mid-close); still close
  }
  emit('close')
}

function focusables() {
  return [...dialogRef.value.querySelectorAll(
    'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
  )]
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    e.preventDefault()
    e.stopPropagation()
    close()
    return
  }

  if (e.key !== 'Tab') return

  const items = focusables()
  if (items.length === 0) {
    e.preventDefault()
    return
  }
  const first = items[0]
  const last = items[items.length - 1]
  const active = document.activeElement
  const inside = dialogRef.value.contains(active)

  if (e.shiftKey && (active === first || active === dialogRef.value || !inside)) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && (active === last || !inside)) {
    e.preventDefault()
    first.focus()
  }
}

function onResize() {
  target.value = computeTarget()
}

onMounted(() => {
  open()
  dialogRef.value.focus({ preventScroll: true })
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', onResize)
  animations.forEach(a => a.cancel())
})
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 102;
  overscroll-behavior: contain;
}

.dialog {
  position: fixed;
  z-index: 103;
  background: #1a1a1a;
  border: 1px solid #444;
  border-radius: 12px;
  overflow: hidden;
  box-sizing: border-box;
  outline: none;
  overscroll-behavior: contain;
}

.inner {
  position: absolute;
  inset: 0;
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 1px solid #444;
  background: rgba(7, 7, 7, 0.7);
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.15s;
}

.close-btn:hover { background: rgba(255, 255, 255, 0.15); }

.content {
  height: 100%;
  box-sizing: border-box;
  padding: 24px;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
  overscroll-behavior: contain;
}

.content.has-media {
  grid-template-columns: minmax(0, 1.9fr) minmax(0, 1fr);
}

.details {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 0;
  overflow-y: auto;
  padding-right: 4px;
}

h2 {
  font-size: 26px;
  font-weight: 500;
  color: #fff;
  margin: 0;
  padding-right: 44px;
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
  color: #999;
  line-height: 1.7;
  margin: 0;
}

.project-link {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 6px;
  font-size: 15px;
  color: #999;
  text-decoration: none;
  transition: color 0.15s;
}

.project-link:hover { color: #fff; }

@media (max-width: 900px) {
  .content,
  .content.has-media {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 16px;
    overflow-y: auto;
  }

  .details {
    overflow: visible;
    flex-shrink: 0;
  }

  h2 { font-size: 22px; }
}
</style>
