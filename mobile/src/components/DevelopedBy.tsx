import React, { FC } from 'react';
import { View } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DevelopedBy: FC = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
      }}
    >
      <Text>Developed with &nbsp;</Text>
      <MaterialCommunityIcons name="heart" size={25} color="red" />
      <Text>&nbsp; by Gyanendro Kh</Text>
    </View>
  );
};

export default DevelopedBy;
