<template>
    <Panel v-model="isOpen">
        <div class="wrapper">
            <h1>About Me</h1>
            <div class="content">
                <div class="row">
                  <div class="pic-wrapper">
                    <img src="@/assets/Pinkston_Corvette.jpeg" alt="Profile Picture" class="profile-pic" />
                  </div>
                    <div class="about-text">
                      <p>
                        I am someone who is endlessly curious. I have always been drawn to taking things apart,
                        figuring out how they work, and putting them back together (hopefully).
                        That drive is at the heart of my passion for working on cars. The 1985 Chevy Corvette you see pictured is a testament to that,
                        I personally handled everything from diagnostics to repairs, stopping just short of a full engine pull.
                      </p>
                  </div>
                </div>
                <div class="row mobile-row">
                  <div class="about-text">
                    <p>
                      That same curiosity doesn't stay in the garage. It carries directly into my passion for software engineering, where the puzzle just looks different.
                      I love digging into how applications are built from the ground up, understanding the systems, the logic, and the decisions that make everything click together.
                      Whether I'm designing a clean user interface or architecting a backend, I'm drawn to the full picture.
                      The projects you'll find here reflect that each one is something I built to solve a real problem, sharpen a skill,
                      or simply explore an idea I couldn't stop thinking about.
                      At the end of the day, I'm driven by the same instinct whether I'm under a hood or behind a keyboard to understand, to build,
                      and to leave things better than I found them.
                    </p>
                  </div>
                  <div class="pic-wrapper">
                    <img src="@/assets/Pinkston_Headshot.jpeg" alt="Profile Headshot" class="profile-pic" />
                  </div>
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
    height: auto;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 36px;
}

.row{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 36px;
    width: 100%;
}

.pic-wrapper {
  flex-basis: 48%;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-pic {
  max-width: 100%;
  max-height: 60vh;
  width: auto;
  height: auto;
  display: block;
  border-radius: 12px;  /* put it directly on the img, not the wrapper */
}

.about-text {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 560px;
    align-self: center;
    flex: 1;
}

p {
    color: #fff;
    margin: 0;
    font-size: 1.2rem;
}

@media (max-width: 900px) {
  .row {
    flex-direction: column;
    align-items: center;
  }

  .mobile-row{
    flex-direction: column-reverse;
  }

  .profile-pic {
    max-width: 92vw;
    max-height: 58vh;
  }

  .about-text {
    max-width: 88vw;
  }
}

</style>