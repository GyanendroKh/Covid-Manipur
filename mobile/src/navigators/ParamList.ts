import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RouteProp } from '@react-navigation/native';

export type RootNavParamList = {
  Home: undefined;
  About: undefined;
};

export type RootNavProps<T extends keyof RootNavParamList> = {
  navigation: DrawerNavigationProp<RootNavParamList, T>;
  route: RouteProp<RootNavParamList, T>;
};
