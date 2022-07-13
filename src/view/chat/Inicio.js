import React, { useState,useEffect,useContext } from "react";
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, } from "native-base";
import { RefreshControl } from "react-native";
import { API_URL } from "@env";
import { AuthContext } from "../../service/AuthContext";
export default function Inicio({navigation,route})  {
   
    const [data, setdata] = useState([]);
    const { userId, userToken, userNombres } = useContext(AuthContext);
    const [refreshing, setRefreshing] = useState(false);

    const acceder = async () => {
        setRefreshing(true);
        try {
            const res = await fetch(API_URL + "listar-mis-chats", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`
                },
                body: JSON.stringify({
                    userId
                })
            });
            const result = await res.json();
            setdata(result)

        } catch (error) {
            toast.show({ 'description': error.toString() })
        } finally {
            
            setRefreshing(false)
        }
    }

    useEffect(() => {
        acceder();
        // actualizar listado
        if(route.params?.estado){
            acceder();
        }
    }, [route.params?.estado])

    return (
        
            <Center flex={1} px="3">
                <Box maxW="100%" rounded="lg" mt={1} overflow="hidden" borderColor="coolGray.200" borderWidth="1" _light={{
            backgroundColor: "gray.50"
        }}>
                    <Heading fontSize="xl" p="4" pb="3">
                        Mensajes enviados
                    </Heading>
                    <FlatList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={acceder}></RefreshControl>} data={data} renderItem={({
                        item
                    }) => <Box borderBottomWidth="1" mx={2} _dark={{
                        borderColor: "gray.600"
                    }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                            <HStack space={3} justifyContent="space-between">
                                <VStack>
                                    <Text color="coolGray.800" fontSize={"md"}>
                                        {item.mensaje}
                                    </Text>
                                    <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start">
                                    {"Enviado el "+item.fecha}
                                </Text>
                                </VStack>
                            </HStack>
                        </Box>} keyExtractor={item => item.id} />
                </Box>
            </Center>
        
    );
};
