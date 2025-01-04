import confetti from 'canvas-confetti'

function confettiRating(end: number) {
  const colors = ['#bb0000', '#ffffff']

  ;(function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    })
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()
}

export const confettiWinner = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  })
}

export function confettiRatingCompleted() {
  const end = Date.now() + 10 * 1000

  confettiRating(end)
}
