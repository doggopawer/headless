import React from "react";
import {useBottomSheet} from "./BottomSheet";

const BottomSheetTrigger = ({children}: {children: React.ReactNode}) => {
    const {open} = useBottomSheet();
    return <button onClick={open}>{children}</button>;
};

export default BottomSheetTrigger;
