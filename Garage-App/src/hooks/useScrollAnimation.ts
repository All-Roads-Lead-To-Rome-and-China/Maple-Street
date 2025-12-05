import { useEffect, useRef, useState } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for scroll-based animations using Intersection Observer.
 * Returns a ref to attach to elements and an isVisible state.
 * 
 * @param options - Configuration options for the animation
 * @returns Object with ref and isVisible state
 */
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  options: ScrollAnimationOptions = {}
) {
  // triggerOnce defaults to FALSE for reversible animations
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = false } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          // Reverse animation when element leaves viewport
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Hook variant that automatically adds animation classes.
 * Attach the returned ref to any element with scroll animation CSS classes.
 * Animations are REVERSIBLE by default - they reverse when scrolling back up.
 */
export function useScrollAnimationClass<T extends HTMLElement = HTMLDivElement>(
  animationClass: string = 'scroll-fade-up',
  options: ScrollAnimationOptions = {}
) {
  const { ref, isVisible } = useScrollAnimation<T>(options);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Ensure element has the base animation class
    if (!element.classList.contains(animationClass)) {
      element.classList.add(animationClass);
    }

    // Toggle the animate-in class based on visibility
    if (isVisible) {
      element.classList.add('animate-in');
    } else {
      element.classList.remove('animate-in');
    }
  }, [isVisible, animationClass]);

  return ref;
}

/**
 * Utility to set up REVERSIBLE scroll animations on multiple elements.
 * Animations play forward when scrolling down and reverse when scrolling up.
 * Call this in a useEffect to animate elements that match the selector.
 */
export function initScrollAnimations(
  containerRef?: React.RefObject<HTMLElement | null>,
  selector: string = '.scroll-animate, .scroll-fade-up, .scroll-scale-in, .scroll-fade-in, .scroll-slide-left, .scroll-slide-right'
) {
  const container = containerRef?.current || document;
  const elements = container.querySelectorAll(selector);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element entering viewport - play animation forward
          entry.target.classList.add('animate-in');
        } else {
          // Element leaving viewport - reverse animation
          entry.target.classList.remove('animate-in');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -80px 0px' }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}

/**
 * Creates a scroll-linked animation controller for Apple-style parallax effects.
 * Tracks scroll position and provides normalized progress values for animations.
 */
export function useScrollProgress(elementRef: React.RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress: 0 when element is below viewport, 1 when above
      // Element enters at progress ~0.3, fully visible at 0.5, exits at ~0.7
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // Normalize: 0 = element just entering bottom, 1 = element just leaving top
      const rawProgress = 1 - (elementTop + elementHeight) / (windowHeight + elementHeight);
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  return progress;
}

export default useScrollAnimation;
