import Link from 'next/link';

import React, { FC } from 'react';
import Image from 'next/image';

interface LogoProps {}
const Logo: FC<LogoProps> = (props) => {
    const {} = props;
    return (
        <Link href={'/'}>
            <Image src={'/logo.png'} alt="Sneaker Spot" width={150} height={61} />
        </Link>
    );
};

export default Logo;
