import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Inicio from '../chat/Inicio';
import { Pressable,Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { API_NAME } from "@env";
import Nuevo from '../chat/Nuevo';
const ChatTabStack = createNativeStackNavigator();

export default function ChatStack({navigation}) {
  return (
    <ChatTabStack.Navigator screenOptions={{ 
        headerStyle: {
          backgroundColor: '#0369a1',
        },
        headerTintColor: '#fff',
       }} >
        <ChatTabStack.Screen name="InicioChat" component={Inicio} options={{ 
            title:API_NAME,
            headerRight:()=>(
                <Pressable onPress={()=>navigation.navigate('NuevoChat')}>
                    <Icon as={AntDesign} name="plus" size={6} color="white"></Icon>
                </Pressable>
            )
           }} />
        <ChatTabStack.Screen name="NuevoChat" component={Nuevo} options={{ 
            title:"Nuevo chat"
         }}/>
      </ChatTabStack.Navigator>
  )
}
