import React from "react";
// Component which takes the responsibility of managin the break
// times.
import { StyleSheet, Text, View, Button } from "react-native";

const Session = (props) => {
  const { increment, decrement, minutes } = props;

  return (
    <View>
      <Text>Current session time: {minutes / 60}</Text>
      <Button title="+" color="white" onPress={increment} />
      <Button title="-" color="white" onPress={decrement} />
    </View>
  );
};

export default Session;
