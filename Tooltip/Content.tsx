// Content.tsx
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import styles from './Tooltip.module.scss';
import { useTooltip } from './Tooltip';

export type Placement = 'bottom' | 'top' | 'left' | 'right';
export type Align = 'start' | 'center' | 'end';

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    placement?: Placement; // 기본 'bottom'
    align?: Align; // 기본 'center'
    offset?: number; // 기본 8px
};

const Content: React.FC<ContentProps> = ({
    children,
    placement = 'bottom',
    align = 'center',
    offset = 8,
    ...props
}) => {
    const { tooltipValue, anchorRef, showTooltip, hideTooltip } = useTooltip();

    // ── 1) 포털 컨테이너: mount 시 한 번만 append / unmount 시 제거 ──
    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const el = document.createElement('div');
        Object.assign(el.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '0',
            height: '0',
            overflow: 'visible',
            pointerEvents: 'none',
            zIndex: '9999',
        });
        document.body.appendChild(el);
        containerRef.current = el;
        return () => {
            if (containerRef.current) document.body.removeChild(containerRef.current);
            containerRef.current = null;
        };
    }, []);

    // ── 2) 툴팁 콘텐츠 측정용 ref ──
    const contentRef = useRef<HTMLDivElement>(null);

    // ── 3) 위치·visibility 상태 ──
    const [style, setStyle] = useState<React.CSSProperties>({
        position: 'absolute',
        visibility: 'hidden',
        pointerEvents: 'auto',
    });

    // ── 4) 열린/닫힐 때마다 위치 계산 및 visibility 토글 ──
    useLayoutEffect(() => {
        const containerEl = containerRef.current;
        const triggerEl = anchorRef.current;
        const contentEl = contentRef.current;
        if (!containerEl || !triggerEl || !contentEl) return;

        if (!tooltipValue) {
            // 숨김
            setStyle((s) => ({ ...s, visibility: 'hidden' }));
            return;
        }

        // 기준 영역 측정
        const rect = triggerEl.getBoundingClientRect();
        const tw = contentEl.offsetWidth;
        const th = contentEl.offsetHeight;
        const vw = document.documentElement.clientWidth;
        const vh = document.documentElement.clientHeight;

        let top: number, left: number;

        // 1) primary axis (placement)
        switch (placement) {
            case 'top':
                top = rect.top + window.scrollY - th - offset;
                break;
            case 'bottom':
                top = rect.bottom + window.scrollY + offset;
                break;
            default:
                top = rect.top + window.scrollY + (rect.height - th) / 2;
        }
        switch (placement) {
            case 'left':
                left = rect.left + window.scrollX - tw - offset;
                break;
            case 'right':
                left = rect.right + window.scrollX + offset;
                break;
            default:
                left = rect.left + window.scrollX + (rect.width - tw) / 2;
        }

        // 2) cross-axis 정렬 (align)
        if (placement === 'top' || placement === 'bottom') {
            if (align === 'start') left = rect.left + window.scrollX;
            else if (align === 'end') left = rect.right + window.scrollX - tw;
        } else {
            if (align === 'start') top = rect.top + window.scrollY;
            else if (align === 'end') top = rect.bottom + window.scrollY - th;
        }

        // 3) 화면 밖으로 나가지 않도록 clamp
        top = Math.min(Math.max(top, offset), vh - th - offset);
        left = Math.min(Math.max(left, offset), vw - tw - offset);

        // 4) 스타일 적용 (visibility: visible)
        setStyle({
            position: 'absolute',
            top,
            left,
            zIndex: 9999,
            visibility: 'visible',
            pointerEvents: 'auto',
        });
    }, [tooltipValue, placement, align, offset, anchorRef]);

    useEffect(() => {
        if (!tooltipValue) return;
        const handler = () => hideTooltip();
        // capture 단계로 걸어야 스크롤 직후에도 바로 닫힙니다
        window.addEventListener('scroll', handler, true);
        return () => {
            window.removeEventListener('scroll', handler, true);
        };
    }, [tooltipValue, hideTooltip]);

    // ── 5) portal render ──
    if (!containerRef.current) return null;
    return createPortal(
        <div
            {...props}
            ref={contentRef}
            className={classNames(styles.Content, props.className)}
            style={style}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
        </div>,
        containerRef.current
    );
};

export default Content;
