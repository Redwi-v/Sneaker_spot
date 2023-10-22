import { FC, Key } from 'react';
import { Select } from 'antd';
import styles from './selection.module.scss';

const { Option } = Select;

interface ISelectOption {
    name: string;
    key: Key;
}

interface SelectionProps {
    options: ISelectOption[];
    defaultValue: string;
    handleChange: (value: string) => void;
}

const Selection: FC<SelectionProps> = (props) => {
    const { options, defaultValue, handleChange } = props;

    return (
        <Select
            defaultValue={defaultValue}
            onChange={handleChange}
            popupClassName={styles.poopup}
            className={styles.select}
            rootClassName={styles.select_btn}
            dropdownStyle={{
                fontSize: '40px',
            }}
            dropdownRender={(menu) => {
                return menu;
            }}
        >
            {options.map((option) => {
                return (
                    <Option key={option.key}>
                        <span className={styles.option}>{option.name}</span>
                    </Option>
                );
            })}
        </Select>
    );
};

export default Selection;
