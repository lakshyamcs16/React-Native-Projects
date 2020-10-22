import React, { Component } from 'react';
import {
    StyleSheet,
    Alert,
    Text,
    View,
    Animated
} from 'react-native';
import { fetchWidgetData, dataRequest } from '../../redux/actions/dashboard/main.actions';
import { GENERIC_DATA_ERROR } from '../../utilities/Constants';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Actions } from 'react-native-router-flux';
import {
    getCards
} from '../assets/scrollview/ScrollViewAssets';
import { getAction, getKeyHash, buildDataRequest } from '../../utilities/Utilities';

var hash = require('object-hash');
var mustache = require("mustache");
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

const AnimatedSwipeListView = Animated.createAnimatedComponent(SwipeListView);
class ScrollViewWidget extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        const dataConfig = this.props.wConfig.dataConfig;        
        var params = buildDataRequest(dataConfig);
        const response = await this.props.fetchWidgetData(params);

        try {
            if (!response.success) {
                throw response;
            } else {
                this.setState({
                    data: response.body
                });
            }
        } catch (error) {
            Alert.alert(
                'Data Error',
                GENERIC_DATA_ERROR,
                [
                    {
                        text: 'Okay',
                        onPress: () => console.log('Okay Pressed'),
                        style: 'cancel',
                    },
                ]
            );
        }
    }

    navigateScreen = (item) => {

        var params = {
            navigate:  Actions.canvas
        }
        
        
        getAction(this.props.wConfig.actions, getKeyHash(item._id), this.state.data, props.token, params);
    }

    render() {
        var params = {};
        params.onPressHandler = this.navigateScreen;
        params.styles = viewStyles;
        params.index = 0;
        return (
            this.state.data.length > 0 &&
            <AnimatedSwipeListView style={[styles.container]}
                previewFirstRow={true}
                data={this.state.data}
                renderItem={(data, rowMap) => {
                    params.index++;
                    return getCards(data.item, this.props, this.state.data, params)
                }}
                // keyExtractor={(data, index) => index.toString()}
                // renderHiddenItem={(data, rowMap) => (
                //     <View style={styles.rowBack} key={getKeyHash(data.item._id)}>

                //         <Text></Text>
                //         <Text></Text>
                //     </View>
                // )}
                // leftOpenValue={100}
                // rightOpenValue={-100}
            />


        );
    }
}

const viewStyles = {
    container: {
        margin: 5
    },
    cardContainer: {
        margin: 1,
        paddingVertical: 15
    },
    columnStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'baseline'
    },
    keyStyle: {
        alignItems: 'baseline',
    },
    forwardArrow: {
        marginRight: 20,
        marginTop: 30
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 1,
        borderRadius: 5
    }
};

const styles = StyleSheet.create(viewStyles);

const mapStateToProps = (state) => {
    return {
        storeData: state.dataDetails.data,
        token: state.authenticationDetails.user_details.token
    }
}

const dispatchStateToProps = (dispatch) => {
    return {
        fetchWidgetData: (params) => dispatch(fetchWidgetData(params)),
        dataRequest: () => dispatch(dataRequest())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(ScrollViewWidget);