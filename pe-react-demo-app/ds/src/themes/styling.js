import styled from "styled-components";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const StyledMaterialIcon = styled(MaterialIcon)`
  color: ${props => props.theme.theme.PRIMARY_TEXT_COLOR}
`;

export const StyledIonicons = styled(Ionicons)`
  color: ${props => props.theme.theme.PRIMARY_TEXT_COLOR}
`;

export const StyledAntDesign = styled(AntDesign)`
  color: ${props => props.theme.theme.PRIMARY_TEXT_COLOR}
`;

export const StyledMaterialCommunityIcons = styled(MaterialCommunityIcons)`
  color: ${props => props.theme.theme.PRIMARY_TEXT_COLOR}
`;

export const SafeAreaView = styled.SafeAreaView`
  backgroundColor: ${props => props.theme.theme.PRIMARY_BACKGROUND_COLOR};
`;

export const LoginBackground = styled.ScrollView`
  backgroundColor: ${props => props.theme.theme.PRIMARY_BACKGROUND_COLOR};
`;

export const TopBar = styled.View`
  backgroundColor: ${props => props.theme.theme.PRIMARY_BACKGROUND_COLOR};
  borderBottomColor: ${props => props.theme.theme.PRIMARY_BORDER_COLOR};
`;
export const BottomBar = styled.View`
  backgroundColor: ${props => props.theme.theme.PRIMARY_BACKGROUND_COLOR};
  borderTopColor: ${props => props.theme.theme.PRIMARY_BORDER_COLOR};

`;

export const Background = styled.View`
  backgroundColor: ${props => props.theme.theme.PRIMARY_BACKGROUND_COLOR};
`;

export const FilterBackground = styled.View`
  backgroundColor: ${props => props.theme.theme.SECONDARY_BACKGROUND_COLOR};
`;
export const HeaderText = styled.Text`
  font-size: 24;
  color: ${props => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${props => props.theme.PRIMARY_FONT_FAMILY};
`;

export const Body = styled.View`
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${props => props.theme.PRIMARY_BACKGROUND_COLOR};
  padding-top: 30;
  padding-bottom: 30;
  padding-left: 30;
  padding-right: 30;
`;

export const Segment = styled.View`
  padding-top: 10;
  padding-bottom: 10;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
`;


export const NormalText = styled.Text`
  color: ${props => props.theme.theme.PRIMARY_TEXT_COLOR};
`;

export const Description = styled.Text`
  color: ${props => props.theme.PRIMARY_TEXT_COLOR};
  font-size: ${props => props.theme.FONT_SIZE_MEDIUM};
  font-family: ${props => props.theme.PRIMARY_FONT_FAMILY};
  padding-top: 20;
`;

export const TextInputContainer = styled.View`
  border-bottom-width: 1;
  border-bottom-color: #e0e0e0;
`;

export const LoginTextInput = styled.TextInput.attrs(
  props => ({ placeholderTextColor: props.theme.theme.PRIMARY_TEXT_COLOR })
)`
        alignSelf: stretch;
        backgroundColor: ${props => props.theme.theme.PRIMARY_TEXT_BACKGROUND_COLOR};
        borderRadius: 6px;
        paddingHorizontal: 16px;
        paddingVertical: 15px;
        fontSize: 16px;
        marginVertical: 8px;
        color:  ${props => props.theme.theme.PRIMARY_TEXT_COLOR};
        borderColor: ${props => props.theme.theme.PRIMARY_BORDER_COLOR};
        border-width: 1px;
`;

export const Footer = styled.View`
  padding-top: 20;
  padding-bottom: 20;
  padding-left: 20;
  padding-right: 20;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background-color: ${props => props.theme.PRIMARY_BACKGROUND_COLOR};
`;

export const Button = styled.TouchableOpacity`
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  elevation: 1
  border-radius: 2;
  
  background-color:${props => props.theme.PRIMARY_COLOR};
`;

export const ButtonText = styled.Text`
  text-align: center;
  color: ${props => props.theme.PRIMARY_FOREGROUND_COLOR};
  font-family: ${props => props.theme.PRIMARY_FONT_FAMILY};
  font-size: ${props => props.theme.FONT_SIZE_LARGE};
`;