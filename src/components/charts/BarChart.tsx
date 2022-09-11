import React from 'react';
import { Chart } from 'react-chartjs-2';

import randomRGBAColor from '../../utils/random-rgba-color';

type Props = {
  sourceData: any;
  labels: string[];
}

const BarChart: React.FC<Props> = ({ sourceData, labels }) => {

  const datasets = Object.keys(sourceData).map((key: string) => ({
    type: 'bar' as const,
    label: `${key} N_PAZ`,
    backgroundColor: randomRGBAColor().getColor(),
    data: sourceData[key],
    stack: '1',
  }));

  const data = {
    labels,
    datasets,
  };

  return <Chart type="bar" data={data} />;
};

export default BarChart;
