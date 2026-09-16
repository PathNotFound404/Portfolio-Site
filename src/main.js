import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

import VueParticles from '@tsparticles/vue3'
import { loadCircleShape } from '@tsparticles/shape-circle'
import { loadHexColorPlugin } from '@tsparticles/plugin-hex-color'
import { loadHslColorPlugin } from '@tsparticles/plugin-hsl-color'
import { loadInteractivityPlugin } from '@tsparticles/plugin-interactivity'
import { loadMovePlugin } from '@tsparticles/plugin-move'
import { loadOpacityUpdater } from '@tsparticles/updater-opacity'
import { loadOutModesUpdater } from '@tsparticles/updater-out-modes'
import { loadPaintUpdater } from '@tsparticles/updater-paint'
import { loadParticlesLinksInteraction } from '@tsparticles/interaction-particles-links'
import { loadExternalGrabInteraction } from '@tsparticles/interaction-external-grab'

const app = createApp(App)

app.use(VueParticles, {
  init: async (engine) => {
    await loadCircleShape(engine)
    await loadHexColorPlugin(engine)
    await loadHslColorPlugin(engine)
    await loadInteractivityPlugin(engine)
    await loadMovePlugin(engine)
    await loadOpacityUpdater(engine)
    await loadOutModesUpdater(engine)
    await loadPaintUpdater(engine)
    await loadParticlesLinksInteraction(engine)
    await loadExternalGrabInteraction(engine)
  },
})

app.mount('#app')
