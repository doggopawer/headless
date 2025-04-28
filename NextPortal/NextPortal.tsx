'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type NextPortalProps = {
    children: React.ReactNode;
};

export default function NextPortal({ children }: NextPortalProps) {
    // mountNode 상태로 포탈 루트가 준비되었는지 관리
    const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
    // portalElement는 렌더러 간에 동일한 div를 유지
    const portalElementRef = useRef<HTMLElement>(document.createElement('div'));

    useEffect(() => {
        // 클라이언트 사이드에서만 실행
        const root = document.getElementById('root');
        if (!root) return;

        // portalElement를 DOM에 추가
        root.appendChild(portalElementRef.current);
        // mountNode를 설정해서 리렌더링 트리거
        setMountNode(root);

        return () => {
            // 언마운트 시 cleanup
            root.removeChild(portalElementRef.current);
        };
    }, []);

    // mountNode 준비 전까지는 null 반환
    if (!mountNode) return null;

    // 준비된 portalElement에 children을 렌더
    return createPortal(children, portalElementRef.current);
}
