import { useQuery } from '@tanstack/react-query';
import { SelectProps } from 'antd';
import React, { FC } from 'react';
import { productService } from '~shared/api';
import { MultipleSelection } from '~shared/uiKit';

interface ChangeBrandsProps {
    changeBrandsAction: (params: number[] | string[]) => void;
    defaultValues?: number[] | string[];
}
const ChangeBrands: FC<ChangeBrandsProps> = (props) => {
    const { defaultValues, changeBrandsAction } = props;

    const handleChange = (values: string[] | number[]) => {
        changeBrandsAction(values);
    };

    const { data: brands } = useQuery({
        queryKey: ['brands'],

        initialData: [],

        queryFn: async () => {
            const res = await productService.getBrands();
            return res;
        },
    });



    const options: SelectProps['options'] = [];

    brands?.forEach(({ name }) => {
        options.push({
            label: name,
            value: name,
        });
    });

    return (
        <MultipleSelection
            defaultValue={defaultValues}
            options={options}
            handleChange={handleChange}
            placeholder="Choose brands"
        />
    );
};

export default ChangeBrands;
