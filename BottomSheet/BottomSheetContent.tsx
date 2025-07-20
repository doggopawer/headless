import React, {HTMLAttributes, useEffect, useRef, useState} from "react";
import {useBottomSheet} from "./BottomSheet";
import styles from "./BottomSheet.module.scss";
import classNames from "classnames";

type BottomSheetContentProps = {
    children: React.ReactNode;
} & HTMLAttributes<HTMLInputElement>;

const BottomSheetContent = ({children, ...props}: BottomSheetContentProps) => {
    const {isOpen, close} = useBottomSheet();
    const sheetRef = useRef<HTMLDivElement>(null);
    const [y, setY] = useState(100);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            requestAnimationFrame(() => setY(0)); // 자연스럽게 올라오기
        } else {
            setIsAnimating(true);
            setY(100); // 자연스럽게 내려가기
        }
    }, [isOpen]);

    const handleTransitionEnd = () => {
        setIsAnimating(false);
    };

    useEffect(() => {
        const sheet = sheetRef.current;
        if (!sheet) return;

        let startY = 0;
        let currentY = 0;

        const onTouchStart = (e: TouchEvent) => {
            setIsAnimating(false);
            startY = e.touches[0].clientY;
        };

        const onTouchMove = (e: TouchEvent) => {
            currentY = e.touches[0].clientY - startY;
            if (currentY > 0) {
                const percent = Math.min(
                    (currentY / window.innerHeight) * 100,
                    100,
                );
                setY(percent);
            }
        };

        const onTouchEnd = () => {
            if (currentY > 100) {
                setIsAnimating(true);
                setY(100);
                setTimeout(() => close(), 300);
            } else {
                setIsAnimating(true);
                setY(0);
            }
            currentY = 0;
        };

        sheet.addEventListener("touchstart", onTouchStart);
        sheet.addEventListener("touchmove", onTouchMove);
        sheet.addEventListener("touchend", onTouchEnd);

        return () => {
            sheet.removeEventListener("touchstart", onTouchStart);
            sheet.removeEventListener("touchmove", onTouchMove);
            sheet.removeEventListener("touchend", onTouchEnd);
        };
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    return (
        <div
            {...props}
            ref={sheetRef}
            className={classNames(styles.bottomSheet, props.className)}
            style={{
                transform: `translateY(${y}%)`,
                transition: isAnimating ? "transform 0.3s ease-out" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
        >
            <div className={styles.handle} />
            <div className={styles.contentBody}>{children}</div>
        </div>
    );
};

export default BottomSheetContent;
