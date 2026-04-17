<template>
	<Panel v-model="isOpen">
		<div class="wrapper">
			<h1>Get In Touch</h1>
			<p class="intro">
				Greetings! I am always interested in new opportunities and open for collaboration.
				Feel free to reach out if you'd like to work together or just want to say hello!
			</p>

			<div class="links">
				<a class="contact-link" href="mailto:c.pinkston2004@gmail.com">
					<i class="fa-solid fa-envelope"></i>
					<span>c.pinkston2004@gmail.com</span>
				</a>

				<a class="contact-link" href="https://www.linkedin.com/in/cody-pinkston/" target="_blank" rel="noreferrer">
					<i class="fa-brands fa-linkedin"></i>
					<span>linkedin.com/in/cody-pinkston</span>
				</a>

				<a class="contact-link" href="https://github.com/PathNotFound404" target="_blank" rel="noreferrer">
					<i class="fa-brands fa-github"></i>
					<span>github.com/PathNotFound404</span>
				</a>
			</div>
		</div>
	</Panel>
</template>

<script setup>
	import Panel from './pannel.vue'
	import { ref } from 'vue'

	const isOpen = ref(false)

	defineExpose({ open: () => isOpen.value = true })
</script>

<style scoped>
.wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	padding: 10px 0 0;
	text-align: center;
}

h1 {
	color: #fff;
	margin: 0;
	padding-top: 0;
	font-family: "Segoe UI", "Roboto", sans-serif;
	font-size: clamp(2rem, 3.8vw, 3.2rem);
	font-weight: 300;
}

.intro {
	color: rgba(255, 255, 255, 0.84);
	margin: 18px 0 0;
	max-width: 820px;
	font-size: clamp(1.05rem, 2vw, 1.25rem);
	line-height: 1.55;
}

.links {
	width: 100%;
	display: grid;
	justify-items: center;
	gap: 12px;
	margin-top: 26px;
}

.contact-link {
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 4px 8px;
	text-decoration: none;
	color: #fff;
	font-size: 1rem;
	font-weight: 600;
	width: fit-content;
	transition: color 0.2s ease;
}

.contact-link:hover {
	color: #b8b8b8;
	text-decoration: none;
}

.contact-link i {
	font-size: 1.8rem;
	width: 30px;
	text-align: center;
	flex-shrink: 0;
}

.contact-link span {
	word-break: break-word;
}

@media (max-width: 900px) {
	.wrapper {
		padding: 6px 0 0;
	}

	.intro {
		max-width: 100%;
		font-size: 1rem;
		line-height: 1.5;
	}

	.links {
		gap: 10px;
		margin-top: 22px;
	}

	.contact-link {
		font-size: 0.96rem;
	}
}
</style>
