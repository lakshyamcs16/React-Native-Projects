import React, { Component } from 'react';
import {
    StyleSheet,
} from 'react-native';
import { TopBar, StyledIonicons } from '../../themes/styling';
import { Actions } from 'react-native-router-flux';

class InnerNavBar extends Component<{}> {

    render() {
        return (
            <TopBar style={styles.navBarContainer}>
                    <StyledIonicons
                        name="ios-arrow-back"
                        size={30}
                        onPress={() => { Actions.pop(); }}
                        style={styles.navBarLeftIcon} />
            </TopBar>

        );
    }
}

const styles = StyleSheet.create({
    navBarContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 6
    },
    navBarContainerWithoutFilter: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        paddingVertical: 5
    },
    navBarLeftIcon: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginLeft: 15,
        marginTop: 7
    },
    navBarRightIcon: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingRight: 10
    },
    navBarTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarTitleWithoutFilter: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
    }
});

export default InnerNavBar;
