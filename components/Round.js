import React from "react";
// Component which takes the responsibility of managin the break
// times.
import { StyleSheet, Text, View, Button } from "react-native";

const Round = (props) => {
  const { increment, decrement, rounds } = props;

  return (
    <View>
      <View>
        <Text>Current amount of rounds: {rounds}</Text>
        <Button title="+" color="white" onPress={increment} />
        <Button title="-" color="white" onPress={decrement} />
      </View>
    </View>
  );
};

export default Round;
