import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Shine
} from "rn-placeholder";
import React from 'react';

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
              
        default:
            break;
    }
}