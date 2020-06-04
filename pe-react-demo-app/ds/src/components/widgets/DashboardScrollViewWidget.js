import React, { Component } from 'react';
import {
    StyleSheet,
    Alert
} from 'react-native';
import { fetchWidgetData, dataRequest } from '../../redux/actions/dashboard/main.actions';
import { GENERIC_DATA_ERROR } from '../../utilities/Constants';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
    getCards
} from '../assets/scrollview/ScrollViewAssets';
import {getFilledObject, buildDataRequest} from '../../utilities/Utilities';

class DashboardScrollViewWidget extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {
        const dataConfig = this.props.wConfig.dataConfig;        
        dataConfig.params.body = getFilledObject(this.props.id, this.props.prevData, dataConfig.params.body);
        console.log(JSON.stringify(dataConfig.params.body, null, 2));
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

    render() {
        var params = {};
        params.styles = viewStyles;

        return (
            this.state.data.length > 0 &&
            <SwipeListView style={[styles.container]}
                data={this.state.data}
                renderItem={(data, rowMap) => (
                    getCards(data.item, this.props, this.state.data, params)
                )}
                keyExtractor={(data, index) => index.toString()}

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
        paddingVertical: 20
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
        data: state.dataDetails.data,
        token: state.authenticationDetails.user_details.token
    }
}

const dispatchStateToProps = (dispatch) => {
    return {
        fetchWidgetData: (params) => dispatch(fetchWidgetData(params)),
        dataRequest: () => dispatch(dataRequest())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(DashboardScrollViewWidget);