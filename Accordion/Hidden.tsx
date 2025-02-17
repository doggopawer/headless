/** @jsxImportSource @emotion/react */
import {css, SerializedStyles} from "@emotion/react";
import React, {useEffect, useRef, useState} from "react";
import {useAccordion} from "./Accordion";

type HiddenProps = {
    children: React.ReactNode;
    defalutStyle?: SerializedStyles;
};

const Hidden = ({children, defalutStyle}: HiddenProps) => {
    const {accordionValue} = useAccordion();

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            // 모든 자식 요소의 높이를 합산
            const totalHeight = Array.from(
                containerRef.current.children,
            ).reduce((acc, child) => {
                return acc + (child as HTMLElement).offsetHeight;
            }, 0);

            const newHeight = accordionValue ? totalHeight : 0;
            setHeight(newHeight);
        }
    }, [accordionValue, children]); // children도 의존성 배열에 포함

    const hiddenStyle = css`
        height: ${height}px;
        overflow: hidden;
    `;

    return (
        <>
            {
                <div ref={containerRef} css={[hiddenStyle, defalutStyle]}>
                    {children}
                </div>
            }
        </>
    );
};

export default Hidden;
