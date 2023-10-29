import { InputNumber } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { useFiltersSelector } from '~entities/filters';
import { DoubleSlider } from '~shared/uiKit';

import styles from './changePrice.module.scss';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

type Inputs = {
    min: string;
    max: string;
};

interface ChangePriceProps {
    onChangeAction: (value: number[]) => void;
}
const ChangePrice: FC<ChangePriceProps> = (props) => {
    const { onChangeAction } = props;
    const { price } = useFiltersSelector();

    const minValue = 1;
    const maxValue = 2000;

    const [min, setMin] = useState<number>(price ? price[0] : minValue);
    const [max, setMax] = useState<number>(price ? price[1] : maxValue);
    const [rangeValue, setRangeValue] = useState<number[]>([min, max]);
    const router = useRouter();

    const changeMin = (value: number | null) => {
        if (!value) return;
        setMin(value > minValue ? value : minValue);
    };

    const changeMax = (value: number | null) => {
        if (!value) return;
        setMax(value < maxValue ? value : maxValue);
    };

    useEffect(() => {
        setMin(price ? price[0] : minValue);
        setMax(price ? price[1] : maxValue);

        if (price) {
            const newRangeValue = [price[0], price[1]];
            setRangeValue(newRangeValue);
        }
    }, [price]);

    const blurInput = () => {
        onChangeAction([min, max]);
        setRangeValue([min, max]);
    };

    return (
        <>
            <DoubleSlider
                onChangeValue={setRangeValue}
                value={rangeValue}
                max={maxValue}
                min={minValue}
                onChangeAction={onChangeAction}
            />
            <div className={styles.bottom}>
                <InputNumber
                    onBlur={blurInput}
                    className={styles.input}
                    onChange={changeMin}
                    placeholder="Basic usage"
                    value={min}
                />
                <InputNumber
                    onBlur={blurInput}
                    className={styles.input}
                    onChange={changeMax}
                    placeholder="Basic usage"
                    value={max}
                />
            </div>
        </>
    );
};

export default ChangePrice;
