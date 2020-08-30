import React, { FC, useMemo, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Title, IconButton } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';
import { Dataset } from 'react-native-chart-kit/dist/HelperTypes';
import { TimelineData } from '@covid-manipur/common';
import { chartConfig, SCREEN_WIDTH } from '../constant';

type TimelineChartProps = {
  timeline: TimelineData[];
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    borderRadius: 5
  },
  header: {
    padding: 10,
    paddingLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const TimelineChart: FC<TimelineChartProps> = ({ timeline }) => {
  const chartData: LineChartData = useMemo((): LineChartData => {
    const labels: string[] = [];
    const legend: string[] = ['Confirmed', 'Death', 'Recovered'];

    const confirmed: Dataset = {
      data: [],
      color: (o = 1) => `rgba(122, 0, 116, ${o})`
    };

    const death: Dataset = {
      data: [],
      color: (o = 1) => `rgba(173, 20, 0, ${o})`
    };

    const recovered: Dataset = {
      data: [],
      color: (o = 1) => `rgba(53, 41, 145, ${o})`
    };

    timeline
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .forEach(t => {
        labels.push(String(new Date(t.date).getDate()));
        confirmed.data.push(t.confirmed);
        death.data.push(t.death);
        recovered.data.push(t.recovered);
      });

    return { datasets: [confirmed, death, recovered], labels, legend };
  }, []);

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <Title>Timeline</Title>
        <IconButton
          icon="dots-vertical"
          style={{ margin: 0 }}
          onPress={() => {}}
        />
      </View>
      <LineChart
        data={chartData}
        chartConfig={chartConfig}
        width={SCREEN_WIDTH - 5 * 2}
        height={250}
        bezier
      />
    </Surface>
  );
};

export default TimelineChart;
