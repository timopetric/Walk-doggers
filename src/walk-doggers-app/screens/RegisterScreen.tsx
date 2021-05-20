import React, {useContext, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Image, Text, View} from 'react-native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import FormTextInput from '../components/FormInput';
import Colors, {PRIMARY} from '../constants/Colors'
import ButtonForm from '../components/ButtonForm';
import {Alert} from 'react-native';
import {AuthNavProps} from '../navigation/AuthStack/AuthParamList';
import AuthContext from "../navigation/AuthContext";

const RegisterScreen = ({navigation, route}: AuthNavProps<"Register">) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signUp} = useContext(AuthContext);

    const onPressRegister = () => {
        signUp({firstName, lastName, email, password})
    };
    const onPressLogin = () => {
        navigation.replace('Login')
    };

    return (

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>


                <View behavior="position" style={styles.form}>

                    <Text style={styles.login}>Sign Up</Text>

                    <Text style={styles.label}>FIRST NAME</Text>
                    <FormTextInput
                        setValue={setFirstName}
                        placeholder="Enter your firstname"
                        testId="fn"
                        secureTextEntry={false}
                    />

                    <Text style={styles.label}>LAST NAME</Text>
                    <FormTextInput
                        setValue={setLastName}
                        placeholder="Enter your lastname"
                        testId="ln"
                        secureTextEntry={false}
                    />

                    <Text style={styles.label}>EMAIL</Text>
                    <FormTextInput
                        setValue={setEmail}
                        placeholder="Enter your email address"
                        testId="email"
                        secureTextEntry={false}
                    />

                    <Text style={styles.label}>PASSWORD</Text>
                    <FormTextInput
                        setValue={setPassword}
                        placeholder="Enter your password"
                        testId="pass"
                        secureTextEntry={true}
                    />


                    <View style={styles.separator}/>

                    <ButtonForm
                        title={"Sign Up"}
                        onClickHandler={onPressRegister}
                        primary={true}
                        testId="reg"
                    />
                    <ButtonForm
                        title={"Back To Login"}
                        onClickHandler={onPressLogin}
                        primary={false}
                        testId="log"
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:"center",
        paddingTop: 60,
        alignItems: "center",
        backgroundColor: PRIMARY,
    },
    form: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        padding: 20,
        width: 460,
        maxWidth: "100%",
        marginBottom: 40,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginBottom: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
    header: {
        alignItems: 'center',
        marginTop: 30,
    },
    heading: {
        fontFamily: 'pecita',
        color: 'white',
        fontSize: 36,
    },
    logo: {
        width: 110,
        height: 110,
    },
    login: {
        // fontFamily: 'red-hat-text-500',
        color: 'white',
        fontSize: 30,
        marginBottom: 26,
    },
    label: {
        fontFamily: 'red-hat-text-500',
        color: 'white',
        fontSize: 13,
        marginBottom: 3,
    }

});

export default RegisterScreen;
