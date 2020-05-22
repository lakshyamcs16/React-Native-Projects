import React, { Component } from 'react';
import {
    StyleSheet,
    Alert
} from 'react-native';
import { fetchWidgetData, dataRequest } from '../../redux/actions/dashboard/main.actions';
import { GENERIC_DATA_ERROR } from '../../utilities/Constants';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Actions } from 'react-native-router-flux';
import {
    getCards,
    getKeyHash
} from '../assets/scrollview/ScrollViewAssets';
var hash = require('object-hash');
var mustache = require("mustache");
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class ScrollViewWidget extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {

        const body = {
            "Select": {
                "'Entity State'": 1,
                "Probability": "sum(Probability)",
                "Amount": "sum(Amount)",
                "ExpectedRevenue": "sum(ExpectedRevenue)"
            },
            "GroupBy": {
                "'Entity State'": 1
            }
        };

        console.log("********************************************************");

        console.log("********************************************************");

        var params = {
            body: this.props.service || body,
            token: this.props.token
        };

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
            params: {
                dashboardId: 'needs-analysis-dash',
                filter: `{ 
                "'Entity State'": "{{Entity State}}"
            }`,
                dataId: getKeyHash(item._id)
            }
        }

        var f = this.state.data.filter(d => {
            return getKeyHash(d._id) == params.params.dataId
        })
        var st = mustache.render(params.params.filter, f[0]);
        console.log(entities.decode(st));

        params.dashboardConfigId = params.params.dashboardId;
        params.token = props.token;
        params.service = {
            body: {
                "Where": JSON.parse(entities.decode(st))
            }
        };

        Actions.canvas(params);
    }

    render() {
        var params = {};
        params.onPressHandler = this.navigateScreen;
        params.styles = viewStyles;

        return (
            this.state.data.length > 0 &&
            <SwipeListView style={[styles.container]}
                data={this.state.data}
                renderItem={(data, rowMap) => (
                    getCards(data.item, this.props, this.state.data, params)
                )}
                keyExtractor={(data, index) => index}
            // renderHiddenItem={(data, rowMap) => (
            //     <View style={styles.rowBack} key={this.getKeyHash(data.item._id)}>

            //         <Text></Text>
            //         <Text></Text>
            //     </View>
            // )}
            // leftOpenValue={1}
            // rightOpenValue={-1}
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

export default connect(mapStateToProps, dispatchStateToProps)(ScrollViewWidget);