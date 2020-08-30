import React, { FC } from 'react';
import { View } from 'react-native';

type SeperatorProps = {
  height?: number | string;
  width?: number | string;
};

const Seperator: FC<SeperatorProps> = ({ height, width }) => {
  return (
    <View
      style={{
        height,
        width
      }}
    />
  );
};

export default Seperator;
