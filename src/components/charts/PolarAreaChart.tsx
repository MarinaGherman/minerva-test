import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { PolarArea } from 'react-chartjs-2';

import randomRGBAColor from '../../utils/random-rgba-color';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

type Props = {
  sourceData: any;
  labels: string[];
}

const PolarAreaChart: React.FC<Props> = ({ labels, sourceData }) => {

  const datasets = Object.keys(sourceData).map((key: string) => ({
    label: `${key} N_PAZ`,
    backgroundColor: labels.map(() => randomRGBAColor(0.5).getColor()),
    data: sourceData[key],
    borderWidth: 1,
  }));

  const data = {
    labels,
    datasets,
  };
  return <PolarArea data={data} />;
};

export default PolarAreaChart;
