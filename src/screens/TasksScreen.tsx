import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FloatingAction } from 'react-native-floating-action';
import { ProgressBar } from 'react-native-paper';
import { RootState } from '../redux/store';
import { addTask, toggleTask, removeTask } from '../redux/tasksSlice';
import { TabBarIcon } from '../components/TabBarIcon';

const TasksScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState('');
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks?.tasks);
  const [floatingActionRef, setFloatingActionRef] = useState<any>(null);

  const handleToggleTask = (item: any) => {
    dispatch(toggleTask(item.id))
  };

  const handleAddTask = () => {
    if (floatingActionRef)
      floatingActionRef.handlePressItem()

    if (taskTitle.trim()) {
      dispatch(addTask(taskTitle));
      setTaskTitle('');
    }

    setIsModalVisible(false)
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
      {
        tasks.length > 0 && (
          <View style={styles.progressBarContainer}>
            <ProgressBar
              progress={tasks.filter((task: any) => task.completed).length / tasks.length}
              color={'green'}
            />
          </View>
        )
      }

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text
              style={[styles.taskText, item.completed && styles.taskCompleted]}
              onPress={() => {
                handleToggleTask(item)
              }}
            >
              {item.title}
            </Text>
            <View style={styles.taskActions}>
              <TouchableOpacity
                onPress={() => {
                  handleToggleTask(item)
                }}>
                <TabBarIcon
                  name={'checkbox-outline'}
                  size={20}
                  color={'green'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  dispatch(removeTask(item.id))
                }}>
                <TabBarIcon
                  name={'trash'}
                  size={20}
                  color={'red'}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHead}>
              <Text style={styles.modalHeadTitle}>Add a new task</Text>
              <TouchableOpacity
                onPress={() => {
                  if (floatingActionRef)
                    floatingActionRef.handlePressItem()
                  setIsModalVisible(false)
                }}>
                <TabBarIcon
                  name={'close'}
                  size={18}
                  color={"#fff"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              <TextInput
                style={styles.input}
                placeholderTextColor="gray"
                placeholder="Add a new task"
                value={taskTitle}
                onChangeText={setTaskTitle}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={handleAddTask}>
                <Text style={styles.buttonText}>Add a new task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <FloatingAction
        ref={(ref: any) => { setFloatingActionRef(ref) }}
        color={"#172b46"}
        onPressMain={() => {
          setIsModalVisible(true)
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#091a2e',
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    color: '#51d7bc',
  },
  progressBarContainer: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    color: '#fff',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#172b46',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#51d7bc',
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#172b46',
    borderRadius: 10,
    marginBottom: 10
  },
  taskText: {
    fontSize: 18,
    color: '#51d7bc',
    fontWeight: 'semibold',
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
  },
  taskActions:  {
    flexDirection: 'row',
    gap: 5
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContainer: {
    height: 180,
    backgroundColor: '#091a2e',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    gap: 20
  },
  modalHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalHeadTitle: {
    color: '#fff',
  },
  modalBody: {
    paddingBottom: 0,
    height: '100%',
    gap: 10
  }
});

export default TasksScreen;
