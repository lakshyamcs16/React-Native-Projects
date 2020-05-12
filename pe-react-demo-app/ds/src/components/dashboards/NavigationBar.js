import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { getIcon } from '../../utilities/Utilities';

class NavigationBar extends PureComponent {

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

    renderNavBar = () => {

        let { items } = this.state;

        items = items.map((item, key) => {
            if (item.type === "dashboard") {
                return (
                    <TouchableOpacity key={key}
                        style={styles.navBarItemContainer}>
                        {getIcon(item)}
                        <Text
                            style={styles.navBarItem}
                            style={item.active ? { fontWeight: 'bold' } : { fontWeight: 'normal' }}>
                            {item.title}</Text>
                    </TouchableOpacity>);
            } else if (item.type === "module") {
                return (
                    <TouchableOpacity key={key}
                        style={styles.navBarItemContainer}>
                        {getIcon(item)}
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
    }
});
const mapStateToProps = (state) => {
    return {
        config: state.navigationDetails
    }
}
export default connect(mapStateToProps, null)(NavigationBar);