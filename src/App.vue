

<template>
  <div class="name">
    <h1>Cody Pinkston</h1>
    <h4>Full Stack Developer</h4>
    <div class="brand-icons">
      <div class="icon-wrapper">  
        <a href="Pinkston_Resume.pdf" target="_blank"><i class="fa-solid fa-file-lines"></i></a>
        <span class="icon-text">Resume</span>
      </div>
      <div class="icon-wrapper">
        <a href="https://github.com/PathNotFound404" target="_blank"><i class="fa-brands fa-github"></i></a>
        <span class="icon-text">Git Hub</span>
      </div>
      <div class="icon-wrapper">
        <a href="https://www.linkedin.com/in/cody-pinkston/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
        <span class="icon-text">LinkedIn</span>
      </div>
      <div class="icon-wrapper">
        <a href="mailto:c.pinkston2004@gmail.com"><i class="fa-solid fa-envelope"></i></a>
        <span class="icon-text">Email</span>
      </div> 
    </div>
    
    <div class="buttons">
      <button @click="aboutOpen.open()">About</button>
      <button @click="projectsOpen.open()">Projects</button>
      <button @click="contactOpen.open()">Contact</button>
    </div>
  </div>

  <AboutPannel ref="aboutOpen" />
  <ProjectsPannel ref="projectsOpen" />
  <ContactPannel ref="contactOpen" />

</template>

<script setup>
import { ref } from 'vue'
import AboutPannel from './AboutPannel.vue'
import ProjectsPannel from './ProjectsPannel.vue'
import ContactPannel from './ContactPannel.vue'

const aboutOpen = ref(null)
const projectsOpen = ref(null)
const contactOpen = ref(null)

</script>

<style scoped></style>
