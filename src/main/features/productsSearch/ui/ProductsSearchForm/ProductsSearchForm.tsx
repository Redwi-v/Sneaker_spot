import styles from './productsSearchForm.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';

import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import { useFilters, useFiltersSelector } from '~entities/filters';

interface ISearchInput {
    searchInput: string;
}

export interface ProductsSearchFormProps {}

const ProductsSearchForm: FC<ProductsSearchFormProps> = (props) => {
    const {} = props;
    const { setTerm } = useFilters();

    const { term } = useFiltersSelector();

    const { register, handleSubmit, getValues, setValue } = useForm<ISearchInput>({});

    useEffect(() => {
        if (getValues('searchInput')) return;
        setValue('searchInput', term || '');
    }, [term]);

    const [fucus, setFocus] = React.useState(false);

    const submitSearch: SubmitHandler<ISearchInput> = (data) => {
        setTerm(data.searchInput);
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
