import React, {createContext, useContext, useRef, useState} from "react";
import styles from "./BottomSheet.module.scss";
import BottomSheetTrigger from "./BottomSheetTrigger";
import BottomSheetContent from "./BottomSheetContent";
import BottomSheetBackdrop from "./BottomSheetBackdrop";

const BottomSheetContext = createContext<{
    isOpen: boolean;
    open: () => void;
    close: () => void;
} | null>(null);

export const useBottomSheet = () => {
    const ctx = useContext(BottomSheetContext);
    if (!ctx)
        throw new Error("BottomSheet component 밖에서 사용할 수 없습니다.");
    return ctx;
};

const BottomSheet = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    return (
        <BottomSheetContext.Provider value={{isOpen, open, close}}>
            {children}
        </BottomSheetContext.Provider>
    );
};

export default BottomSheet;

BottomSheet.Trigger = BottomSheetTrigger;
BottomSheet.Content = BottomSheetContent;
BottomSheet.Backdrop = BottomSheetBackdrop;
