import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const useOverviewAnimations = (metrics) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !metrics) return;
    const targets = containerRef.current.querySelectorAll('.stat-count');
    targets.forEach((el) => {
      const rawVal = el.getAttribute('data-value');
      if (!rawVal) return;
      const numericVal = parseFloat(rawVal.replace(/[^0-9.]/g, '')) || 0;
      const isDollar = rawVal.startsWith('$');

      gsap.fromTo(
        el,
        { textContent: isDollar ? '$0' : '0' },
        {
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: function () {
            const current = Math.floor(this.progress() * numericVal);
            el.textContent = isDollar
              ? `$${current.toLocaleString()}`
              : current.toLocaleString();
          },
        }
      );
    });
  }, [metrics]);

  return { containerRef };
};
