export function getStarfieldOptions(reducedMotion) {
  return {
    fullScreen: { enable: true, zIndex: -1 },
    background: { color: { value: 'transparent' } },
    detectRetina: true,
    fpsLimit: 60,
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    particles: {
      number: {
        value: reducedMotion ? 40 : 140,
        density: { enable: true },
      },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      size: { value: { min: 0.5, max: 2 } },
      opacity: {
        value: { min: 0.2, max: 0.5 },
        animation: {
          enable: !reducedMotion,
          speed: 0.4,
          sync: false,
          startValue: 'random',
        },
      },
      links: {
        enable: true,
        distance: 130,
        color: '#ffffff',
        opacity: 0.2,
        width: 1,
        triangles: { enable: false },
      },
      move: {
        enable: !reducedMotion,
        speed: reducedMotion ? 0.1 : 0.5,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'grab' },
        onClick: { enable: false },
        resize: { enable: true },
      },
      modes: {
        grab: {
          distance: 150,
          links: { opacity: 0.5 },
        },
      },
    },
    responsive: [
      {
        maxWidth: 900,
        options: {
          particles: {
            number: { value: reducedMotion ? 25 : 70 },
            links: { distance: 100 },
          },
        },
      },
    ],
    motion: {
      disable: false,
      reduce: { factor: 4, value: true },
    },
  }
}
