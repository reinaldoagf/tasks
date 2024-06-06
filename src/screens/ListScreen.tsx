import React from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import useFetchData from '../hooks/useFetchData';
import moment from 'moment'


const ListScreen = () => {
    const { data, loading, error } = useFetchData('https://6172cfe5110a740017222e2b.mockapi.io/elements');

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={[styles.itemText, {fontWeight: 'semibold'}]}>{item.name}</Text>
                        <Text style={styles.itemText}>{moment(item.createdAt).format("DD/mm/yyyy h:mA")}</Text>
                    </View>
                )}
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#091a2e',
    },
    errorText: {
        color: 'red',
        fontSize: 18,
    },
    itemContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#172b46',
        borderRadius: 10,
        marginBottom: 10,
        gap: 5
    },
    itemText: {
        fontSize: 18,
        color: '#51d7bc',
        fontWeight: 'bold',
    },
});

export default ListScreen;
