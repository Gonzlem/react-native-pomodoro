import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Timer = (props) => {
  const { time } = props;

  const MINS = Math.floor(time / 1000 / 60);
  const SECS = Math.floor((time / 1000) % 60);

  return (
    <View>
      <Text style={styles.sessionTimer}>
        {MINS}:{SECS.toString().length === 1 ? "0" + SECS : SECS}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sessionTimer: {
    fontWeight: "bold",
    fontSize: 56,
  },
});

export default Timer;
