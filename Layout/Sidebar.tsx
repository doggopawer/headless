/** @jsxImportSource @emotion/react */
import { useLayoutEffect, useRef } from 'react';
import { useLayout } from './Layout';
import { css, SerializedStyles } from '@emotion/react';

/* ---------------------------------------------------------------------------
   Layout.Sidebar 컴포넌트
   내부에 Sidebar 컴포넌트를 렌더링하고, 자신의 너비를 측정하여 context에 저장한다.
--------------------------------------------------------------------------- */
type SidebarWrapperProps = {
    children: React.ReactNode;
    defaultStyle: SerializedStyles;
};

const defaultSidebarStyle = css`
    position: fixed;
    top: 0;
    left: 0;
`;

const Sidebar = ({ children, defaultStyle }: SidebarWrapperProps) => {
    const { setSidebarWidth } = useLayout();
    const sidebarRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (sidebarRef.current) {
            setSidebarWidth(sidebarRef.current.getBoundingClientRect().width);
        }
    }, [setSidebarWidth, children]);

    return (
        <div css={[defaultSidebarStyle, defaultStyle]} ref={sidebarRef}>
            {children}
        </div>
    );
};

export default Sidebar;
