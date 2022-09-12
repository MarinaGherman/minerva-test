import {
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Radar } from 'react-chartjs-2';

import randomRGBAColor from '../../utils/random-rgba-color';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);
type ObjectType = {
  [key:string] : number[]
}

type Props = {
  sourceData: ObjectType;
  labels: string[];
}

const RadarChart: React.FC<Props> = ({ labels, sourceData }) => {

  const datasets = Object.keys(sourceData).map((key: string) => {
    const color = randomRGBAColor();
    const borderColor = color.getColor();
    const backgroundColor = color.getColorWithOpacity(0.2);

    return ({
      label: `${key} N_PAZ`,
      backgroundColor,
      data: sourceData[key],
      borderColor,
      borderWidth: 1,
    })
  });

  const data = {
    labels,
    datasets,
  };

  return <Radar data={data} />;

};

export default RadarChart;
