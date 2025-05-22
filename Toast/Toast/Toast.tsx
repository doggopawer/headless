import React, { HTMLAttributes } from 'react';
import styles from './Toast.module.scss';
import classNames from 'classnames';
import { useToastProvider } from '../ToastProvider';

type ToastProviderProps = {} & HTMLAttributes<HTMLDivElement>;

const Toast = (props: ToastProviderProps) => {
    const { toastValue, message } = useToastProvider();

    const className = classNames(styles.Toast, props.className, {
        [styles.Open]: toastValue,
        [styles.Closed]: !toastValue,
    });

    return (
        <div {...props} className={className}>
            {message}
        </div>
    );
};

export default Toast;
