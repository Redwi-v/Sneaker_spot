import Head from 'next/head';
import React, { FC, PropsWithChildren } from 'react';

const getTitle = (title: string) => `${title} | SNEAKER SPOT 👟`;

export interface MetaProps {
    title: string;
    description?: string;
}
const Meta: FC<PropsWithChildren<MetaProps>> = (props) => {
    const { title, description, children } = props;
    return (
        <>
            <Head>
                <title>{getTitle(title)}</title>
                {description ? (
                    <>
                        <meta name="description" content={description}></meta>
                        <meta name="og:title" content={getTitle(title)}></meta>
                        <meta name="og:description" content={description}></meta>\
                        {/* <meta property="og:image" content="https://ia.media-imdb.com/images/rock.jpg" /> */}
                    </>
                ) : (
                    <meta name="robots" content="noindex, nofollow" />
                )}
            </Head>
            {children}
        </>
    );
};

export default Meta;
