import * as React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import Colors from '../constants/Colors';

interface Props {
    value: string
    setValue: any
    placeholder: string
};

const ButtonForm: React.FC<Props>= ({value, setValue, placeholder}) => {
    return (
        <>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder={placeholder}
            />
        </>
    );
  };

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "#fff",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
  },
});

export default ButtonForm;