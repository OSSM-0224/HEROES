import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useLandingAnimations = () => {
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const subheadRef = useRef(null);
  const ctaRef = useRef(null);
  const showcaseRef = useRef(null);
  const floatingCard1Ref = useRef(null);
  const floatingCard2Ref = useRef(null);
  const floatingCard3Ref = useRef(null);
  const featuresRef = useRef(null);
  const workflowRef = useRef(null);
  const testimonialsRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {});

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline();
      tl.fromTo(headlineRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      ).fromTo(subheadRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.4'
      ).fromTo(ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      );

      if (floatingCard1Ref.current && floatingCard2Ref.current && floatingCard3Ref.current) {
        ctx.add(() => {
          gsap.to(floatingCard1Ref.current, { y: -14, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
          gsap.to(floatingCard2Ref.current, { y: -18, duration: 3.8, delay: 0.5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
          gsap.to(floatingCard3Ref.current, { y: -12, duration: 3.5, delay: 1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        });
      }

      if (featuresRef.current) {
        const cards = featuresRef.current.querySelectorAll('.feature-card');
        gsap.fromTo(cards,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: { trigger: featuresRef.current, start: 'top 80%', once: true },
            y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          }
        );
      }

      if (workflowRef.current) {
        const steps = workflowRef.current.querySelectorAll('.workflow-step');
        gsap.fromTo(steps,
          { y: 40, opacity: 0 },
          {
            scrollTrigger: { trigger: workflowRef.current, start: 'top 80%', once: true },
            y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          }
        );
      }

      if (testimonialsRef.current) {
        const cards = testimonialsRef.current.querySelectorAll('.testimonial-card');
        gsap.fromTo(cards,
          { y: 30, opacity: 0 },
          {
            scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%', once: true },
            y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          }
        );
      }
    });

    return () => { mm.revert(); ctx.revert(); };
  }, []);

  return {
    heroRef, headlineRef, subheadRef, ctaRef, showcaseRef,
    floatingCard1Ref, floatingCard2Ref, floatingCard3Ref,
    featuresRef, workflowRef, testimonialsRef,
  };
};
