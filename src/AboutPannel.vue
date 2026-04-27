<template>
    <Panel v-model="isOpen">
        <div class="wrapper">
            <h1>About Me</h1>
            <div class="content">
                <img src="@/assets/Pinkston_Corvette.jpeg" alt="Profile Picture" class="profile-pic" />
                <div class="about-text">
                    <p>
                      I am someone who is endlessly curious. I have always been drawn to taking things apart,
                      figuring out how they work, and putting them back together (hopefully).
                      That drive is at the heart of my passion for working on cars. The 1985 Chevy Corvette you see pictured is a testament to that,
                      I personally handled everything from diagnostics to repairs, stopping just short of a full engine pull.
                    </p>
                </div>
            </div>
        </div>
    </Panel>
</template>

<script setup>
    import Panel from './pannel.vue'
    import { ref } from 'vue'

    const  isOpen = ref(false);

    defineExpose({ open: () => isOpen.value = true })

</script>

<style scoped>

h1 {
    color: #fff;
    margin: 0;
    text-align: center;
    font-family: "Segoe UI","Roboto", sans-serif;
}

.wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    align-self: stretch;
    gap: 20px;
}

.content {
    width: 100%;
    max-width: 1400px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 36px;
}

.profile-pic {
    width: min(700px, 58vw);
    max-height: 72vh;
    height: auto;
    object-fit: contain;
    border-radius: 12px;
    flex-shrink: 0;
}

.about-text {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 560px;
}

p {
    color: #fff;
    margin: 0;
    font-size: 1rem;
}

@media (max-width: 900px) {
    .content {
        flex-direction: column;
        align-items: center;
    }

    .profile-pic {
        width: min(700px, 92vw);
        max-height: 58vh;
    }

    .about-text {
        max-width: 88vw;
    }
}

</style>