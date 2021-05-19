import React, {useContext, useState} from 'react';
import {Keyboard, KeyboardAvoidingView, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Image, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../types';
import FormTextInput from '../components/FormInput';
import {Header} from 'react-native/Libraries/NewAppScreen';
import Colors, {PRIMARY} from '../constants/Colors'
import ButtonForm from '../components/ButtonForm';
import {AuthNavProps} from '../navigation/AuthStack/AuthParamList';
import AuthContext from "../navigation/AuthContext";
// import {AuthContext} from "../navigation/Providers/AuthProvider";

const LoginScreen = ({navigation, route}: AuthNavProps<"Login">) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const { user, login } = useContext(AuthContext);
    const {signIn} = useContext(AuthContext)

    const onPressLogin = () => {
        signIn({email, password})
    };
    const onPressRegister = () => {
        navigation.navigate('Register')
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.header}>
                    <Image
                        style={styles.logo}
                        source={require('../assets/images/logo_dog.png')}
                    />
                    <Text style={styles.heading}>WALK DOGGERS</Text>
                </View>


                <View style={styles.form}>

                    <Text style={styles.login}>Login</Text>

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
                        title={"Login"}
                        onClickHandler={onPressLogin}
                        primary={true}
                        testId={"log"}
                    />
                    <ButtonForm
                        title={"Sign Up"}
                        onClickHandler={onPressRegister}
                        primary={false}
                        testId="reg"
                    />
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY,
        alignItems: "center"
    },
    form: {
        backgroundColor: PRIMARY,
        justifyContent: 'center',
        padding: 20,
        width: 460,
        maxWidth: "100%"
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
        marginTop: 80,
    },
    heading: {
        fontFamily: 'pecita',
        color: 'white',
        fontSize: 36,
    },
    logo: {
        width: 110,
        height: 110,
        marginBottom: 10
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

export default LoginScreen;
