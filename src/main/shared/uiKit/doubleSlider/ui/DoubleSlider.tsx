import React, { useState, FC } from 'react';
import { Slider } from 'antd';

interface doubleSliderProps {
    value: number[];
    onChangeAction: (value: number[]) => void;
    onChangeValue: (value: number[]) => void;
    max: number;
    min: number;
}

const DoubleSlider: FC<doubleSliderProps> = (props) => {
    const { value, onChangeValue, onChangeAction, max, min } = props;

    const onChange = (value: number[]) => {
        onChangeAction(value);
    };

    return (
        <>
            <Slider
                value={value}
                onChange={onChangeValue}
                range
                defaultValue={value}
                max={max}
                min={min}
                onAfterChange={onChange}
            />
        </>
    );
};

export default DoubleSlider;
