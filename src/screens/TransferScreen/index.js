import React from "react";
import { Text, View } from "react-native";

export default function TransferScreen() {
  return <>
    <View>
      <Text>TransferScreen</Text>
    </View>
  </>;
}

const styles = StyleSheet.create({
  screen: {
      backgroundColor: '#232323',
      height: '100%',
      width: '100%',
      justifyContent: 'center'
  },
  text: {
      color: '#FFB400',
      textAlign: 'center',
  }
})