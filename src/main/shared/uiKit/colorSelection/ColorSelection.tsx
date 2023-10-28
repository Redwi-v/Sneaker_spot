import React, { useEffect } from 'react';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import { Select, Tag } from 'antd';
import { getTextColor } from '~shared/utils';

import styles from './colorSelect.module.scss';
import { useFiltersSelector } from '~entities/filters';
import { DefaultOptionType } from 'antd/es/select';

const { Option } = Select;

interface option {
    colorCode: string;
    colorName: string;
}

interface ColorSelectionProps {
    options: option[];
    placeholder: string;
    onChange: (colorName: string[]) => void;
}

const ColorSelection: React.FC<ColorSelectionProps> = (props) => {
    const { options, placeholder, onChange } = props;

    const { colors } = useFiltersSelector();

    const onChangeAction = (values: string[], changeOptions: DefaultOptionType | DefaultOptionType[]) => {
        onChange(values);
    };

    const getColorByName = (colorName: string) => {
        let res: string = '';
        options.forEach((option) => {
            if (option.colorName === colorName) {
                res = option.colorCode;
            }
        });

        return res;
    };

    const tagRender = (props: CustomTagProps) => {
        const { label, value, closable, onClose } = props;

        const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
            event.preventDefault();
            event.stopPropagation();
        };

        const colorCode = getColorByName(value);

        return (
            <Tag
                color={value}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginRight: 3, marginBottom: 3, background: colorCode, color: getTextColor(colorCode) }}
                className={styles.tag}
            >
                <span>{value}</span>
            </Tag>
        );
    };

    return (
        <Select
            placeholder={placeholder}
            mode="multiple"
            tagRender={tagRender}
            style={{ width: '100%' }}
            onChange={onChangeAction}
            dropdownRender={(menu) => {
                return menu;
            }}
            value={colors || []}
        >
            {options.map((option) => {
                return (
                    <Option key={option.colorName}>
                        <div className={styles.optionWrapper}>
                            <span
                                className={styles.optionColor}
                                style={{
                                    backgroundColor: option.colorCode,
                                }}
                            ></span>
                            <span>{option.colorName}</span>
                        </div>
                    </Option>
                );
            })}
        </Select>
    );
};

export default ColorSelection;
