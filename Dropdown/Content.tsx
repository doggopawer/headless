import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { useDropdown } from './Dropdown';

type ContentProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const Content = ({ children, ...props }: ContentProps) => {
    const { dropdownValue, closeDropdown } = useDropdown();
    const containerRef = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useLayoutEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        if (dropdownValue) {
            document.addEventListener('mousedown', handleClickOutside);
            // 위치 보정 로직
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect) {
                const overflow = rect.right - window.innerWidth;
                console.log(rect.right, window.innerWidth);
                console.log('overflow: ' + overflow);
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
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownValue, closeDropdown]);

    return (
        <>
            {dropdownValue && (
                <div
                    ref={containerRef}
                    {...props}
                    style={{ transform: offset ? `translateX(-${offset}px)` : undefined }}
                >
                    {children}
                </div>
            )}
        </>
    );
};

export default Content;
