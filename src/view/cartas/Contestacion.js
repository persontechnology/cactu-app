import { Box, Link, Center, FormControl, WarningOutlineIcon, Input, ScrollView, VStack, Pressable, Avatar, Text, useToast, Button, Icon, View, HStack, CheckIcon } from 'native-base'
import React, { useState, useContext, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import { AuthContext } from "../../service/AuthContext";
import { API_URL } from "@env";
import { Entypo } from "@native-base/icons";
import ReactNativeBlobUtil from 'react-native-blob-util';


export default function Contestacion({ navigation, route }) {
    const { estado, archivo, id, tipo_carta_nombre } = route.params;
    const { userId, userToken, } = useContext(AuthContext);
    const [cargando, setcargando] = useState(false);
    const toast = useToast();
    useEffect(() => {
        navigation.setOptions({ title: "Carta de " + tipo_carta_nombre })
    }, []);


    const [cantidadTexto, setcantidadTexto] = useState(0);
    const [texto, settexto] = useState('');
    const [fotoPersonal, setfotoPersonal] = useState("https://www.seekpng.com/png/full/50-500887_canton-of-lucerne.png");
    const [fotoPersonalBase, setfotoPersonalBase] = useState('');

    async function tomarFotoPersonal() {
        try {
            await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                includeBase64: true
            }).then(image => {
                setfotoPersonal(image.path)
                setfotoPersonalBase(image.data)
            });
        } catch (error) {

        }
    }

    const acceder = async () => {
        if (texto.length > 0 && fotoPersonalBase.length > 0) {
            setcargando(true);

            try {
                const res = await ReactNativeBlobUtil.fetch('POST', API_URL + "responder-otras-cartas", {
                    'Authorization': `Bearer ${userToken}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'multipart/form-data',
                }, [
                    // element with property `filename` will be transformed into `file` in form data
                    { name: 'userId', data: userId.toString() },
                    { name: 'buzonCartaId', data: id.toString() },
                    { name: 'foto', filename: 'personal.png', data: fotoPersonalBase },
                    { name: 'respuesta', data: texto.toString() },
                ]);
                const result = await res.json();
                console.log(result)
                if (result.errors) {
                    var errores = "";
                    Object.entries(result.errors).forEach(([key, value]) => {
                        errores += value.toString();
                    });
                    toast.show({ 'description': errores });
                }

                if (result.error) {
                    toast.show({ 'description': result.error });
                }

                if (result.info) {
                    toast.show({ 'description': result.info });
                }

                if (result.success) {
                    toast.show({ 'description': result.success });
                    navigation.navigate({
                        name: 'Inicio',
                        params: { estado: (Math.random() + 1).toString(36).substring(7) }
                    })
                }

            } catch (error) {
                toast.show({ 'description': error.toString() })
            } finally {
                setcargando(false);
            }
        } else {
            toast.show({ 'description': 'Complete datos.' })
        }
    }


    return (
        <Center flex={1}>
            {
                estado === 'Respondida' ? (
                    <View>
                        <HStack space={2} my={3}>
                            
                            <Text color="emerald.500" fontSize="md">
                                Carta ya fue respondida.!
                            </Text>
                        </HStack>
                        <Button onPress={() => navigation.goBack()} colorScheme={"success"} leftIcon={<Icon as={Ionicons} name="home" size="sm" />}>
                            Regresar
                        </Button>

                    </View>
                ) : (
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }} bg="white">

                        <Box mx={3} minWidth="95%">
                            <FormControl isInvalid={true}>
                                <FormControl.Label>Redacte aquí..</FormControl.Label>
                                <Input numberOfLines={5} value={texto} onChangeText={(val) => {
                                    settexto(val)
                                    setcantidadTexto(580 - (val.slice(0, -1).length));

                                }} maxLength={580} multiline={true} editable={true} placeholder="Redacte aquí ..." />
                                <FormControl.ErrorMessage>
                                    {cantidadTexto}
                                </FormControl.ErrorMessage>
                            </FormControl>
                            <Center>
                                <VStack space={5} my={2}>
                                    <Pressable onPress={tomarFotoPersonal}>
                                        <Box>
                                            <Center>
                                                <Avatar bg="green.500" source={{
                                                    uri: fotoPersonal
                                                }}>
                                                    AJ
                                                </Avatar>
                                                <Text>{"Foto"}</Text>
                                            </Center>
                                        </Box>

                                    </Pressable>
                                </VStack>
                            </Center>
                            <Button mt="2" onPress={acceder} isLoading={cargando} isLoadingText="Enviando" colorScheme={cargando ? 'secondary' : 'success'} variant={"solid"} leftIcon={
                                <Icon as={Entypo} name="mail"></Icon>
                            }>
                                Enviar respuesta
                            </Button>


                            {
                                archivo != 'no' ? <Link mt={4} href={archivo}>
                                    Click aquí para descargar archivo de patrocinador.
                                </Link> : <></>
                            }

                        </Box>
                    </ScrollView>
                )
            }
        </Center>
    )
}
