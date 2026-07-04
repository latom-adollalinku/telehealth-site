'use client';

import { motion, useReducedMotion } from 'framer-motion';

interface ScrollFadeProps {
 children: React.ReactNode;
 className?: string;
 /** Delay in milliseconds before the reveal animation starts. */
 delay?: number;
}

/**
 * Scroll-triggered reveal. Drop-in replacement for the old IntersectionObserver
 * version: same props, same call sites. Now powered by Framer Motion for
 * smoother easing, and it respects prefers-reduced-motion (content appears
 * instantly, no transform) for accessibility and crawler visibility.
 */
export default function ScrollFade({
 children,
 className = '',
 delay = 0,
}: ScrollFadeProps) {
 const reduceMotion = useReducedMotion();

 if (reduceMotion) {
 return <div className={className}>{children}</div>;
 }

 return (
 <motion.div
 className={className}
 initial={{ opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-60px' }}
 transition={{
 duration: 0.6,
 delay: delay / 1000,
 ease: [0.22, 1, 0.36, 1],
 }}
 >
 {children}
 </motion.div>
 );
}
