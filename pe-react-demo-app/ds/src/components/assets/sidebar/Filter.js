import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Background, NormalText } from '../../../themes/styling';
import { Divider, List } from 'react-native-paper';
import { StyledMaterialIcon } from '../../../themes/styling';

class Filter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            icons: [
                {
                    id: "1",
                    icon: "check-box"
                },
                {
                    id: "1.1",
                    icon: "check"
                },
                {
                    id: "1.2",
                    icon: "check"
                }
            ]
        }
    }

    toggleCheck = (id, icon, p) => {

        console.log("id " +id);
        
        const idx = this.state.icons.find(i => i.id === id);


        if ((p && idx.icon === "check-box") || (!p && idx.icon.length > 0) ) {
            var ics = this.state.icons;

            if (p) {
                ics = this.state.icons.map((i, k) => {
                    let its = i.id.split(".");
                    if (its && its[0] === id && i.id !== idx.id) {
                        i.icon = '';
                    }else{
                        i.icon = 'check-box-outline-blank';
                    }
                    return i;
                })
            }else{
                idx.icon = '';
            }


            this.setState({
                icons: ics
            })
        } else {
            var ics = [];
            ics = this.state.icons.map((i, k) => {
                console.log(i);

                let its = i.id.split(".");

                console.log(its);
                if (p) {
                    if (its && its[0] === id && idx.id !== i.id) {
                        i.icon = 'check';
                    } else {
                        i.icon = 'check-box';
                    }
                }else if(i.id === idx.id){
                        i.icon = 'check';
                }

                return i;
            })

            this.setState({
                icons: ics
            })
        }
    }

    handleCheck = (id, p) => {
        return this.state.icons.find(i => i.id === id).icon;
    }
    render() {
        return (
            <ThemeProvider theme={this.props.theme}>
                <Background style={{ flex: 1, shadowColor: '#000000', shadowOffset: { width: 100 } }}>

                    <List.AccordionGroup>
                        <List.Section>
                            <List.Subheader>Fund Details</List.Subheader>
                            <View style={{ flexDirection: 'row' }}>
                                <StyledMaterialIcon onPress={() => this.toggleCheck("1", "check-box", true)} name={this.handleCheck("1", true)} size={30} style={{ paddingTop: 15, paddingLeft: 15 }} />
                                <List.Accordion
                                    title="Funds"
                                    style={{ width: 253 }}
                                    id="1">
                                    <List.Item
                                        onPress={() => this.toggleCheck("1.1")}
                                        title="RSC Capital"
                                        description="Rocksprings Capital fund"
                                        left={props => <List.Icon {...props} icon={this.handleCheck("1.1")} />}
                                    />
                                    <List.Item
                                        onPress={() => this.toggleCheck("1.2")}
                                        title="Aequim"
                                        description="Aequim Corporation"
                                        left={props => <List.Icon {...props} icon={this.handleCheck("1.2")} />}
                                    />
                                </List.Accordion>
                            </View>
                            <List.Accordion title="Accordion 2" id="2">
                                <List.Item
                                    title="Item 2"
                                    onPress={() => this.toggleCheck("2")}
                                    left={props => <List.Icon {...props} icon={this.handleCheck("2")} />}
                                />
                            </List.Accordion>
                        </List.Section>
                        <Divider />
                        <List.Section>
                            <List.Subheader>Strategy</List.Subheader>
                            <List.Accordion title="Accordion 3" id="3">
                                <List.Item title="Item 3"
                                    onPress={() => this.toggleCheck("3")}
                                    left={props => <List.Icon {...props} icon={this.handleCheck("3")} />} />
                            </List.Accordion>
                        </List.Section>
                    </List.AccordionGroup>
                </Background>
            </ThemeProvider>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        sidebar: state.navigationDetails.appConfig,
        theme: state.themeDetails
    }
}
const styles = StyleSheet.create({

});
export default connect(mapStateToProps, null)(Filter);