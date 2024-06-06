// src/screens/HomeScreen.tsx
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TabBarIcon } from '../components/TabBarIcon';

const HomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <StatusBar translucent />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TasksScreen')}>
                <Text style={styles.text}>Tasks</Text>
                <TabBarIcon size={40} name={'arrow-forward-outline'} color={'#51d7bc'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListScreen')}>
                <Text style={styles.text}>List</Text>
                <TabBarIcon size={40} name={'arrow-forward-outline'} color={'#51d7bc'} />
            </TouchableOpacity >
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        flex: 1,
        padding: 20,
        backgroundColor: "#091a2e",
        gap: 10
    },
    button: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#172b46",
        borderRadius: 10
    },
    text: {
        fontSize: 24,
        color: "#51d7bc"
    },
});

export default HomeScreen;
