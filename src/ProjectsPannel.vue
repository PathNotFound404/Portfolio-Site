<template>
    <Panel v-model="isOpen">
        <div class="content">
            <h2>Projects</h2>


            <div class="projects-list">
                <ProjectCard
                    v-for="project in projects"
                    :key="project.id"
                    :project="project"
                    :hidden="activeProject?.id === project.id"
                    @select="openProject"
                />
            </div>

            <ProjectModal
                v-if="activeProject"
                :project="activeProject"
                :origin-el="activeCardEl"
                @close="closeProject"
            />
        </div>
    </Panel>
</template>

<script setup>
    import Panel from './pannel.vue'
    import { ref, nextTick } from 'vue'
    import ProjectCard from './ProjectCard.vue'
    import ProjectModal from './ProjectModal.vue'

    const  isOpen = ref(false);

    defineExpose({ open: () => isOpen.value = true })

    const activeProject = ref(null)
    const activeCardEl = ref(null)

    function openProject(project, cardEl) {
        activeCardEl.value = cardEl
        activeProject.value = project
    }

    function closeProject() {
        const cardEl = activeCardEl.value
        activeProject.value = null
        activeCardEl.value = null
        // the card is visible again after this tick, so it can take focus back
        nextTick(() => cardEl?.focus({ preventScroll: true }))
    }


const projects = [
  {
    id: 1,
    name: 'CUDA Image Processor',
    tags: ['Cuda', 'C'],
    description: 'CUDA-Accelerated Image Processing is a high-performance C++/CUDA project that applies common image filters to P6 PPM images using GPU parallelism. It includes effects like channel dropping, blur, sharpen, and Sobel edge detection, and is designed to compare GPU processing against CPU results for both correctness and performance. The tool reports timing for host-to-device transfer, kernel execution, and device-to-host transfer, making it useful for understanding CUDA workflow efficiency in real image-processing tasks. Overall, this project demonstrates practical GPU acceleration, memory management, and filter implementation in a clean command-line workflow. To Learn more about the project, check out the GitHub repository.',
    github: 'https://github.com/PathNotFound404/CUDA-Accelerated-Image-Processing',
    preferredLink: 'github',
    media: [
        { type: 'image', src: '/projects/cuda/Default.jpg', alt: 'Default' },
        { type: 'image', src: '/projects/cuda/Blur.jpg', alt: 'Blur' },
        { type: 'image', src: '/projects/cuda/DropBlue.jpg', alt: 'Drop Bue' },
        { type: 'image', src: '/projects/cuda/DropRed.jpg', alt: 'Drop Red' },
        { type: 'image', src: '/projects/cuda/DropGreen.jpg', alt: 'Drop Green' },
        { type: 'image', src: '/projects/cuda/Sharpen.jpg', alt: 'Sharpen' },
        { type: 'image', src: '/projects/cuda/SobelX.jpg', alt: 'Sobel X' },
        { type: 'image', src: '/projects/cuda/SobelY.jpg', alt: 'Sobel Y' },
    ]
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
  },
  {
    id: 6,
    name: 'Project Pulse',
    tags: ['Vue', "Springboot", 'Azure', "Docker", "CI/CD"],
    description: 'A full-stack peer evaluation platform built for TCU\'s CS senior design program, replacing manual form workflows with automated score aggregation, real-time feedback, and role-based dashboards.',
    github: 'https://github.com/PathNotFound404/Project-Pulse-Web-Tech-Final-Project',
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