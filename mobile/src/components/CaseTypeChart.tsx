import React, { FC, useMemo } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Surface,
  Title,
  IconButton,
  Divider,
  Caption
} from 'react-native-paper';
import { PieChart } from 'react-native-chart-kit';
import { CaseTypeData, districts } from '@covid-manipur/common';
import { randomColor } from '../utils';
import { chartConfig, SCREEN_WIDTH } from '../constant';

type CaseTypeChartProps = {
  data: CaseTypeData;
};

type PieChartData = {
  name: string;
  cases: number;
  color: string;
  legendFontColor: string;
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
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  legendsContainer: {
    flex: 1,
    justifyContent: 'center'
  }
});

const CaseTypeChart: FC<CaseTypeChartProps> = ({ data }) => {
  const pieChartData: PieChartData[] = useMemo(() => {
    return Object.keys(data)
      .sort((a, b) => {
        return data[b] - data[a];
      })
      .map(k => {
        const color = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;

        return {
          name: districts[Number(k)],
          cases: data[k],
          color,
          legendFontColor: color
        } as PieChartData;
      });
  }, []);

  return (
    <Surface style={styles.container}>
      <View style={styles.header}>
        <Title>Cases</Title>
        <IconButton
          icon="dots-vertical"
          style={{ margin: 0 }}
          onPress={() => {}}
        />
      </View>
      <Divider />
      <View style={styles.chartContainer}>
        <PieChart
          data={pieChartData}
          width={(SCREEN_WIDTH - 5 * 2) * 0.62}
          height={250}
          chartConfig={chartConfig}
          backgroundColor="transparent"
          accessor="cases"
          paddingLeft={((SCREEN_WIDTH - 5 * 2) * 0.15).toFixed(0)}
          hasLegend={false}
        />
        <View style={styles.legendsContainer}>
          <ScrollView style={{ height: 250 }} nestedScrollEnabled={true}>
            {pieChartData.map(item => {
              return (
                <Caption
                  key={item.name}
                  style={{ color: item.legendFontColor }}
                >
                  {item.cases} - {item.name}
                </Caption>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Surface>
  );
};

export default CaseTypeChart;
