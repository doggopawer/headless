// ToastProvider.js
import { createContext, useContext, useEffect, useState, ReactNode, HTMLAttributes } from 'react';

type ToastProviderContextType = {
    message: string;
    type: 'success' | 'error';
    toastValue: boolean;
    showToast: (message: string, type: 'success' | 'error') => void;
};

const ToastProviderContext = createContext<ToastProviderContextType>({
    message: '',
    toastValue: false,
    type: 'success',

    showToast: () => {}, // 기본값
});

type ToastProviderProps = {
    children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const ToastProvider = ({ children, ...props }: ToastProviderProps) => {
    const [message, setMessage] = useState('');
    const [type, setType] = useState<'success' | 'error'>('success');
    const [toastValue, setToastValue] = useState(false);

    const showToast = (message: string, type: 'success' | 'error') => {
        setMessage(message);
        setType(type);
        setToastValue(true);
    };

    useEffect(() => {
        if (toastValue) {
            const timeout = setTimeout(() => {
                setToastValue(false);
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [toastValue]);

    return (
        <ToastProviderContext.Provider value={{ showToast, toastValue, message, type }}>
            {children}
        </ToastProviderContext.Provider>
    );
};

export const useToastProvider = () => {
    return useContext(ToastProviderContext);
};

export default ToastProvider;
