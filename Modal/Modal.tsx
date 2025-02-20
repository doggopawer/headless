import React, { createContext, useContext, useState, useEffect } from 'react';
import Trigger from './Trigger';
import Backdrop from './Backdrop';
import Close from './Close';
import Content from './Content';

type ModalContextType = {
    modalValue: boolean;
    openModal: () => void;
    closeModal: () => void;
};

const ModalContext = createContext<ModalContextType>({
    modalValue: false,
    openModal: () => {},
    closeModal: () => {},
});

type ModalProps = {
    children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
    const [modalValue, setModalValue] = useState(false);

    const openModal = () => {
        setModalValue(true);
    };

    const closeModal = () => {
        setModalValue(false);
    };

    useEffect(() => {
        if (modalValue) {
            // 모달이 열릴 때 배경 스크롤 방지
            document.body.style.overflow = 'hidden';
        } else {
            // 모달이 닫힐 때 배경 스크롤 허용
            document.body.style.overflow = '';
        }

        // 컴포넌트 언마운트 시 배경 스크롤 허용
        return () => {
            document.body.style.overflow = '';
        };
    }, [modalValue]);

    return <ModalContext.Provider value={{ modalValue, openModal, closeModal }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
    return useContext(ModalContext);
};

export default Modal;

Modal.Trigger = Trigger;
Modal.Backdrop = Backdrop;
Modal.Close = Close;
Modal.Content = Content;
