import { Box, Grid } from '@mui/material';
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import moment from 'moment';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectData, selectDataIsParsed } from '../store/slice/data';
import BarChart from './charts/BarChart';
import BubbleChart from './charts/BubbleChart';
import DoughnutChart from './charts/DoughnutChart';
import PieChart from './charts/PieChart';
import PlotlyChart from './charts/PlotlyChart';
import PolarAreaChart from './charts/PolarAreaChart';
import RadarChart from './charts/RadarChart';
import ScatterChart from './charts/ScatterChart';
import s from './styles/Main.module.scss';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);


const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Graphs = () => {
  const navigate = useNavigate();

  const isParsedData = useSelector(selectDataIsParsed);
  const items = useSelector(selectData);

  const datasetData = useMemo(() => {
    // Create initial data
    const state: any = {};

    items.forEach((item) => {
      if (item.DATA) {
        const year = moment(item.DATA).get('year');
        // get num of month [0 - 11]
        const month = moment(item.DATA).get('month');
        if (state[year] === undefined) {
          // define initial data for current year
          state[year] = labels.map(() => 0);
        }
        // sum data with initial data
        state[year][month] += item.N_PAZ ? +item.N_PAZ : 0;
      }
    });

    return state;

  }, [items]);

  useEffect(() => {
    if (!isParsedData) {
      navigate('/form');
    }
  }, [navigate, isParsedData])

  return (
    <Box className={s.mainContainer}>
      <h1>Charts</h1>
      <Grid container>
        <Grid xs={12}>
          <Box className={s.plotChart}>
            <h2>Plot Chart</h2>
            <PlotlyChart items={items} />
          </Box>
        </Grid>
        <Grid xs={12}>
          <Box className={s.barChart}>
            <h2>Bar Chart</h2>
            <BarChart labels={labels} sourceData={datasetData}/>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box className={s.radarChart}>
            <h2>Radar Chart</h2>
            <RadarChart labels={labels} sourceData={datasetData}/>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box className={s.polarChart}>
            <h2>Polar Chart</h2>
            <PolarAreaChart labels={labels} sourceData={datasetData}/>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box className={s.doughnutChart}>
            <h2>Doughnut Charts</h2>
            <DoughnutChart labels={labels} sourceData={datasetData}/>
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box className={s.pieChart}>
            <h2> Pie Chart</h2>
            <PieChart labels={labels} sourceData={datasetData}/>
          </Box>
        </Grid>
        <Grid xs={12}>
          <Box className={s.scatterChart}>
            <h2>Scatter Chart</h2>
            <ScatterChart sourceData={datasetData}/>
          </Box>
        </Grid>
        <Grid xs={12}>
          <Box className={s.bubbleChart}>
            <h2>Bubble Chart</h2>
            <BubbleChart sourceData={datasetData}/>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Graphs;
