import React, {useRef, useState, useLayoutEffect} from "react";
import {useDropdown} from "./Dropdown";
import classNames from "classnames";
import styles from "./Dropdown.module.scss";

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const Content = ({children, ...props}: ContentProps) => {
    const {dropdownValue, closeDropdown} = useDropdown();
    const containerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useLayoutEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                closeDropdown();
            }
        };

        if (dropdownValue) {
            document.addEventListener("mousedown", handleClickOutside);
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

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownValue, closeDropdown]);

    const combinedStyle = classNames(
        props.className, // 외부에서 전달받은 클래스
        styles.Content,
        {
            [styles.Open]: dropdownValue, // dropdownValue가 true일 때 Open 클래스 적용
            [styles.Closed]: !dropdownValue, // dropdownValue가 false일 때 Closed 클래스 적용
        },
    );

    return (
        <div
            ref={containerRef}
            {...props}
            style={{
                transform: offset ? `translateX(-${offset}px)` : undefined,
                ...props.style,
            }}
            className={combinedStyle}
        >
            {children}
        </div>
    );
};

export default Content;
