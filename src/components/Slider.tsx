import { FC } from 'react';
import {Slider} from "@nextui-org/slider";

interface SliderProps {
    label: string;
    options: string[];
    onValueChange: (value: number) => void;
}

const CustomSlider: FC<SliderProps> = ({ label, options, onValueChange, value, marks, step=7 , defaultValue=7, maxValue, minValue}) => {

    return (
        <Slider
            label={label}
            step={step}
            marks={marks}
            defaultValue={defaultValue}
            className="max-w-md"
            color={'secondary'}
            step={step}
            maxValue={maxValue}
            minValue={minValue}
            onChange={onValueChange}
        />
    );
};

export default CustomSlider;
