// Content.tsx
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';
import { useDropdown } from './Dropdown';

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    offset?: number; // 트리거와의 거리(px), 기본 4
    full?: boolean;
};

const Content: React.FC<ContentProps> = ({ children, offset = 4, full, ...props }) => {
    const { dropdownValue, closeDropdown, anchorRef } = useDropdown();

    // 1) portal 컨테이너: mount 시 단 한 번 append / unmount 시 제거
    const portalRoot = useRef<HTMLDivElement | null>(null);
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
            zIndex: '1009',
        });
        document.body.appendChild(el);
        portalRoot.current = el;
        return () => {
            if (portalRoot.current) document.body.removeChild(portalRoot.current);
            portalRoot.current = null;
        };
    }, []);

    // 2) 스크롤 시 드롭다운 닫기
    useEffect(() => {
        if (!dropdownValue) return;
        const handler = (e: Event) => {
            const menuEl = menuRef.current;
            if (menuEl && e.target instanceof Node && menuEl.contains(e.target)) {
                // 메뉴 내부 스크롤이면 무시
                return;
            }
            closeDropdown();
        };

        window.addEventListener('scroll', handler, true);
        return () => {
            window.removeEventListener('scroll', handler, true);
        };
    }, [dropdownValue, closeDropdown]);

    // 3) 메뉴 엘리먼트 측정용 ref
    const menuRef = useRef<HTMLDivElement>(null);

    // 4) 스타일 상태: 위치 + visibility
    const [style, setStyle] = useState<React.CSSProperties>({
        position: 'absolute',
        visibility: 'hidden',
        pointerEvents: 'auto',
    });

    // 5) 열린/닫힘 시 위치 재계산
    useLayoutEffect(() => {
        const rootEl = portalRoot.current;
        const anchorEl = anchorRef.current;
        const menuEl = menuRef.current;
        if (!rootEl || !anchorEl || !menuEl) return;

        if (!dropdownValue) {
            setStyle((s) => ({ ...s, visibility: 'hidden' }));
            return;
        }

        const rect = anchorEl.getBoundingClientRect();
        const w = menuEl.offsetWidth;
        const h = menuEl.offsetHeight;
        const vw = document.documentElement.clientWidth;
        const vh = document.documentElement.clientHeight;

        let top = rect.bottom + offset;
        let left = rect.left;

        if (left + w > vw) left = vw - w - offset;
        if (left < 0) left = offset;
        if (top + h > vh) top = rect.top - h - offset;

        setStyle({
            position: 'fixed',
            top,
            left,
            width: full ? rect.width : 'auto',
            zIndex: 1000,
            visibility: 'visible',
            pointerEvents: 'auto',
        });
    }, [dropdownValue, offset, anchorRef, full]);

    // 2-1) 외부 클릭 시 닫기
    useEffect(() => {
        if (!dropdownValue) return;

        const handleClickOutside = (e: MouseEvent) => {
            const anchorEl = anchorRef.current;
            const menuEl = menuRef.current;
            if (!anchorEl || !menuEl) return;

            // 클릭이 anchor나 menu 바깥인 경우만 close
            if (!anchorEl.contains(e.target as Node) && !menuEl.contains(e.target as Node)) {
                closeDropdown();
            }
        };

        window.addEventListener('mousedown', handleClickOutside);
        return () => {
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownValue, closeDropdown, anchorRef]);

    // 6) portal render
    if (!portalRoot.current) return null;
    return createPortal(
        <div
            {...props}
            ref={menuRef}
            className={classNames(styles.Content, props.className, {
                [styles.Open]: dropdownValue,
                [styles.Closed]: !dropdownValue,
            })}
            style={{ ...style }}
            onMouseDown={(e) => e.stopPropagation()} // 외부 클릭 방지
        >
            {children}
        </div>,
        portalRoot.current
    );
};

export default Content;
