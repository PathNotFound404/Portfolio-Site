<template>
  <Transition name="slide-up">
    <div 
        v-if="modelValue" 
        class="panel"
        ref="panelRef"
        tabindex="-1"
        @focusout="onFocusOut"
        >
        <button class="chevron-button" @click="closePanel">
          <i class="fas fa-chevron-down"></i>
        </button>
      <slot />
    </div>
  </Transition>
</template>

<script setup>
    import { ref, watch, nextTick } from 'vue'

    const props = defineProps({ modelValue: Boolean })
    const emit = defineEmits(['update:modelValue'])

    const panelRef = ref(null)

    // When panel opens, focus it so focusout works
    watch(() => props.modelValue, (val) => {
    if (val) {
        nextTick(() => panelRef.value?.focus())
    }
    })

    function onFocusOut(event) {
        if (!panelRef.value?.contains(event.relatedTarget)) {
        emit('update:modelValue', false)
  }
}

  function closePanel() {
    emit('update:modelValue', false)
  }


</script>

<style scoped>
.panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;           /* full width — change to e.g. left: 10%; right: 10% to make it narrower */
  height: 85vh;       /* how far up it comes — 50% of screen height */
  max-height: 90vh;   /* cap it so it never covers the whole screen */
  
  background: #070707;
  border-top: 1px solid rgb(255, 255, 255);
  padding: 24px;
  z-index: 100;
  box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.15);
  overflow-y: auto;   /* scroll if content is taller than the panel */

  /* add these */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 900px) {
  .panel {
    height: 90svh;      /* stable viewport on mobile */
    height: 90dvh;      /* modern dynamic viewport */
    max-height: 90dvh;
    padding: 14px 16px; /* optional: less vertical space on phones */
  }
}

.chevron-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 101;
  font-size: 24px;
}

.chevron-button:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.chevron-button:active {
  transform: translateY(0);
}



.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.35s cubic-bezier(0.32, 0.72, 0, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}

</style>