import React from 'react';
import { motion } from 'framer-motion';

/**
 * Scroll-triggered reveal animation. Replaces the CSS .reveal class.
 *
 * Props:
 *  - direction: 'up' | 'down' | 'left' | 'right' (default 'up')
 *  - delay: seconds (default 0)
 *  - duration: seconds (default 0.6)
 *  - distance: px (default 30)
 *  - once: animate only once (default true)
 *  - className: pass through
 *  - style: pass through
 *  - as: motion element type (default 'div')
 */
const directionMap = {
  up:    { x: 0,   y: 30 },
  down:  { x: 0,   y: -30 },
  left:  { x: 40,  y: 0 },
  right: { x: -40, y: 0 },
};

const Reveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance,
  once = true,
  className,
  style,
  as = 'div',
  ...rest
}) => {
  const dir = directionMap[direction] || directionMap.up;
  const d = distance ?? (direction === 'left' || direction === 'right' ? 40 : 30);
  const ratio = d / 30;

  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      initial={{
        opacity: 0,
        x: dir.x * ratio,
        y: dir.y * ratio,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
};

/**
 * Stagger container — its direct children should use `StaggerItem`.
 */
const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const StaggerContainer = ({
  children,
  className,
  style,
  once = true,
  as = 'div',
  ...rest
}) => {
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
};

const staggerItemVariants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const StaggerItem = ({
  children,
  className,
  style,
  as = 'div',
  ...rest
}) => {
  const MotionComponent = motion[as] || motion.div;

  return (
    <MotionComponent
      variants={staggerItemVariants}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
};

export { Reveal, StaggerContainer, StaggerItem };
export default Reveal;
