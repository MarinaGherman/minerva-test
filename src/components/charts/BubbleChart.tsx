import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bubble } from 'react-chartjs-2';

import randomRGBAColor from '../../utils/random-rgba-color';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

type Props = {
  sourceData: any;
}

const BubbleChart: React.FC<Props> = ({ sourceData }) => {
  const datasets = Object.keys(sourceData).map((key: string) => {
    const color = randomRGBAColor();
    const backgroundColor = color.getColorWithOpacity(0.2);

    const max = Math.max.apply(null, sourceData[key]);
    const min = Math.min.apply(null, sourceData[key]);

    return ({
      label: `${key} N_PAZ`,
      backgroundColor,
      data: sourceData[key].map((value: string, index: number) => ({ x: index + 1, y: value, r: ((max - min) + +value ) / 400 })),
    })
  });

  const data = {
    datasets,
  };

  return <Bubble data={data} />;
};

export default BubbleChart;
