import React, { useRef, useState, useLayoutEffect } from 'react';
import classNames from 'classnames';
import styles from './Tooltip.module.scss';
import { useTooltip } from './Tooltip';

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    placement?: string;
};

const Content = ({ children, ...props }: ContentProps) => {
    const { tooltipValue } = useTooltip();
    const containerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useLayoutEffect(() => {
        if (tooltipValue) {
            // 위치 보정 로직
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                const overflow = rect.right - window.innerWidth;
                if (overflow > 0) {
                    setOffset(rect.width);
                } else {
                    setOffset(0);
                }
            }
        } else {
            setOffset(0);
        }
    }, [tooltipValue]);

    const combinedStyle = classNames(
        props.className, // 외부에서 전달받은 클래스
        styles.Content,
        {
            [styles.Open]: tooltipValue,
            [styles.Closed]: !tooltipValue,
        }
    );

    return (
        <div
            ref={containerRef}
            {...props}
            style={{ transform: offset ? `translateX(-${offset}px)` : undefined }}
            className={combinedStyle}
        >
            {children}
        </div>
    );
};

export default Content;
