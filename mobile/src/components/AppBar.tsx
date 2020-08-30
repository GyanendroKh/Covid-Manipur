import React, { FC } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Appbar } from 'react-native-paper';

type AppBarProps = {
  title: string;
  onLeftBtnPress?: () => void;
};

const AppBar: FC<AppBarProps> = ({ title, onLeftBtnPress }) => {
  return (
    <>
      <StatusBar style="inverted" />
      <Appbar.Header>
        <Appbar.Action icon="menu" onPress={onLeftBtnPress} />
        <Appbar.Content title={title} />
      </Appbar.Header>
    </>
  );
};

export default AppBar;
