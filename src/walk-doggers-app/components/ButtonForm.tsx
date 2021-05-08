import * as React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors, { PRIMARY, PRIMARY_DARKER } from '../constants/Colors';
import { Button } from 'react-native-elements';
import styled from 'styled-components/native'


interface Props {
    title: string
    onClickHandler: any
    primary: boolean
};



const ButtonForm: React.FC<Props>= ({title, onClickHandler, primary}) => {
    return (
        <>
            {/*<TouchableOpacity onPress={onClickHandler} style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>{title}</Text>
            </TouchableOpacity>
          */}
            <ButtonContainer onPress={onClickHandler} primary={primary}>
              <ButtonText primary={primary}>{title}</ButtonText>
            </ButtonContainer>
        </>
    );
  };

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 6,
    shadowColor: '#000',
    color:'black',
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
  },
  appButtonContainer: {
    marginTop: 22,
    height: 48,
    elevation: 8,
    backgroundColor: "white",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center'
  },
  appButtonText: {
    fontSize: 18,
    color: "#8265F3",
    alignSelf: "center",
    fontFamily: 'red-hat-text-500'
  }
});

type StyleProps = {
  primary: boolean
}
const ButtonContainer = styled.TouchableOpacity<StyleProps>`
  height: 48px;
  margin-vertical: 10px;
  padding-vertical: 10px;
  padding-horizontal: 10px;
  align-items: center;
  border-radius: 6px;
  elevation:8;
  background-color: ${props => props.primary ? "white" : PRIMARY_DARKER};
`;
const ButtonText = styled.Text<StyleProps>`
  font-size: 18px;
  color: ${props => props.primary ? "#8265F3" : "white"  };;
  align-self:center;
  font-family: 'red-hat-text-500';

`
export default ButtonForm;