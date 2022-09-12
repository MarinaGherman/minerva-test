import { ArcElement, Chart as ChartJS, Legend,Tooltip } from 'chart.js';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

import randomRGBAColor from '../../utils/random-rgba-color';

ChartJS.register(ArcElement, Tooltip, Legend);


type ObjectType = {
  [key:string] : number[]
}

type Props = {
  sourceData: ObjectType;
  labels: string[];
}

const DoughnutChart: React.FC<Props> = ({ labels, sourceData }) => {

  const datasets = Object.keys(sourceData).map((key: string) => {
    // generate 2 array of colors with same color for line only with different opacity
    const borderColor: string[] = [];
    const backgroundColor: string[] = [];
    labels.forEach(() => {
      // fill array with same color
      const color = randomRGBAColor();
      borderColor.push(color.getColor())
      backgroundColor.push(color.getColorWithOpacity(0.2))
    });

    return ({
      label: `${key} N_PAZ`,
      backgroundColor,
      data: sourceData[key],
      borderColor,
      borderWidth: 1,
      offset: 5,
      cutout: 80
    })
  });

  const data = {
    labels,
    datasets,
  };

  return <Doughnut data={data} />;

};

export default DoughnutChart;
