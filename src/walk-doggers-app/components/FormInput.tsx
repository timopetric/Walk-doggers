import * as React from "react";
import { StyleSheet, TextInput} from "react-native";

interface Props {
    setValue: any
    placeholder: string
    testId: string
    secureTextEntry: boolean
};

const FormTextInput: React.FC<Props>= ({setValue, placeholder, testId, secureTextEntry}) => {
    return (
        <>
            <TextInput
                style={styles.input}
                onChangeText={setValue}
                placeholder={placeholder}
                placeholderTextColor="rgba(255, 255, 255, 0.5)" 
                testID={testId}
                secureTextEntry={secureTextEntry}
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