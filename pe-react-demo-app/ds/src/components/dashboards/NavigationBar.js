import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class NavigationBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (nextProps.config.appConfig.menubar.items != this.state.items) {
            this.setState({
                items: nextProps.config.appConfig.menubar.items
            })
        }
    }

    getIcon = (item) => {
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

    renderNavBar = () => {

        let { items } = this.state;

        items = items.map((item, key) => {
            if (item.type === "dashboard") {
                console.log(item);

                return (
                    <TouchableOpacity key={key}
                        style={styles.navBarItemContainer}>
                        {this.getIcon(item)}
                        <Text
                            style={styles.navBarItem}
                            style={item.active ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}>
                            {item.title}</Text>
                    </TouchableOpacity>);
            } else if (item.type === "module") {
                return (
                    <TouchableOpacity key={key}
                        style={styles.navBarItemContainer}>
                        {this.getIcon(item)}
                        <Text
                            style={styles.navBarItem}
                            style={item.active ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}>
                            {item.title}</Text>
                    </TouchableOpacity>);
            }
        })

        return items;
    }

    render() {
        return (
            <View style={styles.navBar}>
                {this.state.items.length > 1 && this.renderNavBar()}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        height: 60,
        paddingTop: 5,
        justifyContent: 'space-around',
        borderTopColor: '#999999',
        borderTopWidth: 0.5
    },
    navBarItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    navBarItem: {
        fontSize: 15,
        paddingVertical: 5
    },
    chartConfig: {
        marginLeft: -4
    },
    navBarIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});
const mapStateToProps = (state) => {
    return {
        config: state.navigationDetails
    }
}
export default connect(mapStateToProps, null)(NavigationBar);