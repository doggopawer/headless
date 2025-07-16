// Content.tsx
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import styles from './Dropdown.module.scss';
import { useDropdown } from './Dropdown';

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    offset?: number; // 트리거와의 거리(px), 기본 4
};

const Content: React.FC<ContentProps> = ({ children, offset = 4, ...props }) => {
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
        const handler = () => closeDropdown();
        // capture 단계로 걸어야 스크롤 직후에도 바로 닫힙니다
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

        // trigger 위치 측정
        const rect = anchorEl.getBoundingClientRect();
        const w = menuEl.offsetWidth;
        const h = menuEl.offsetHeight;
        const vw = document.documentElement.clientWidth;
        const vh = document.documentElement.clientHeight;

        // 기본: trigger 바로 아래, 왼쪽 정렬
        let top = rect.bottom + window.scrollY + offset;
        let left = rect.left + window.scrollX;

        // 우측 화면 넘침 방지
        if (left + w > vw) left = vw - w - offset;
        if (left < 0) left = offset;

        // 아래 화면 넘침 시 trigger 위로
        if (top + h > vh) top = rect.top + window.scrollY - h - offset;

        setStyle({
            position: 'absolute',
            top,
            left,
            zIndex: 1000,
            visibility: 'visible',
            pointerEvents: 'auto',
        });
    }, [dropdownValue, offset, anchorRef]);

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
            style={style}
            onMouseDown={(e) => e.stopPropagation()} // 외부 클릭 방지
        >
            {children}
        </div>,
        portalRoot.current
    );
};

export default Content;
