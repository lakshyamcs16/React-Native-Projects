import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { getIcon } from '../../utilities/Utilities';
import { NormalText, BottomBar } from '../../themes/styling';
import { ThemeProvider } from 'styled-components';
import { Actions } from 'react-native-router-flux';
// import { Placeholders } from '../../utilities/Placeholders';

class NavigationBar extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    UNSAFE_componentWillUpdate(nextProps, nextState) {
        if (nextProps.config.appConfig
            && nextProps.config.appConfig.menubar &&
            nextProps.config.appConfig.menubar.items != this.state.items) {
            this.setState({
                items: nextProps.config.appConfig.menubar.items
            })
        }
    }

    renderNavBar = () => {

        let { items } = this.state;

        // if (!items || items.length < 1) {
        //     var placeholders = [];
        //     for (var i = 0; i < 4; i++) {
        //         placeholders.push(
        //         <View key={i}
        //             style={styles.navBarItemContainer}>
        //                 <Placeholders type="cir-media-col-text" />
        //         </View>)
        //     }

        //     return placeholders;
        // }

        items = items.map((item, key) => {
            if (item.type === "dashboard") {
                return (
                    <TouchableOpacity key={key}
                        style={styles.navBarItemContainer}>
                        {getIcon(item, this.props.theme)}
                        <NormalText
                            style={[styles.navBarItem, {color: item.active ? '#0062cc' : ''},{ fontWeight: item.active ? 'bold' : 'normal' }]}>
                            {item.title}</NormalText>
                    </TouchableOpacity>);
            } else if (item.type === "module") {
                return (
                    <TouchableOpacity key={key}
                        onPress={() => Actions.search()}
                        style={styles.navBarItemContainer}>
                        {getIcon(item, this.props.theme)}
                        <NormalText
                            style={[styles.navBarItem]}>
                            {item.title}</NormalText>
                    </TouchableOpacity>);
            }
        })

        return items;
    }

    render() {
        return (
            <ThemeProvider theme={this.props.theme.theme}>
                <BottomBar style={styles.navBar}>
                    {this.state.items.length > 0 && this.renderNavBar()}
                </BottomBar>
            </ThemeProvider>
        );
    }
};

const styles = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        height: 60,
        paddingTop: 5,
        justifyContent: 'space-around',
        borderTopWidth: 1,
    },
    navBarItemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    navBarItem: {
        fontSize: 15,
        paddingVertical: 5,
    }
});
const mapStateToProps = (state) => {
    return {
        config: state.navigationDetails
    }
}
export default connect(mapStateToProps, null)(NavigationBar);