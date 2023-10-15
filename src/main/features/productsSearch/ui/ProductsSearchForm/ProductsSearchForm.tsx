import styles from './productsSearchForm.module.scss';
import { useForm, SubmitHandler } from 'react-hook-form';

import React, { FC } from 'react';
import Image from 'next/image';

interface ISearchInput {
    searchInput: string;
}

export interface ProductsSearchFormProps {}

const ProductsSearchForm: FC<ProductsSearchFormProps> = (props) => {
    const {} = props;

    const { register, handleSubmit } = useForm<ISearchInput>();
    const [fucus, setFocus] = React.useState(false);

    const submitSearch: SubmitHandler<ISearchInput> = (data) => {
        console.log(data);
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

export default ProductsSearchForm;
