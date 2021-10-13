import React from "react";
// Component which takes the responsibility of managin the break
// times.
import { StyleSheet, Text, View, Button } from "react-native";

const Break = (props) => {
  const { increment, decrement, minutes } = props;

  return (
    <View>
      <View>
        <Text>Current break time: {minutes / 60}</Text>
        <Button title="+" color="white" onPress={increment} />
        <Button title="-" color="white" onPress={decrement} />
      </View>
    </View>
  );
};

export default Break;
