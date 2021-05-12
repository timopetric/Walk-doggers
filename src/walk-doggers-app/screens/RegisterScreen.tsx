import React, {useState}  from 'react';
import {StyleSheet} from 'react-native';
import {Image, Text, View } from 'react-native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import FormTextInput from '../components/FormInput';
import Colors, { PRIMARY } from '../constants/Colors'
import ButtonForm from '../components/ButtonForm';
import { Alert } from 'react-native';

const RegisterScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'Register'>) => {
  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const onPressRegister = () => {navigation.replace('Root')};
  const onPressLogin = () => {navigation.replace('Login')};

  const sendUserData = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({email: email, password: password, first_name: firstName, last_name: lastName})
    };
    const response = await fetch('localhost/auth/register', requestOptions);
    const data = await response.json();
    return data;
  }
  
  const register = async () => {
    if(firstName && lastName && email && password){
      try {
        const userJwt = "bla";
        if (userJwt) {
          Alert.alert(JSON.stringify(userJwt));
        }
      } catch (e){
        console.log(e);
      }
    } else {
      Alert.alert("Error", "Missing Fields");
    }
    
  }
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
          value={firstName}
          setValue={setFirstName}
          placeholder="Enter your firstname"
          testId="fn"
        />

        <Text style={styles.label}>LAST NAME</Text>
        <FormTextInput
          value={lastName}
          setValue={setLastName}
          placeholder="Enter your lastname"
          testId="ln"
        />

        <Text style={styles.label}>EMAIL</Text>
        <FormTextInput 
          value={email}
          setValue={setEmail}
          placeholder="Enter your email address"
          testId="email"

        />

        <Text style={styles.label}>PASSWORD</Text>
        <FormTextInput
          value={password}
          setValue={setPassword}
          placeholder="Enter your password"
          testId="pass"
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
