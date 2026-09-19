import { computed } from 'vue'

export function useProjectLink(getProject) {
  const selectedLinkType = computed(() => {
    const project = getProject()
    if (project?.preferredLink === 'live' && project?.live) return 'live'
    if (project?.preferredLink === 'github' && project?.github) return 'github'
    if (project?.live) return 'live'
    return 'github'
  })

  const linkHref = computed(() => {
    const project = getProject()
    if (selectedLinkType.value === 'live') return project?.live
    return project?.github
  })

  const linkLabel = computed(() => {
    if (selectedLinkType.value === 'live') return 'View Live App'
    return 'View on GitHub'
  })

  const linkIconClass = computed(() => {
    if (selectedLinkType.value === 'live') return 'fa-solid fa-arrow-up-right-from-square'
    return 'fa-brands fa-github'
  })

  return { linkHref, linkLabel, linkIconClass }
}
