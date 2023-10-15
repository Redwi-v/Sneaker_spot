import React, { FC, PropsWithChildren } from 'react';
import { Header } from '~widgets/header';
import styles from './defaultLayout.module.scss';
import { Meta } from '~entities/seo';
import { MetaProps } from '~entities/seo/ui/Meta';

const DefaultLayout: FC<PropsWithChildren<MetaProps>> = (props) => {
    const { children, title, description } = props;
    return (
        <Meta title={title} description={description}>
            <div className={styles.layout}>
                <Header />
                <main>{children}</main>
            </div>
        </Meta>
    );
};

export default DefaultLayout;
