import React, { useEffect, useRef, useState } from 'react';
import Plot from 'react-plotly.js';

import { Result } from '../../store/slice/data/actions/parse-data';

type Props = {
  items: Result[];
};

const PlotlyChart: React.FC<Props> = ({ items }) => {
  const wrapperRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [width, setWidth] = useState(700);

  const xData: string[] = [];
  const yData: number[] = [];

  items.forEach(item => {
    xData.push(item.DATA);
    yData.push(+item.N_PAZ);
  });

  useEffect(() => {
    if (wrapperRef.current) {
      setWidth(wrapperRef.current.clientWidth);
    }
  }, [wrapperRef])

  return (
    <div ref={wrapperRef}>
      <Plot
        data={[
          {
            fill: 'tonexty',
            line: {
              color: 'rgb(4,90,141)'
            },
            marker: {
              symbol: 'circle'
            },
            mode: 'lines',
            name: 'Numero Pazienti',
            showlegend: true,
            type: 'scatter',
            x: xData,
            xaxis: 'x',
            y: yData,
            yaxis: 'y'
          },

        ]}
        layout={{
          height: 500,
          width,
          autosize: true,
          title: 'Plot chart',
          xaxis: {
            rangeslider: {}
          }
        }}
      />
    </div>
  )
};

export default PlotlyChart;
