/** @jsxImportSource @emotion/react */
import {SerializedStyles} from "@emotion/react";
import React, {useEffect} from "react";
import {useAccordion} from "./Accordion";

type ButtonProps = {
    children?: React.ReactNode;
    onButtonClick?: (value: boolean) => void | boolean;
    defaultStyle?: SerializedStyles; // css를 선택적 속성으로 설정
};

const Button = ({children, defaultStyle, onButtonClick}: ButtonProps) => {
    const {accordionValue, toggleAccordion} = useAccordion();
    const handleButtonClick = () => {
        const result = onButtonClick && onButtonClick(accordionValue);
        if (result) {
            return;
        }
        toggleAccordion();
    };
    useEffect(() => {
        console.log("accordionValue", accordionValue);
    }, [accordionValue]);
    return (
        <button css={[defaultStyle]} onClick={handleButtonClick}>
            {children}
        </button>
    );
};

export default Button;
