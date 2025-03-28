import React from 'react';
import { useModal } from './Modal';
import classNames from 'classnames';
import styles from './Modal.module.scss';

type BackdropProps = React.HTMLAttributes<HTMLDivElement>;

const Backdrop = (props: BackdropProps) => {
    const { modalValue } = useModal();

    const combinedStyle = classNames(styles.Backdrop, props.className);

    return <>{modalValue && <div {...props} className={combinedStyle} />}</>;
};

export default Backdrop;
