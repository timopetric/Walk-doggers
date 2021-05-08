import * as React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from '../constants/Colors';
import { Button } from 'react-native-elements';
interface Props {
    title: string
    onClickHandler: any
};

const ButtonForm: React.FC<Props>= ({title, onClickHandler}) => {
    return (
        <>
            <TouchableOpacity onPress={onClickHandler} style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>{title}</Text>
            </TouchableOpacity>
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

export default ButtonForm;