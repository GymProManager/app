import React from 'react';
import { StyleSheet, Pressable } from 'react-native';

export default function ButtonSideBar(props) {
  const { onPress, children, ...rest } = props;
  return (
    <Pressable onPress={onPress} {...rest}>
        {children}
    </Pressable>
  );
}
