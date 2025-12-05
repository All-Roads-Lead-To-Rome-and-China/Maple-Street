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
  const { threshold = 0.1, rootMargin = '0px 0px -50px 0px', triggerOnce = true } = options;
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
 * Utility to set up scroll animations on multiple elements.
 * Call this in a useEffect to animate elements that match the selector.
 */
export function initScrollAnimations(
  containerRef?: React.RefObject<HTMLElement>,
  selector: string = '.scroll-animate, .scroll-fade-up, .scroll-scale-in, .scroll-fade-in, .scroll-slide-left, .scroll-slide-right'
) {
  const container = containerRef?.current || document;
  const elements = container.querySelectorAll(selector);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
}

export default useScrollAnimation;
