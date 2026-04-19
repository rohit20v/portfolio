import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      
      gsap.to(cursor, {
        x: x - 5,
        y: y - 5,
        duration: 0.1,
      });

      gsap.to(follower, {
        x: x - 20,
        y: y - 20,
        duration: 0.3,
      });
    };

    const onElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' || 
          target.closest('.hover-trigger')) {
        gsap.to(follower, {
          scale: 1.5,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderColor: 'rgba(255, 255, 255, 0.5)',
          duration: 0.3,
        });
        gsap.to(cursor, {
          scale: 2,
          duration: 0.3,
        });
      }
    };

    const onElementLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' || 
          target.closest('.hover-trigger')) {
        gsap.to(follower, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          duration: 0.3,
        });
        gsap.to(cursor, {
          scale: 1,
          duration: 0.3,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onElementHover);
    window.addEventListener('mouseout', onElementLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onElementHover);
      window.removeEventListener('mouseout', onElementLeave);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={followerRef} className="custom-cursor-follower hidden md:block" />
    </>
  );
};

export default CustomCursor;
