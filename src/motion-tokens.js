export const motionTokens = {
  duration: { instant: .08, fast: .18, normal: .35, slow: .6, crawl: 1, story: 3.5, showcase: 6 },
  easing: { smooth: [.22, 1, .36, 1] },
  distance: { sm: 8, md: 16, lg: 24 },
};
export const springs = { gentle: { type: 'spring', stiffness: 120, damping: 20 } };
export function shouldAnimate(reduced, paused) {
  return !reduced && !paused && !(typeof navigator !== 'undefined' && navigator.hardwareConcurrency <= 4);
}
