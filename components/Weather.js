/**
 * Weather
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Weather = () => {
    return (
        <View style={styles.weatherContainer}>
            <View style={styles.headerContainer}>
                <Icon name="ios-sunny" size={45} color="#fff" />
                <Text style={styles.tempText}>Temperature˚</Text>
            </View>
            <View style={styles.bodyContainer}>
                <Text style={styles.title}>So Sunny</Text>
                <Text styles={styles.subtitle}>It hurts my eyes!</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
        backgroundColor: '#f7b733'
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tempText: {
        fontSize: 48,
        color: '#fff'
    },
    bodyContainer: {
        flex: 2,
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        paddingLeft: 25,
        marginBottom: 40
    },
    title: {
        fontSize: 48,
        color: '#fff'
    },
    subtitle: {
        fontSize: 24,
        color: '#fff'
    }
});

export default Weather;