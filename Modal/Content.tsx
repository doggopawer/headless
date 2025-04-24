import React, { useRef, useEffect } from 'react';
import { useModal } from './Modal';
import classNames from 'classnames';
import styles from './Modal.module.scss';

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

// const baseStyle: React.CSSProperties = {
//     display: "flex",
//     position: "fixed",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     zIndex: 200,
// };

const Content = ({ children, style, ...props }: ContentProps) => {
    const { modalValue, closeModal } = useModal();
    const containerRef = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         event.stopPropagation();
    //         if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
    //             closeModal();
    //         }
    //     };

    //     if (modalValue) {
    //         document.addEventListener('mousedown', handleClickOutside);
    //     }

    //     return () => {
    //         document.removeEventListener('mousedown', handleClickOutside);
    //     };
    // }, [modalValue, closeModal]);

    const combinedStyle = classNames(props.className, styles.Content, {
        [styles.Open]: modalValue, // dropdownValue가 true일 때 Open 클래스 적용
        [styles.Closed]: !modalValue, // dropdownValue가 false일 때 Closed 클래스 적용
    });

    return (
        <>
            <div ref={containerRef} {...props} className={combinedStyle} style={{ ...style }}>
                {children}
            </div>
        </>
    );
};

export default Content;
