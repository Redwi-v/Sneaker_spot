import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

interface MultipleSelectionProps {
    handleChange: (value: number[]) => void;
    options: SelectProps['options'];
    placeholder?: string;
    defaultValue?: number[];
}

const MultipleSelection: React.FC<MultipleSelectionProps> = (props) => {
    const { handleChange, options, placeholder, defaultValue } = props;

    return (
        <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder={placeholder || 'Please select'}
            defaultValue={defaultValue}
            value={defaultValue}
            onChange={handleChange}
            options={options}
        />
    );
};

export default MultipleSelection;
