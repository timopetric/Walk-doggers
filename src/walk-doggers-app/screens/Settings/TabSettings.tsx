import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from 'react-native';
import { AntDesign, Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import {Card} from "react-native-elements";

const mainColor = '#303030';

export default function TabSettings({navigation} : any) {

  return (
    <View style={styles.container}>
      <Card wrapperStyle={styles.cardWrapper} containerStyle={styles.cardContainer}>
        <View style={{flexDirection: 'row'}}>
          <Ionicons size={30} name="person" color={mainColor} />
          <Text style={{marginLeft: 5}}>Profile</Text>
        </View>
        <AntDesign onPress={() => navigation.navigate('EditProfileScreen')} size={30} name="right" color={mainColor} style={{justifyContent: 'flex-end'}} />
      </Card>

      <Card wrapperStyle={styles.cardWrapper} containerStyle={styles.cardContainer}>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome5 size={30} name="dog" color={mainColor} />
          <Text style={{marginLeft: 5}}>My Dogs</Text>
        </View>
        <AntDesign onPress={() => alert('TODO implement')} size={30} name="right" color={mainColor} style={{justifyContent: 'flex-end'}} />
      </Card>

      <Card wrapperStyle={styles.cardWrapper} containerStyle={styles.cardContainer}>
        <View style={{flexDirection: 'row'}}>
          <FontAwesome size={30} name="newspaper-o" color={mainColor} />
          <Text style={{marginLeft: 5}}>Become a Reporter</Text>
        </View>
        <AntDesign onPress={() => navigation.navigate('BecomeAReporterScreen')} size={30} name="right" color={mainColor} style={{justifyContent: 'flex-end'}} />
      </Card>

      <Card wrapperStyle={styles.cardWrapper} containerStyle={styles.cardContainer}>
        <View style={{flexDirection: 'row'}}>
          <Ionicons size={30} name="exit-outline" color={mainColor} />
          <Text style={{marginLeft: 5}}>Logout</Text>
        </View>
        <AntDesign testID="logoutBtn" onPress={() => navigation.replace('Login') } size={30} name="right" color={mainColor} style={{justifyContent: 'flex-end'}} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '80%',
  },
  cardWrapper: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container: {
    flex: 1,
    alignItems: 'center',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
