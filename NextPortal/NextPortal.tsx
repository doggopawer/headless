import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type NextPortalProps = {
    children: React.ReactNode;
};

export default function NextPortal({ children }: NextPortalProps) {
    // 포탈 마운트 준비 여부 관리
    const [isReady, setIsReady] = useState(false);
    // portalElement는 클라이언트에서만 생성
    const portalElementRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const root = document.getElementById('root');
        if (!root) return;

        // 클라이언트에서만 실행: portal 엘리먼트 생성
        const el = document.createElement('div');
        portalElementRef.current = el;
        root.appendChild(el);

        // 준비 완료 상태로 전환
        setIsReady(true);

        return () => {
            // 언마운트 시 정리
            if (portalElementRef.current) {
                root.removeChild(portalElementRef.current);
            }
        };
    }, []);

    // 포탈이 준비되지 않은 경우 렌더링 방지
    if (!isReady || !portalElementRef.current) {
        return null;
    }

    // 포탈에 자식 컴포넌트 렌더
    return createPortal(children, portalElementRef.current);
}
