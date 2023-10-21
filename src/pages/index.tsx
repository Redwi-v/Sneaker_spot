import { NextPage } from 'next';
import { useEffect } from 'react';

import Home from '~screens/home';
import { DefaultLayout } from '~widgets/layouts';

const HomePage: NextPage = () => {
    useEffect(() => {
        console.log('hello');
    }, []);

    return (
        <DefaultLayout title="Home" description="original sneakers from the USA with fast and accurate delivery">
            <Home />
        </DefaultLayout>
    );
};

export default HomePage;
