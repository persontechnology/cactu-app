import React,{useContext, useState} from 'react'
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, useToast, Icon, ScrollView } from "native-base";
import { AuthContext } from '../../service/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { API_URL } from "@env";


export default function Nuevo({navigation}) {

    const { userId, userToken, userNombres } = useContext(AuthContext);
    const [mensaje, setmensaje] = useState('');
    const [cargando, setcargando] = useState(false);
    const toast = useToast();
    const [caracteres, setcaracteres] = useState(191);
    const acceder = async () => {
        setcargando(true);
        try {
            const res = await fetch(API_URL + "guardar-mensaje", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    userId,
                    mensaje
                })
            });
            const result = await res.json();

            if (result.errors) {
                var errores = "";
                Object.entries(result.errors).forEach(([key, value]) => {
                    errores += value.toString();
                });
                toast.show({ 'description': errores });
            }

            if(result.info){
                toast.show({ 'description': result.info })
            }
            if(result.success){
                navigation.navigate({
                    name: 'InicioChat',
                    params: { estado: (Math.random() + 1).toString(36).substring(7) }
                })
            }

        } catch (error) {
            toast.show({ 'description': error.toString() })
        } finally {
            
            setcargando(false);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow:1 }}>
        <Center minWidth={"95%"} flex={1}>
            <Box safeArea p="2" py="8" >
                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                    color: "warmGray.50"
                }}>
                    {userNombres}
                </Heading>
                <Heading mt="1" _dark={{
                    color: "warmGray.200"
                }} color="coolGray.600" fontWeight="medium" size="xs">
                ¿Tienes inquietudes?. Dejanos un mensaje, tu gestor te ayudará con gusto.    
                </Heading>
                

                <VStack space={3} mt="5">
                    <FormControl isRequired isInvalid>
                        <FormControl.Label>Mensaje</FormControl.Label>
                        <Input maxLength={191} multiline numberOfLines={4} value={mensaje} onChangeText={(val)=>{
                            setmensaje(val);
                            setcaracteres(191-(val.slice(0,-1).length));
                            
                        }}/>
                        <FormControl.ErrorMessage>
                            {caracteres}
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <Button mt="2" isLoading={cargando} onPress={acceder} isLoadingText="Enviando" colorScheme="info" leftIcon={<Icon as={FontAwesome} name="send"></Icon>}>
                        Enviar
                    </Button>
                </VStack>
            </Box>
        </Center>
        </ScrollView>
    )
}
