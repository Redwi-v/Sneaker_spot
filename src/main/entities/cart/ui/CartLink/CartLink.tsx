import Link from 'next/link';
import React, { FC } from 'react';

interface CartLinkProps {}
const CartLink: FC<CartLinkProps> = (props) => {
    return (
        <Link href={'/Cart'}>
            <span>cart </span>
        </Link>
    );
};

export default CartLink;
