import React, { FC, useCallback } from 'react';
import { RootNavProps } from '../navigators';
import { AppBar } from '../components';

const Home: FC<RootNavProps<'Home'>> = ({ navigation }) => {
  const handleMenuPress = useCallback(() => {
    navigation.toggleDrawer();
  }, [navigation]);

  return <AppBar title="Covid-Manipur" onLeftBtnPress={handleMenuPress} />;
};

export default Home;
