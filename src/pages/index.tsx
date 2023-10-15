import { NextPage } from 'next';
import Home from '~screens/home';
import { DefaultLayout } from '~widgets/layouts';

const HomePage: NextPage = () => {
    return (
        <DefaultLayout title="Home" description="original sneakers from the USA with fast and accurate delivery">
            <Home />
        </DefaultLayout>
    );
};

export default HomePage;
