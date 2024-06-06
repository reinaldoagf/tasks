// App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import TasksScreen from './src/screens/TasksScreen';
import ListScreen from './src/screens/ListScreen';

const Stack = createStackNavigator();

const options = { 
  headerBackTitleVisible: false,
  headerStyle: {
    backgroundColor: '#091a2e', 
  },
  headerTintColor: '#fff'  
}

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="TasksScreen" 
            component={TasksScreen} 
            options={{
              ...options,
              headerTitle: "Tasks"
            }}
          />
          <Stack.Screen 
            name="ListScreen" 
            component={ListScreen} 
            options={{
              ...options,
              headerTitle: "List"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
