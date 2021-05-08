import React, {useState}  from 'react';
import {StyleSheet} from 'react-native';
import {Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import FormTextInput from '../components/FormInput';
import { Header } from 'react-native/Libraries/NewAppScreen';
import Colors, { PRIMARY } from '../constants/Colors'
const LoginScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'Login'>) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onPress = () => {navigation.navigate('Root')};


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
        <Text>Log in</Text>
        <Text>EMAIL</Text>
        <FormTextInput 
          value={email}
          setValue={setEmail}
          placeholder="Enter your email address"

        />

        <Text>PASSWORD</Text>
        <FormTextInput
            value={password}
            setValue={setPassword}
            placeholder="Enter your password"
        />
      
        <TouchableOpacity
                style={styles.button}
                onPress={onPress}
        >
        <Text>Press Here</Text>
      </TouchableOpacity>
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
    marginVertical: 30,
    height: 1,
    width: '80%',
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
    fontFamily: 'r',
    color: 'white',
    fontSize: 40,
  },

});

export default LoginScreen;