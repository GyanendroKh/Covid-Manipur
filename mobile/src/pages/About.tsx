import React, { FC, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Linking,
  ToastAndroid
} from 'react-native';
import { RootNavProps } from '../navigators';
import { AppBar, Seperator, DevelopedBy } from '../components';
import { Avatar, Title, Surface, Text, Button } from 'react-native-paper';
import { GITHUB_URL } from '../constant';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 15,
    paddingBottom: 0
  },
  card: {
    padding: 20,
    borderRadius: 15,
    width: '100%'
  }
});

const About: FC<RootNavProps<'About'>> = ({ navigation }) => {
  const handleMenuPress = useCallback(() => {
    navigation.toggleDrawer();
  }, [navigation]);

  const handleOpenGithub = useCallback(async () => {
    if (await Linking.canOpenURL(GITHUB_URL)) {
      await Linking.openURL(GITHUB_URL);
    } else {
      ToastAndroid.show('Cannot open link.', ToastAndroid.SHORT);
      ToastAndroid.show(`Link: ${GITHUB_URL}`, ToastAndroid.LONG);
    }
  }, []);

  return (
    <>
      <AppBar title="About" onLeftBtnPress={handleMenuPress} />
      <ScrollView contentContainerStyle={styles.container}>
        <Avatar.Text label="Corona" size={95} />
        <Seperator height={10} />
        <Title>Covid - Manipur</Title>
        <Seperator height={15} />
        <Surface style={styles.card}>
          <Text style={{ textAlign: 'justify' }}>
            A data visualisation tool for visualizing Covid-19 cases in Manipur.
          </Text>
        </Surface>
        <Seperator height={15} />
        <Surface style={styles.card}>
          <Title>Open Source</Title>
          <Seperator height={5} />
          <Text style={{ textAlign: 'justify' }}>
            This application is an Open Source project hosted on Github.
          </Text>
          <Seperator height={15} />
          <Button mode="outlined" onPress={handleOpenGithub}>
            Open Github
          </Button>
        </Surface>
        <Seperator height={15} />
        <View style={{ flexGrow: 1 }} />
        <DevelopedBy />
      </ScrollView>
    </>
  );
};

export default About;
