import React, { FC } from 'react';
import styles from './menu.module.scss';
import { IMenuItem } from '~widgets/header/model/types';
import Link from 'next/link';

interface MenuProps {
    menuList: IMenuItem[];
}
const Menu: FC<MenuProps> = (props) => {
    const { menuList } = props;

    return (
        <ul className={styles.menuList}>
            {menuList &&
                menuList.map((menuItem) => {
                    return (
                        <li key={menuItem.path} className={styles.menuItem}>
                            <MenuItem menuItem={menuItem} />
                        </li>
                    );
                })}
        </ul>
    );
};

interface MenuItemProps {
    menuItem: IMenuItem;
}
const MenuItem: FC<MenuItemProps> = (props) => {
    const { menuItem } = props;
    return <Link href={menuItem.path}>{menuItem.name}</Link>;
};

export default Menu;
