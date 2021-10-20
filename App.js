import Timer from "./components/Timer";
import Break from "./components/Break";
import Session from "./components/Session";
import Round from "./components/Round";
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button } from "react-native";

// TODO: Session, Break and Round can be refactored into one component,
// by adding a few more props, as name, or type {break, session}

export default function App() {
  // Break and session functionalities
  const [breakTime, setBreakTime] = useState(5 * 60);
  const [sessionTime, setSessionTime] = useState(25 * 60);

  // Pomodoro functionalities
  const [breakMode, setBreakMode] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState();
  const [timeSpent, setTimeSpent] = useState(0);
  const [buttonText, setButtonText] = useState("Start!");

  // Count amount of sessions that we want.
  const [sessionCount, setSessionCount] = useState(0);
  const [roundsCount, setRoundsCount] = useState(3);

  // Use effect to take care of the break/session loops
  useEffect(() => {
    setTimeLeft(breakMode === false ? sessionTime * 1000 : breakTime * 1000);
  }, [sessionTime, breakTime]);

  // Use effect to take care of the main loop, each second re-renders the timespent
  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 1) {
      const timeLeft = breakMode
        ? breakTime * 1000 - timeSpent
        : sessionTime * 1000 - timeSpent;

      // Interval that takes care of the seconds
      interval = setInterval(() => {
        setTimeSpent((timeSpent) => timeSpent + 1000);
      }, 1000); // one second at a time
      setTimeLeft(timeLeft);
    } else {
      clearInterval(interval); // clear the interval if it is not running or the time left is less than 1 sec
    }

    // Handle what happens when time ends
    if (timeLeft === 0) {
      // const mode = breakMode === false; // The mode is switched
      const timeLeft = breakMode ? breakTime * 1000 : sessionTime * 1000;

      setTimeSpent(0);
      setBreakMode(!breakMode); // Set the mode to the opposite of the current once the timer finishes
      setTimeLeft(timeLeft);
      countSession();
    }

    // When the amount of rounds is reached, it resets
    if (roundsCount == sessionCount) resetPomodoro();
    return () => clearInterval(interval);
  }, [isRunning, timeSpent]);

  // Handle session timers
  const decrementSessionTime = () => {
    const newSessionTime =
      sessionTime - 60 > 60 * 25 ? sessionTime - 60 : 60 * 25;
    setSessionTime(newSessionTime);
  }

  const incrementSessionTime = () => {
    const newSessionTime =
      sessionTime + 60 <= 60 * 180 ? sessionTime + 60 : 60 * 180;
    setSessionTime(newSessionTime);
  }

  // Handle break timers
  const decrementBreakTime = () => {
    const newBreakTime = breakTime - 60 > 60 ? breakTime - 60 : 60;
    setBreakTime(newBreakTime);
  }

  const incrementBreakTime = () => {
    const newBreakTime = breakTime + 60 <= 60 * 60 ? breakTime + 60 : 60 * 60;
    setBreakTime(newBreakTime);
  }

  // Handle rounds of sessions
  const decrementRounds = () => {
    if (roundsCount >= 2) setRoundsCount(roundsCount - 1);
  }

  const incrementRounds = () => {
    if (roundsCount < 10) setRoundsCount(roundsCount + 1);
  }

  //
  const startTimer = () => {
    setIsRunning(!isRunning); // Set the "running" flag to the opposite of the current
    toggleStartButton();
  }

  const toggleStartButton = () => {
    setButtonText(buttonText === "Start!" ? "Stop!" : "Start!");
  }

  const resetPomodoro = () => {
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setTimeLeft(breakMode === false ? sessionTime * 1000 : breakTime * 1000);
    setSessionCount(0);

    if (isRunning) {
      toggleStartButton();
      setIsRunning(false);
      setTimeSpent(0);
    }
  }

  const countSession = () => {
    if (breakMode) setSessionCount(sessionCount + 1);
  }

  return (
    <View style={styles.container}>
      <Timer time={timeLeft} mode={breakMode} />

      <View style={styles.buttonsContainer}>
        <Button title={buttonText} color="white" onPress={startTimer} />
        <Button title="Reset!" color="white" onPress={resetPomodoro} />
      </View>

      <View style={styles.settingsContainer}>
        <Session
          minutes={sessionTime}
          decrement={decrementSessionTime}
          increment={incrementSessionTime}
        />
        <Round
          rounds={roundsCount}
          decrement={decrementRounds}
          increment={incrementRounds}
        />
        <Break
          minutes={breakTime}
          decrement={decrementBreakTime}
          increment={incrementBreakTime}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffb6c1",
    alignItems: "center",
    justifyContent: "center",
  },
  settingsContainer: {
    marginTop: 50,
    alignItems: "center",
  },
  buttonsContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 20,
    marginTop: 25,
  },
});
