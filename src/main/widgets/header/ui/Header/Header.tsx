import { CartLink } from '~entities/cart';
import { ProductsSearchForm } from '~features/productsSearch';

import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';

import styles from './header.module.scss';

import React, { FC } from 'react';
import { MENU_LIST } from '~widgets/header/model/constants';
import { useCartSelector } from '~entities/cart/model/cart.slice';
import { ProductsSearchFormProps } from '~features/productsSearch/ui/ProductsSearchForm/ProductsSearchForm';

interface HeaderProps {}

const Header: FC<HeaderProps> = (props) => {
    const {} = props;
    const { allPrice } = useCartSelector();

    return (
        <div className={styles.header}>
            <div className={styles.headerLogo}>
                <Logo />
            </div>
            <div className={styles.headerMenu}>
                <Menu menuList={MENU_LIST} />
            </div>
            <div className={styles.headerSearch}>
                <ProductsSearchForm />
            </div>
            <div className={styles.headerCart}>
                <CartLink />
                {allPrice}
            </div>
        </div>
    );
};

export default Header;
