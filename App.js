import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import GoalInput from "./Components/GoalInput";
import GoalItem from "./Components/GoalItem";

export default function App() {
  const [modalIsVisable, setModalIsVisable] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandeler() {
    setModalIsVisable(true);
  }

  function endAddGoalHandeler() {
    setModalIsVisable(false);
  }

  function addGoalHandeler(enteredGoalText) {
    setCourseGoals((currentCourseGoal) => [
      ...currentCourseGoal,
      { text: enteredGoalText, id: Math.random.toString() },
    ]);
    endAddGoalHandeler();
  }

  function deleteGoalHandeler(id) {
    setCourseGoals((currentCourseGoal) => {
      return currentCourseGoal.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color={"#a065ec"}
          onPress={startAddGoalHandeler}
        />
        <GoalInput
          visible={modalIsVisable}
          onAddGoal={addGoalHandeler}
          onCancel={endAddGoalHandeler}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandeler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 15,
  },

  goalsContainer: {
    flex: 5,
  },
});
