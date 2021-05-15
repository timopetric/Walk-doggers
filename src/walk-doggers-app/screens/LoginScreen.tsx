import React, {useState}  from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import FormTextInput from '../components/FormInput';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Colors, { PRIMARY } from '../constants/Colors'
import ButtonForm from '../components/ButtonForm';
const LoginScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'Login'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onPressLogin = () => {navigation.replace('Root')};
  const onPressRegister = () => {navigation.navigate('Register')};

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
            style={styles.logo}
            source={require('../assets/images/logo_dog.png')}
          />
        <Text style={styles.heading}>WALK DOGGERS</Text>
      </View>

      
      <View style={styles.form}>

        <Text style={styles.login}>Log in</Text>

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
          title={"Login"}
          onClickHandler={onPressLogin}
          primary={true}
          testId={"log"}
        />
        <ButtonForm
          title={"Register"}
          onClickHandler={onPressRegister}
          primary={false}
          testId="reg"
        />
      </View>
    </ScrollView>
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
    marginTop: 80,
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

export default LoginScreen;
