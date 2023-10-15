import styles from './productsSearchForm.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';

import React, { ChangeEvent, FC } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';

interface ISearchInput {
    searchInput: string;
}

export interface ProductsSearchFormProps {}

const ProductsSearchForm: FC<ProductsSearchFormProps> = (props) => {
    const {} = props;

    const { register, handleSubmit } = useForm<ISearchInput>();
    const [fucus, setFocus] = React.useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // now you got a read/write object
    const current = new URLSearchParams(Array.from(searchParams.entries())); // -> has to use this form

    // update as necessary

    const submitSearch: SubmitHandler<ISearchInput> = (data) => {
        current.set('selected', data.searchInput);

        // cast to string
        const search = current.toString();
        // or const query = `${'?'.repeat(search.length && 1)}${search}`;
        const query = search ? `?${search}` : '';

        router.push(`${pathname}${query}`);
    };

    const onBlurHandler = () => {
        setFocus(false);
    };
    const onFocusHandler = () => {
        setFocus(true);
    };

    return (
        <form onSubmit={handleSubmit(submitSearch)} className={`${styles.form} ${fucus ? styles.focus : ''}`}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    className={styles.input}
                    {...register('searchInput')}
                    onBlur={onBlurHandler}
                    onFocus={onFocusHandler}
                    placeholder="Search 🔎"
                />
            </div>
            <button className={styles.button}>
                <Image src={'/images/icons/search.png'} alt="search icon" width={20} height={20} />
            </button>
        </form>
    );
};

const useDropDown = (value: string) => {};
export default ProductsSearchForm;
