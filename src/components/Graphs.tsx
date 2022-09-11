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
import PlotlyChart from './charts/PlotlyChart';
import PolarAreaChart from './charts/PolarAreaChart';
import RadarChart from './charts/RadarChart';
import ScatterChart from './charts/ScatterChart';
import s from './Main.module.scss';

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
      <Grid container>
        <Grid xs={12}>
          <PlotlyChart items={items} />
        </Grid>
        <Grid xs={12}>
          <BarChart labels={labels} sourceData={datasetData}/>
        </Grid>
        <Grid xs={6}>
          <RadarChart labels={labels} sourceData={datasetData}/>
        </Grid>
        <Grid xs={6}>
          <PolarAreaChart labels={labels} sourceData={datasetData}/>
        </Grid>
        <Grid xs={6}>
          <DoughnutChart labels={labels} sourceData={datasetData}/>
        </Grid>
        <Grid xs={12}>
          <ScatterChart sourceData={datasetData}/>
        </Grid>
        <Grid xs={12}>
          <BubbleChart sourceData={datasetData}/>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Graphs;
