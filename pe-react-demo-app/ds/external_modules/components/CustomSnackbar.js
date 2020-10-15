import React, { PureComponent } from 'react'
import {
  View,
  Text
} from 'react-native';

class CustomSnackbar extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            
        }
    }

    render() {
        return (
            <View>
                <Text>Hello.. {this.props.user}</Text>
            </View>
        )
    }
}

export default CustomSnackbar;