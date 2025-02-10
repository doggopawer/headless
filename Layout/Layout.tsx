/** @jsxImportSource @emotion/react */
import React, { createContext, useContext, useState, FC, useRef, useLayoutEffect } from 'react';
import { css, Theme } from '@emotion/react';
import Sidebar from './Sidebar';
import Header from './Header';
import Content from './Main';
import Main from './Main';

/* ---------------------------------------------------------------------------
   Layout Context 정의
   Header의 높이와 Sidebar의 너비를 저장하고 업데이트할 수 있도록 한다.
--------------------------------------------------------------------------- */
type LayoutContextType = {
    headerHeight: number;
    setHeaderHeight: (height: number) => void;
    sidebarWidth: number;
    setSidebarWidth: (width: number) => void;
};

const LayoutContext = createContext<LayoutContextType>({
    headerHeight: 0,
    setHeaderHeight: () => {},
    sidebarWidth: 0,
    setSidebarWidth: () => {},
});

export const useLayout = () => useContext(LayoutContext);

/* ---------------------------------------------------------------------------
   Layout 컴포넌트
   Header, Sidebar, Content 등의 하위 컴포넌트를 감싸고 context를 제공한다.
--------------------------------------------------------------------------- */
type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const [headerHeight, setHeaderHeight] = useState(0);
    const [sidebarWidth, setSidebarWidth] = useState(0);

    const layoutStyle = (theme: Theme) => css`
        position: relative;
        width: 100%;
    `;

    return (
        <LayoutContext.Provider value={{ headerHeight, setHeaderHeight, sidebarWidth, setSidebarWidth }}>
            <div css={layoutStyle}>{children}</div>
        </LayoutContext.Provider>
    );
};

/* ---------------------------------------------------------------------------
   Layout의 하위 컴포넌트 할당
--------------------------------------------------------------------------- */
Layout.Header = Header;
Layout.Sidebar = Sidebar;
Layout.Main = Main;

export default Layout;
