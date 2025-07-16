import React from "react";
import {useBottomSheet} from "./BottomSheet";
import styles from "./BottomSheet.module.scss";

const BottomSheetBackdrop = () => {
    const {isOpen, close} = useBottomSheet();
    if (!isOpen) return null;

    return <div className={styles.backdrop} onClick={close} />;
};

export default BottomSheetBackdrop;
