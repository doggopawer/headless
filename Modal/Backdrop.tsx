import React from 'react';
import { useModal } from './Modal';
import classNames from 'classnames';
import styles from './Modal.module.scss';

type BackdropProps = React.HTMLAttributes<HTMLDivElement>;

const Backdrop = (props: BackdropProps) => {
    const { modalValue } = useModal();

    const combinedStyle = classNames(props.className, styles.Backdrop, {
        [styles.Open]: modalValue, // dropdownValue가 true일 때 Open 클래스 적용
        [styles.Closed]: !modalValue, // dropdownValue가 false일 때 Closed 클래스 적용
    });

    return <div {...props} className={combinedStyle} />;
};

export default Backdrop;
