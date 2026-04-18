import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PillAnimButtonProps {
    label: string;
    href: string;
    isActive?: boolean;
    baseColor?: string;
    pillColor?: string;
    pillTextColor?: string;
    hoveredPillTextColor?: string;
    ariaLabel?: string;
    ease?: string;
}

const PillAnimButton: React.FC<PillAnimButtonProps> = ({
    label,
    href,
    isActive = false,
    baseColor = 'var(--text)',
    pillColor = 'var(--bg)',
    pillTextColor = 'var(--text)',
    hoveredPillTextColor = 'var(--bg)',
    ariaLabel,
    ease = 'power3.easeOut',
}) => {
    const circleRef = useRef<HTMLSpanElement | null>(null);
    const labelRef = useRef<HTMLSpanElement | null>(null);
    const labelHoverRef = useRef<HTMLSpanElement | null>(null);
    const tlRef = useRef<gsap.core.Timeline | null>(null);
    const activeTweenRef = useRef<gsap.core.Tween | null>(null);

    useEffect(() => {
        const initAnimation = () => {
            const circle = circleRef.current;
            if (!circle || !circle.parentElement) return;

            const pill = circle.parentElement as HTMLElement;
            const rect = pill.getBoundingClientRect();
            const { width: w, height: h } = rect;
            
            // Calculate radius and diameter for the bubble effect
            const R = ((w * w) / 4 + h * h) / (2 * h);
            const D = Math.ceil(2 * R) + 2;
            const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
            const originY = D - delta;

            circle.style.width = `${D}px`;
            circle.style.height = `${D}px`;
            circle.style.bottom = `-${delta}px`;

            gsap.set(circle, {
                xPercent: -50,
                scale: 0,
                transformOrigin: `50% ${originY}px`
            });

            if (labelRef.current) gsap.set(labelRef.current, { y: 0 });
            if (labelHoverRef.current) gsap.set(labelHoverRef.current, { y: h + 12, opacity: 0 });

            tlRef.current?.kill();
            const tl = gsap.timeline({ paused: true });

            tl.to(circle, { scale: 1.2, xPercent: -50, duration: 1.2, ease, overwrite: 'auto' }, 0);

            if (labelRef.current) {
                tl.to(labelRef.current, { y: -(h + 8), duration: 1.2, ease, overwrite: 'auto' }, 0);
            }

            if (labelHoverRef.current) {
                gsap.set(labelHoverRef.current, { y: Math.ceil(h + 100), opacity: 0 });
                tl.to(labelHoverRef.current, { y: 0, opacity: 1, duration: 1.2, ease, overwrite: 'auto' }, 0);
            }

            tlRef.current = tl;
        };

        // Run on mount and font load
        initAnimation();
        window.addEventListener('resize', initAnimation);
        if (document.fonts) {
            document.fonts.ready.then(initAnimation).catch(() => {});
        }

        return () => window.removeEventListener('resize', initAnimation);
    }, [label, ease]);

    const handleMouseEnter = () => {
        if (!tlRef.current) return;
        activeTweenRef.current?.kill();
        activeTweenRef.current = tlRef.current.tweenTo(tlRef.current.duration(), {
            duration: 0.4,
            ease,
            overwrite: 'auto'
        });
    };

    const handleMouseLeave = () => {
        if (!tlRef.current) return;
        activeTweenRef.current?.kill();
        activeTweenRef.current = tlRef.current.tweenTo(0, {
            duration: 0.3,
            ease,
            overwrite: 'auto'
        });
    };

    const pillStyle: React.CSSProperties = {
        background: pillColor,
        color: pillTextColor,
        paddingLeft: '18px',
        paddingRight: '18px'
    };

    return (
        <a
            role="menuitem"
            href={href}
            className="relative overflow-hidden inline-flex items-center justify-center no-underline rounded-full box-border font-semibold text-[14px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0 py-4 hover-trigger"
            style={pillStyle}
            aria-label={ariaLabel || label}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <span
                className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                style={{
                    background: baseColor,
                    willChange: 'transform'
                }}
                aria-hidden="true"
                ref={circleRef}
            />
            <span className="label-stack relative inline-block leading-[1] z-[2]">
                <span
                    className="pill-label relative z-[2] inline-block leading-[1]"
                    style={{ willChange: 'transform' }}
                    ref={labelRef}
                >
                    {label}
                </span>
                <span
                    className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                    style={{
                        color: hoveredPillTextColor,
                        willChange: 'transform, opacity'
                    }}
                    aria-hidden="true"
                    ref={labelHoverRef}
                >
                    {label}
                </span>
            </span>
            {isActive && (
                <span
                    className="absolute left-1/2 -bottom-[6px] -translate-x-1/2 w-3 h-3 rounded-full z-[4]"
                    style={{ background: baseColor }}
                    aria-hidden="true"
                />
            )}
        </a>
    );
};

export default PillAnimButton;
