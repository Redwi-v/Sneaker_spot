import { SelectProps } from 'antd';
import React, { FC } from 'react';
import { MultipleSelection } from '~shared/uiKit';

const options: SelectProps['options'] = [];

for (let i = 35; i < 49; i++) {
    options.push({
        label: i,
        value: i,
    });
}

interface ChangeSizesProps {
    changeSizesAction: (params: number[] | string[]) => void;
    defaultValues?: number[] | string[];
}
const ChangeSizes: FC<ChangeSizesProps> = (props) => {
    const { defaultValues, changeSizesAction } = props;

    const handleChange = (values: number[] | string[]) => {
        changeSizesAction(values);
    };

    return (
        <MultipleSelection defaultValue={defaultValues} options={options} handleChange={handleChange} placeholder="Choose size" />
    );
};

export default ChangeSizes;
