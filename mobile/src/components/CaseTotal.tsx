import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Surface, Subheading, Caption } from 'react-native-paper';
import { Total } from '@covid-manipur/common';
import Seperator from './Seperator';

type CaseTotalProps = {
  total: Total;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    padding: 10
  }
});

const CaseTotal: FC<CaseTotalProps> = ({
  total: { confirmed, active, death, recovered }
}) => {
  return (
    <>
      <Seperator height={5} />
      <View style={styles.container}>
        <Surface style={styles.card}>
          <Subheading>Total Cases</Subheading>
          <Caption>{confirmed}</Caption>
        </Surface>
        <Surface style={styles.card}>
          <Subheading>Total Death</Subheading>
          <Caption>{death}</Caption>
        </Surface>
      </View>
      <Seperator height={5} />
      <View style={styles.container}>
        <Surface style={styles.card}>
          <Subheading>Active Cases</Subheading>
          <Caption>{active}</Caption>
        </Surface>
        <Surface style={styles.card}>
          <Subheading>Recovered</Subheading>
          <Caption>{recovered}</Caption>
        </Surface>
      </View>
      <Seperator height={5} />
    </>
  );
};

export default CaseTotal;
