import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Shine,
    Fade
} from "rn-placeholder";
import {
    View
} from 'react-native';
import React from 'react';
import { WIDGET_TYPE_KEY_INFO } from "./Constants";

export const Placeholders = (props) => {
    switch (props.type) {
        case "cir-media-col-text":
            if(props.hasStyles) {
                return(
                    <Placeholder Animation={Shine} useNativeDriver={true}>
                        <PlaceholderMedia style={props.styles.mediaContainer}/>
                        <PlaceholderLine style={props.styles.lineContainer}/>
                    </Placeholder>);  
            }else{
                return(
                    <Placeholder Animation={Shine} useNativeDriver={true}>
                        <PlaceholderMedia style={{ borderRadius: 20, height: 40, width: 40 }}/>
                        <PlaceholderLine style={{ width: 50, marginTop: 5}}/>
                    </Placeholder>);  
            }
        case WIDGET_TYPE_KEY_INFO:
            return getKeyLabelPlaceholder(2,3, props.keyStyles);
    
        default:
            break;
    }
}

function getKeyLabelPlaceholder(rows=2, cols=3, keyStyles) {
    let row_res=[];
    let col_res=[];
    for(let i=0; i<rows; i++) {
            for(let j=0; j<cols; j++) {
                col_res.push(
                    <Placeholder
                        key={j}
                        Animation={Fade}
                        style={keyStyles.keyStats}>
                            <PlaceholderLine width={20} styles={keyStyles.keyHeading}/>
                            <PlaceholderLine width={60} style={keyStyles.keySubHeading}/>
                        </Placeholder>
                )
            }
        row_res.push(<View  key={i} style={{flex: 3, flexDirection: 'row'}}>{col_res}</View>);
        col_res=[]
    }

    return row_res;
}