import { useQuery } from '@tanstack/react-query';
import React, { FC } from 'react';
import { useFilters } from '~entities/filters';
import { productService } from '~shared/api';
import { ColorSelection } from '~shared/uiKit';

interface ChangeColorProps {}
const ChangeColor: FC<ChangeColorProps> = (props) => {
    const {} = props;

    const { changeColors } = useFilters();

    const { data: colors } = useQuery({
        queryKey: ['colors'],

        initialData: [
            {
                colorName: 'red',
                colorCode: '#900',
            },
        ],

        queryFn: async () => {
            const res = await productService.getColors();
            return res;
        },
    });
    return <ColorSelection placeholder="Choose colors" options={colors} onChange={changeColors} />;
};

export default ChangeColor;
