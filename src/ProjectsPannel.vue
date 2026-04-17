<template>
    <Panel v-model="isOpen">
        <div class="content">
            <h2>Projects</h2>


            <div class="projects-list">
                <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
            </div>
        </div>
    </Panel>
</template>

<script setup>
    import Panel from './pannel.vue'
    import { ref } from 'vue'
    import ProjectCard from './ProjectCard.vue'

    const  isOpen = ref(false);

    defineExpose({ open: () => isOpen.value = true })


const projects = [
  {
    id: 1,
    name: 'CUDA Image Processor',
    tags: ['Cuda', 'C'],
    description: 'Developed a CUDA-based image processing application that applies various filters and transformations to images, leveraging GPU acceleration for real-time performance.',
    github: 'https://github.com/PathNotFound404/CUDA-Accelerated-Image-Processing',
    preferredLink: 'github'
  },
  {
    id: 2,
    name: 'Letterboxd Movie Recommendations',
    tags: ['Java', 'Maven', 'Swing', 'Web Scraping'],
    description: 'Desktop application that gets user data from Letterboxd and uses it to generate movie recommendations based on their watch history and ratings.',
    github: 'https://github.com/PathNotFound404/Movie-Picker',
    preferredLink: 'github'
  },
  {
    id: 3,
    name: 'C++ Shell',
    tags: ['C++'],
    description: 'A simple shell implementation in C++ with basic command execution and pipeline support.',
    github: 'https://github.com/PathNotFound404/C++-Shell',
    preferredLink: 'github'
  },
  {
    id: 4,
    name: 'TV Database',
    tags: ['Python', 'MySQL'],
    description: 'Designed a relational database in MySQL that store 10,000+ TV shows, and a python GUI to manage and view the data.',
    github: 'https://github.com/PathNotFound404/TV-Database',
    preferredLink: 'github'
  },
  {
    id: 5,
    name: 'Portfolio Site',
    tags: ['Vue', 'JavaScript', 'HTML', 'CSS'],
    description: 'Yes I even built this site and you can view the code on GitHub.',
    github: 'https://github.com/PathNotFound404/Portfolio-Site',
    preferredLink: 'github'
  }
]

</script>

<style scoped>

h2 {
    color: #fff;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 1200px;
}

.projects-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 18px;
    margin-top: 18px;
    width: 100%;
}


</style>