import React, {useContext, useState}  from 'react';
import {StyleSheet} from 'react-native';
import {Image, Text, View } from 'react-native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import FormTextInput from '../components/FormInput';
import Colors, { PRIMARY } from '../constants/Colors'
import ButtonForm from '../components/ButtonForm';
import { Alert } from 'react-native';
import { AuthNavProps } from '../navigation/AuthStack/AuthParamList';
import { AuthContext } from '../navigation/Providers/AuthProvider';

const RegisterScreen = ({ navigation, route }: AuthNavProps<"Register">) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, register } = useContext(AuthContext);

  const onPressRegister = () => {register({first_name: firstName, last_name: lastName, email, password})};
  const onPressLogin = () => {navigation.replace('Login')};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
            style={styles.logo}
            source={require('../assets/images/logo_dog.png')}
          />
        <Text style={styles.heading}>WALK DOGGERS</Text>
      </View>

      
      <View style={styles.form}>

        <Text style={styles.login}>Register</Text>

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

        

        <View style={styles.separator}></View>

        <ButtonForm
          title={"Register"}
          onClickHandler={onPressRegister}
          primary={true}
          testId="reg"
        />
        <ButtonForm
          title={"Login"}
          onClickHandler={onPressLogin}
          primary={false}
          testId="log"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY,
  },
  form: {
    backgroundColor: PRIMARY,
    justifyContent: 'center',
    padding:20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginBottom: 20,
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
    fontSize: 40,
  },
  logo: {
    width: 110,
    height: 110,
  },
  login: {
    fontFamily: 'red-hat-text-500',
    color: 'white',
    fontSize: 40,
    marginBottom:26,
  },
  label: {
    fontFamily: 'red-hat-text-500',
    color: 'white',
  }

});

export default RegisterScreen;
