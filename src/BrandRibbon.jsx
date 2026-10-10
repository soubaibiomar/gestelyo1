import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export default function BrandRibbon() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 3]);
  return <><motion.div ref={ref} className="brand-ribbon" aria-hidden="true" style={reduced ? undefined : { y, rotate }}>
    <svg viewBox="0 0 900 700" fill="none">
      <defs><linearGradient id="ribbon-blue" x1="160" y1="560" x2="750" y2="90" gradientUnits="userSpaceOnUse"><stop stopColor="#0639b7"/><stop offset=".52" stopColor="#075bff"/><stop offset="1" stopColor="#1898ff"/></linearGradient></defs>
      <path d="M150 520C-50 180 440 65 690 65C950 65 875 410 700 555" stroke="#092669" strokeWidth="83"/>
      <path d="M160 520C-20 150 470 45 700 65" stroke="url(#ribbon-blue)" strokeWidth="86"/>
      <path d="M700 65C950 65 920 480 620 590C420 665 220 610 140 560" stroke="url(#ribbon-blue)" strokeWidth="76"/>
    </svg>
  </motion.div><motion.div className="brand-ribbon brand-ribbon-front" aria-hidden="true" style={reduced ? undefined : { y, rotate }}><svg viewBox="0 0 900 700" fill="none"><path d="M1000 50C1100 400 930 530 720 610C660 650 620 680 600 700" stroke="url(#ribbon-blue)" strokeWidth="76"/></svg></motion.div></>;
}
