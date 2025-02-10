/** @jsxImportSource @emotion/react */
import { css, SerializedStyles, Theme } from '@emotion/react';
import { useLayout } from './Layout';

/* ---------------------------------------------------------------------------
   Layout.Main 컴포넌트
   측정된 Header의 높이와 Sidebar의 너비를 margin으로 적용하여 콘텐츠가
   겹치지 않고 올바르게 배치되도록 한다.
--------------------------------------------------------------------------- */
type MainProps = {
    children: React.ReactNode;
    defaultStyle?: SerializedStyles;
};

const Main = ({ children, defaultStyle }: MainProps) => {
    const { headerHeight, sidebarWidth } = useLayout();

    const mainStyle = (theme: Theme) => css`
        /* Sidebar 너비만큼 왼쪽 여백, Header 높이만큼 위쪽 여백 */
        margin-left: ${sidebarWidth}px;
        margin-top: ${headerHeight}px;
        /* Sidebar 너비를 제외한 너비를 사용 */
        width: calc(100% - ${sidebarWidth}px);
    `;

    return <main css={[mainStyle, defaultStyle]}>{children}</main>;
};

export default Main;
