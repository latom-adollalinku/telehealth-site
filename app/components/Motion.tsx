'use client';

/**
 * Shared Framer Motion primitives for LATOM Wellness.
 *
 * - StaggerGroup / StaggerItem: reveal a set of children in sequence as they
 * scroll into view. Used for card grids so they cascade instead of popping.
 * - HoverCard: a card wrapper that lifts and brightens on hover, with a spring.
 * - FadeUp: a single element reveal (thin wrapper over the same motion config).
 *
 * Everything respects prefers-reduced-motion: reduced-motion users get the
 * content immediately with no transform and no hover translation.
 */

import { motion, useReducedMotion, type Variants } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

// ---------------------------------------------------------------------------
// Stagger group + item
// ---------------------------------------------------------------------------

const groupVariants: Variants = {
 hidden: {},
 show: {
 transition: { staggerChildren: 0.09, delayChildren: 0.05 },
 },
};

const itemVariants: Variants = {
 hidden: { opacity: 0, y: 28 },
 show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

export function StaggerGroup({
 children,
 className = '',
}: {
 children: React.ReactNode;
 className?: string;
}) {
 const reduceMotion = useReducedMotion();
 if (reduceMotion) return <div className={className}>{children}</div>;

 return (
 <motion.div
 className={className}
 variants={groupVariants}
 initial="hidden"
 whileInView="show"
 viewport={{ once: true, margin: '-80px' }}
 >
 {children}
 </motion.div>
 );
}

export function StaggerItem({
 children,
 className = '',
}: {
 children: React.ReactNode;
 className?: string;
}) {
 const reduceMotion = useReducedMotion();
 if (reduceMotion) return <div className={className}>{children}</div>;

 return (
 <motion.div className={className} variants={itemVariants}>
 {children}
 </motion.div>
 );
}

// ---------------------------------------------------------------------------
// Hover-lift card
// ---------------------------------------------------------------------------

export function HoverCard({
 children,
 className = '',
}: {
 children: React.ReactNode;
 className?: string;
}) {
 const reduceMotion = useReducedMotion();
 if (reduceMotion) return <div className={className}>{children}</div>;

 return (
 <motion.div
 className={className}
 whileHover={{ y: -6 }}
 transition={{ type: 'spring', stiffness: 320, damping: 24 }}
 >
 {children}
 </motion.div>
 );
}

// ---------------------------------------------------------------------------
// Single fade-up reveal
// ---------------------------------------------------------------------------

export function FadeUp({
 children,
 className = '',
 delay = 0,
}: {
 children: React.ReactNode;
 className?: string;
 delay?: number;
}) {
 const reduceMotion = useReducedMotion();
 if (reduceMotion) return <div className={className}>{children}</div>;

 return (
 <motion.div
 className={className}
 initial={{ opacity: 0, y: 24 }}
 whileInView={{ opacity: 1, y: 0 }}
 viewport={{ once: true, margin: '-60px' }}
 transition={{ duration: 0.6, delay, ease: EASE }}
 >
 {children}
 </motion.div>
 );
}

// ---------------------------------------------------------------------------
// Hero entrance: animates immediately on load (not scroll-triggered)
// ---------------------------------------------------------------------------

export function HeroReveal({
 children,
 className = '',
 delay = 0,
}: {
 children: React.ReactNode;
 className?: string;
 delay?: number;
}) {
 const reduceMotion = useReducedMotion();
 if (reduceMotion) return <div className={className}>{children}</div>;

 return (
 <motion.div
 className={className}
 initial={{ opacity: 0, y: 20 }}
 animate={{ opacity: 1, y: 0 }}
 transition={{ duration: 0.7, delay, ease: EASE }}
 >
 {children}
 </motion.div>
 );
}
