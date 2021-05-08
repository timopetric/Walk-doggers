import * as React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";
import Colors from '../constants/Colors';

interface Props {
    value: string
    setValue: any
    placeholder: string
    //props: any
};

const FormTextInput: React.FC<Props>= ({value, setValue, placeholder}) => {
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
    height: 48,
    padding: 1,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    paddingHorizontal: 10,
  },
});

export default FormTextInput;