import React, { FC } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootNavParamList } from './ParamList';
import { Home, About } from '../pages';

const Drawer = createDrawerNavigator<RootNavParamList>();

const RootNavigator: FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
};

export default RootNavigator;
