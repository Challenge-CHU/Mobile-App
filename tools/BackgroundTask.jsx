import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";


export default function BackgroundFetchScreen() {
  const BACKGROUND_FETCH_TASK = "background-fetch";

  // 1. Define the task by providing a name and the function that should be executed
  // Note: This needs to be called in the global scope (e.g outside of your React components)
  TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    const now = Date.now();

    const currentDate = new Date(now);

    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();

    const formattedTime = `${hours}h${minutes < 10 ? "0" : ""}${minutes}`;

    // Be sure to return the successful result type!
    return BackgroundFetch.BackgroundFetchResult.NewData;
  });

  // 2. Register the task at some point in your app by providing the same name,
  // and some configuration options for how the background fetch should behave
  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  async function registerBackgroundFetchAsync() {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60 * 1, // 1 minutes
      stopOnTerminate: false, // android only,
      startOnBoot: true, // android only
    });
  }

  async function getAlTaskAsync() {
    // return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    //   minimumInterval: 60 * 1, // 1 minutes
    //   stopOnTerminate: false, // android only,
    //   startOnBoot: true, // android only
    // });
    let result = await TaskManager.getRegisteredTasksAsync();

    console.log(result);
  }

  // 3. (Optional) Unregister tasks by specifying the task name
  // This will cancel any future background fetch calls that match the given name
  // Note: This does NOT need to be in the global scope and CAN be used in your React components!
  async function unregisterBackgroundFetchAsync() {
    return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
  }

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);

  React.useEffect(() => {
    checkStatusAsync();
  }, []);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(
      BACKGROUND_FETCH_TASK
    );
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={{ color: "black" }}>
          Background fetch status:{" "}
          <Text style={styles.boldText}>
            {status && BackgroundFetch.BackgroundFetchStatus[status]}
          </Text>
        </Text>
        <Text style={{ color: "black" }}>
          Background fetch task name:{" "}
          <Text style={styles.boldText}>
            {isRegistered ? BACKGROUND_FETCH_TASK : "Not registered yet!"}
          </Text>
        </Text>
      </View>
      <View style={styles.textContainer}></View>
      <Button
        title={
          isRegistered
            ? "Unregister BackgroundFetch task"
            : "Register BackgroundFetch task"
        }
        onPress={toggleFetchTask}
      />
      <Button title="GetBackground" onPress={getAlTaskAsync} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    margin: 10,
  },
  boldText: {
    fontWeight: "bold",
    color: "black",
  },
});
