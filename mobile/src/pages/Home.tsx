import React, { FC, useCallback, useState, useEffect, useMemo } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { CancelTokenSource } from 'axios';
import { RootNavProps } from '../navigators';
import { AppBar, CaseTotal, TimelineChart, CaseTypeChart } from '../components';
import {
  Total,
  caseApi,
  TimelineData,
  CaseTypeData
} from '@covid-manipur/common';
import Axios from 'axios';

const Home: FC<RootNavProps<'Home'>> = ({ navigation }) => {
  const cancelToken: CancelTokenSource = useMemo(
    () => Axios.CancelToken.source(),
    []
  );
  const [isLoading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<Total | null>(null);
  const [timelineData, setTimelineData] = useState<TimelineData[] | null>(null);
  const [caseTypeData, setCaseTypeData] = useState<CaseTypeData | null>(null);

  const handleMenuPress = useCallback(() => {
    navigation.toggleDrawer();
  }, [navigation]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setTotal(await caseApi.total(cancelToken.token));
    setTimelineData(await caseApi.timeline(cancelToken.token));
    setCaseTypeData(await caseApi.type('confirmed', cancelToken.token));
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData().catch(console.log);

    return () => {
      cancelToken.cancel();
    };
  }, []);

  return (
    <>
      <AppBar title="Covid-Manipur" onLeftBtnPress={handleMenuPress} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        }
      >
        {total && <CaseTotal total={total} />}
        {timelineData && <TimelineChart timeline={timelineData} />}
        {caseTypeData && <CaseTypeChart data={caseTypeData} />}
      </ScrollView>
    </>
  );
};

export default Home;
