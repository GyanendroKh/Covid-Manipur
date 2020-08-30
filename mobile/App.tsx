import React, { FC } from 'react';
import {
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as NavDarkTheme
} from '@react-navigation/native';
import Routes from './src/Routes';

const DarkTheme = {
  ...NavDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    ...PaperDarkTheme.colors
  }
};

const App: FC = () => {
  return (
    <PaperProvider theme={DarkTheme}>
      <NavigationContainer theme={DarkTheme}>
        <Routes />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
