import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export function isJson(str) {
    try {        
        JSON.parse(str);
    } catch (e) {        
        return false;
    }
    return true;
}

export var getIcon = (item) => {
    switch (item.iconSource) {
        case "Ionicons": return (
            <Ionicons
                name={item.icon}
                size={25}
                style={styles.navBarIcon}></Ionicons>
        )
        case "AntDesign": return (
            <AntDesign
                name={item.icon}
                size={25}
                style={styles.navBarIcon}></AntDesign>
        )
        case "MaterialIcons": return (
            <MaterialIcons
                name={item.icon}
                size={25}
                style={styles.navBarIcon}></MaterialIcons>
        )
        case "MaterialCommunityIcons": return (
            <MaterialCommunityIcons
                name={item.icon}
                size={25}
                style={styles.navBarIcon}></MaterialCommunityIcons>
        )
    }
}

const styles = StyleSheet.create({
    navBarIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});