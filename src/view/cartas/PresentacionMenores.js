import React, { useState, useEffect, useContext } from "react";
import { FormControl, Icon, Avatar, useToast, Input, HStack, Text, Divider, Box, WarningOutlineIcon, ScrollView, Center, NativeBaseProvider, Heading, Button, View, Pressable } from "native-base";
import ReactNativeBlobUtil from 'react-native-blob-util';
import { AuthContext } from "../../service/AuthContext";
import { API_URL } from "@env";
import { Entypo } from "@native-base/icons";
import ImagePicker from 'react-native-image-crop-picker';

export default function PresentacionMenores({navigation, params }) {

    const { userId, userToken } = useContext(AuthContext);
    const [op, setop] = useState('menor');
    const [cargando, setcargando] = useState(false);
    const toast = useToast();

    const [hola, sethola] = useState('');
    const [escribo, setescribo] = useState('');
    const [mi, setmi] = useState('');
    const [queel, setqueel] = useState('');
    const [cumple, setcumple] = useState('');
    const [noSabe, setnoSabe] = useState('');
    const [ademas, setademas] = useState('');
    const [leGusta, setleGusta] = useState('');
    const [dondeAprendo, setdondeAprendo] = useState('');
    const [gustaAprendes, setgustaAprendes] = useState('');
    const [mePaso, setmePaso] = useState("");
    const [meGustaria, setmeGustaria] = useState('');
    const [miNombre, setmiNombre] = useState('');
    const [ysoy, setysoy] = useState('');
    const [de, setde] = useState('');
    const [mifamilia, setmifamilia] = useState('');
    const [nuestraPro, setnuestraPro] = useState('');
    const [idioma, setidioma] = useState('');
    const [lugarFavorito, setlugarFavorito] = useState('');
    const [comidaTipica, setcomidaTipica] = useState('');
    const [ya, setya] = useState('');
    const [comer, setcomer] = useState('');
    const [masMeGusta, setmasMeGusta] = useState('');
    const [pregunta, setpregunta] = useState('');
    const [despedida, setdespedida] = useState('');

    const [hola_v, sethola_v] = useState('');
    const [escribo_v, setescribo_v] = useState('');
    const [mi_v, setmi_v] = useState('');
    const [queel_v, setqueel_v] = useState('')
    const [cumple_v, setcumple_v] = useState('')
    const [noSabe_v, setnoSabe_v] = useState('');
    const [ademas_v, setademas_v] = useState('');
    const [leGusta_v, setleGusta_v] = useState('')
    const [dondeAprendo_v, setdondeAprendo_v] = useState("");
    const [gustaAprendes_v, setgustaAprendes_v] = useState("");
    const [mePaso_v, setmePaso_v] = useState("");
    const [meGustaria_v, setmeGustaria_v] = useState("");  
    const [miNombre_v, setmiNombre_v] = useState('')
    const [ysoy_v, setysoy_v] = useState('');
    const [de_v, setde_v] = useState('');
    const [mifamilia_v, setmifamilia_v] = useState('');
    const [nuestraPro_v, setnuestraPro_v] = useState("");
    const [idioma_v, setidioma_v] = useState("");
    const [lugarFavorito_v, setlugarFavorito_v] = useState("");
    const [comidaTipica_v, setcomidaTipica_v] = useState("");
    const [ya_v, setya_v] = useState('');
    const [comer_v, setcomer_v] = useState("");
    const [masMeGusta_v, setmasMeGusta_v] = useState("");
    const [pregunta_v, setpregunta_v] = useState("");
    const [despedida_v, setdespedida_v] = useState("");  
    
    

    const [fotoPersonal, setfotoPersonal] = useState("https://www.seekpng.com/png/full/50-500887_canton-of-lucerne.png");
    const [fotoFamiliar, setfotoFamiliar] = useState("https://www.seekpng.com/png/full/50-500887_canton-of-lucerne.png");
    const [fotoPersonalBase, setfotoPersonalBase] = useState('');
    const [fotoFamiliarBase, setfotoFamiliarBase] = useState('');






    const atributos = {
        // userId,
        // buzonCartaId: params.id,
        // op,
        hola,
        escribo,
        mi,
        queel,
        cumple,
        noSabe,
        ademas,
        leGusta,
        dondeAprendo,
        gustaAprendes,
        mePaso,
        meGustaria,
        miNombre,
        ysoy,
        de,
        mifamilia,
        nuestraPro,
        idioma,
        lugarFavorito,
        comidaTipica,
        ya,
        comer,
        masMeGusta,
        pregunta,
        despedida
    }


    function validar() {

        var estado = true;
        Object.entries(atributos).forEach(([e]) => {
            var y = eval(e);
            if (y == '') {
                var x = `set${e.toString()}_v("El campo ${e.toString().split(/(?=[A-Z])/).join(" ")} es requerido")`;
                estado = false;
            } else {
                var x = `set${e.toString()}_v("")`;
            }
            eval(x)
        });

        return estado;

    }
    const acceder = async () => {
        if (validar() && fotoPersonalBase.length>0 && fotoFamiliarBase.length>0 ) {
            setcargando(true);

            try {
                const res=await ReactNativeBlobUtil.fetch('POST', API_URL+"responder-presentacion-mayores", {
                    'Authorization': `Bearer ${userToken}`,
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'multipart/form-data',
                }, [
                    // element with property `filename` will be transformed into `file` in form data
                    {name: 'fotoPersonal', filename: 'personal.png', data: fotoPersonalBase},
                    {name: 'fotoFamiliar', filename: 'familiar.png', data: fotoFamiliarBase},
                    {name:'userId',data:userId.toString()},
                    {name:'buzonCartaId',data:params.id.toString()},
                    {name:'op',data:op.toString()},
                    {name:'hola',data:hola.toString()},
                    {name:'escribo',data:escribo.toString()},
                    {name:'mi',data:mi.toString()},
                    {name:'queel',data:queel.toString()},
                    {name:'cumple',data:cumple.toString()},
                    {name:'noSabe',data:noSabe.toString()},
                    {name:'ademas',data:ademas.toString()},
                    {name:'leGusta',data:leGusta.toString()},
                    {name:'dondeAprendo',data:dondeAprendo.toString()},
                    {name:'gustaAprendes',data:gustaAprendes.toString()},
                    {name:'mePaso',data:mePaso.toString()},
                    {name:'meGustaria',data:meGustaria.toString()},
                    {name:'miNombre',data:miNombre.toString()},
                    {name:'ysoy',data:ysoy.toString()},
                    {name:'de',data:de.toString()},
                    {name:'mifamilia',data:mifamilia.toString()},
                    {name:'nuestraPro',data:nuestraPro.toString()},
                    {name:'idioma',data:idioma.toString()},
                    {name:'lugarFavorito',data:lugarFavorito.toString()},
                    {name:'comidaTipica',data:comidaTipica.toString()},
                    {name:'ya',data:ya.toString()},
                    {name:'comer',data:comer.toString()},
                    {name:'masMeGusta',data:masMeGusta.toString()},
                    {name:'pregunta',data:pregunta.toString()},
                    {name:'despedida',data:despedida.toString()}
                ]);
                const result = await res.json();
                console.log(result)
                if (result.errors) {
                    Object.entries(result.errors).forEach(([key, value]) => {
                      var x = `set${key.toString()}_v("${value.toString()}")`;
                      eval(x)
                    });
                  }

                  if(result.info){
                    toast.show({ 'description': result.info });
                    navigation.goBack();
                  }

                  if(result.success){
                    toast.show({ 'description': result.success })    
                    navigation.navigate({
                        name: 'Inicio',
                        params: { estado: (Math.random() + 1).toString(36).substring(7) }
                    })
                  }

            } catch (error) {
                toast.show({ 'description': error.toString() })
            }finally{
                setcargando(false);
            }            
        } else {
            toast.show({ 'description': 'Complete datos.' })
        }
    }

    async function tomarFotoFamiliar(){
         try {
            await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                includeBase64:true
              }).then(image => {
                setfotoFamiliar(image.path)
                setfotoFamiliarBase(image.data)
              });
         } catch (error) {
            
         }

    }

    async function tomarFotoPersonal(){
        try {
           await ImagePicker.openCamera({
               width: 300,
               height: 400,
               cropping: true,
               includeBase64:true
             }).then(image => {
               setfotoPersonal(image.path)
               setfotoPersonalBase(image.data)
             });
        } catch (error) {
           
        }
   }

    return <ScrollView contentContainerStyle={{ flexGrow: 1 }} bg="white">

        <Box mx={3} minWidth="95%">
            <Heading size={"sm"} mt="3">Presentación </Heading>

            <FormControl isInvalid={hola_v == '' ? false : true}>
                <FormControl.Label>Hola</FormControl.Label>
                <Input onChangeText={sethola} value={hola} placeholder="Ingresa el nombre a quién escribes." />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {hola_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={escribo_v == '' ? false : true}>
                <FormControl.Label>Escribo a nombre de</FormControl.Label>
                <Input onChangeText={setescribo} value={escribo} placeholder="Ingrese el nombre de quién representa" />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {escribo_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={mi_v == '' ? false : true}>
                <FormControl.Label>mi</FormControl.Label>
                <Input onChangeText={setmi} value={mi} placeholder="Ingrese el parentesco" />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {mi_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={queel_v == '' ? false : true}>
                <FormControl.Label>,que el</FormControl.Label>
                <Input onChangeText={setqueel} value={queel} placeholder="fecha" />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {queel_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={cumple_v == '' ? false : true}>
                <FormControl.Label>Cumple</FormControl.Label>
                <Input onChangeText={setcumple} value={cumple} placeholder="cuantos años" />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {cumple_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={noSabe_v == '' ? false : true}>
                <FormControl.Label>de edad y aún no sabe escribir pero</FormControl.Label>
                <Input onChangeText={setnoSabe} value={noSabe} placeholder="" multiline />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {noSabe_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={ademas_v == '' ? false : true}>
                <FormControl.Label>además a</FormControl.Label>
                <Input onChangeText={setademas} value={ademas} placeholder="" />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {ademas_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={leGusta_v == '' ? false : true}>
                <FormControl.Label>le gusta</FormControl.Label>
                <Input onChangeText={setleGusta} value={leGusta} placeholder="" />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {leGusta_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={dondeAprendo_v == '' ? false : true}>
                <FormControl.Label>El lugar  donde aprende es</FormControl.Label>
                <Input onChangeText={setdondeAprendo} value={dondeAprendo} placeholder="" multiline />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {dondeAprendo_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={gustaAprendes_v == '' ? false : true}>
                <FormControl.Label>En este  mes aprendimos</FormControl.Label>
                <Input onChangeText={setgustaAprendes} value={gustaAprendes} placeholder="" multiline />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {gustaAprendes_v}
                </FormControl.ErrorMessage>
            </FormControl>


            <FormControl isInvalid={mePaso_v == '' ? false : true}>
                <FormControl.Label>y lo más importante que nos pasó últimamente es</FormControl.Label>
                <Input onChangeText={setmePaso} value={mePaso} placeholder="" multiline />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {mePaso_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={meGustaria_v == '' ? false : true}>
                <FormControl.Label>Lo que esperamos aprender con el programa de ChildFund es</FormControl.Label>
                <Input onChangeText={setmeGustaria} value={meGustaria} placeholder="" multiline />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {meGustaria_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={miNombre_v == '' ? false : true}>
                <FormControl.Label>Mi nombre es</FormControl.Label>
                <Input onChangeText={setmiNombre} value={miNombre} placeholder="" />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {miNombre_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={ysoy_v == '' ? false : true}>
                <FormControl.Label>y soy</FormControl.Label>
                <Input onChangeText={setysoy} value={ysoy} placeholder="" />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {ysoy_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={de_v == '' ? false : true}>
                <FormControl.Label>de</FormControl.Label>
                <Input onChangeText={setde} value={de} placeholder="" />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {de_v}
                </FormControl.ErrorMessage>
            </FormControl>


            <FormControl isInvalid={mifamilia_v == '' ? false : true}>
                <FormControl.Label>Los otros miembros de nuestra familia son</FormControl.Label>
                <Input onChangeText={setmifamilia} value={mifamilia} placeholder="" multiline />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {mifamilia_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={nuestraPro_v == '' ? false : true}>
                <FormControl.Label>Nosotros vivimos  en la provincia de</FormControl.Label>
                <Input onChangeText={setnuestraPro} value={nuestraPro} placeholder="" multiline />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {nuestraPro_v}
                </FormControl.ErrorMessage>
            </FormControl>


            <FormControl isInvalid={idioma_v == '' ? false : true}>
                <FormControl.Label>y el idioma que hablamos es</FormControl.Label>
                <Input onChangeText={setidioma} value={idioma} placeholder="" />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {idioma_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={lugarFavorito_v == '' ? false : true}>
                <FormControl.Label>Nuestra provincia tiene sitios muy hermosos, a nosotros nos gusta ir a</FormControl.Label>
                <Input onChangeText={setlugarFavorito} value={lugarFavorito} placeholder="" />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {lugarFavorito_v}
                </FormControl.ErrorMessage>
            </FormControl>


            <FormControl isInvalid={comidaTipica_v == '' ? false : true}>
                <FormControl.Label>También tenemos comida típica, por ejemplo</FormControl.Label>
                <Input onChangeText={setcomidaTipica} value={comidaTipica} placeholder="" multiline />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {comidaTipica_v}
                </FormControl.ErrorMessage>
            </FormControl>


            <FormControl isInvalid={ya_v == '' ? false : true}>
                <FormControl.Label>y a</FormControl.Label>
                <Input onChangeText={setya} value={ya} placeholder="" />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {ya_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={comer_v == '' ? false : true}>
                <FormControl.Label>le gusta</FormControl.Label>
                <Input onChangeText={setcomer} value={comer} placeholder="" />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {comer_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={masMeGusta_v == '' ? false : true}>
                <FormControl.Label>De nuestras tradiciones, la que compartimos juntos es</FormControl.Label>
                <Input onChangeText={setmasMeGusta} value={masMeGusta} placeholder="" multiline />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {masMeGusta_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={pregunta_v == '' ? false : true}>
                <FormControl.Label>Nos gustaría saber más sobre ti y tu familia y hacerles una pregunta</FormControl.Label>
                <Input onChangeText={setpregunta} value={pregunta} placeholder="" multiline/>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {pregunta_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <FormControl isInvalid={despedida_v == '' ? false : true}>
                <FormControl.Label>Cuéntale por qué quisieras que te conteste tu patrocinador, envíale un mensaje de despedida</FormControl.Label>
                <Input onChangeText={setdespedida} value={despedida} placeholder="" multiline/>
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                    {despedida_v}
                </FormControl.ErrorMessage>
            </FormControl>

            <Center>
                <HStack space={5} my={2}>
                    <Pressable onPress={tomarFotoPersonal}>
                        <Box>
                            <Center>
                                <Avatar bg="green.500" source={{
                                    uri: fotoPersonal
                                }}>
                                    AJ
                                </Avatar>
                                <Text>{"Foto personal"}</Text>
                            </Center>
                        </Box>

                    </Pressable>

                    <Pressable onPress={tomarFotoFamiliar}>
                        <Box>
                            <Center>
                                <Avatar bg="green.500" source={{
                                    uri: fotoFamiliar
                                }}>
                                    AJ
                                </Avatar>
                                <Text>{"Foto familiar"}</Text>
                            </Center>
                        </Box>


                    </Pressable>
                </HStack>
            </Center>

            <Button my="2" onPress={acceder} isLoading={cargando} isLoadingText="Enviando" colorScheme={cargando ? 'secondary' : 'success'} variant={"solid"} leftIcon={
                <Icon as={Entypo} name="mail"></Icon>
            }>
                Enviar respuesta
            </Button>

            <Divider />
        </Box>

    </ScrollView>;
};
