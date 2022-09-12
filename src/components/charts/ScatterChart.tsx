import {
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Scatter } from 'react-chartjs-2';

import randomRGBAColor from '../../utils/random-rgba-color';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

type ObjectType = {
  [key:string] : number[]
}

type Props = {
  sourceData: ObjectType;
}

const ScatterChart: React.FC<Props> = ({ sourceData }) => {
  const datasets = Object.keys(sourceData).map((key: string) => {
    const color = randomRGBAColor();
    const backgroundColor = color.getColorWithOpacity(0.2);

    return ({
      label: `${key} N_PAZ`,
      backgroundColor,
      data: sourceData[key].map((value: number, index: number) => ({ x: index + 1, y: value })),
    })
  });

  const data = {
    datasets,
  };

  return <Scatter data={data} />;
};

export default ScatterChart;
