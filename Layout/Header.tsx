/** @jsxImportSource @emotion/react */
import { useLayoutEffect, useRef } from 'react';
import { useLayout } from './Layout';
import { css, SerializedStyles } from '@emotion/react';

/* ---------------------------------------------------------------------------
   Layout.Header 컴포넌트
   내부에 Header 컴포넌트를 렌더링하고, 자신의 높이를 측정하여 context에 저장한다.
--------------------------------------------------------------------------- */
type HeaderProps = {
    children?: React.ReactNode;
    defaultStyle?: SerializedStyles;
};

const Header = ({ children, defaultStyle }: HeaderProps) => {
    const { setHeaderHeight, sidebarWidth } = useLayout();
    const headerRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (headerRef.current) {
            setHeaderHeight(headerRef.current.getBoundingClientRect().height);
        }
    }, [setHeaderHeight, children]);

    const headerStyle = () => css`
        position: fixed;
        top: 0;
        left: ${sidebarWidth}px;
        width: calc(100% - ${sidebarWidth}px);
        z-index: 1000;
    `;

    return (
        <header css={[headerStyle, defaultStyle]} ref={headerRef}>
            {children}
        </header>
    );
};

export default Header;
