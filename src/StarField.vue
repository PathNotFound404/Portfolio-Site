<template>
  <VueParticles id="tsparticles" :options="options" />
</template>

<script setup>
import { getStarfieldOptions } from './starfieldOptions.js'

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const options = getStarfieldOptions(reducedMotion)
</script>
