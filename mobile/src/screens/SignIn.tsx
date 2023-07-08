import { Center, Heading, Image, ScrollView, Text, VStack, useToast } from "native-base";
import BackgroundImg from '@assets/background.png'
import LogoSvg from '@assets/logo.svg'
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { useNavigation } from "@react-navigation/native";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@hooks/useAuth";
import { AppError } from "@utils/AppError";
import { useState } from "react";

type FormData = {
    email: string;
    password: string;
}

export function SignIn(){
    const [isLoading, setIsLoading] = useState(false)

    const {signIn} = useAuth()
    const toast = useToast()
    const navigation = useNavigation<AuthNavigatorRoutesProps>()

    function handleNewAccount(){
        navigation.navigate('signUp')
    }

    const {control, handleSubmit, formState: {errors}} = useForm<FormData>()

    async function handleSignIn({email, password}: FormData){
        try {
            setIsLoading(true)
            await signIn(email, password) 
        } catch(error) {
            const isAppError = error instanceof AppError;

            const title = isAppError ? error.message : 'Não foi possível entrar. Tente novamente.'

            setIsLoading(false)

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }   
    }

    return(
        <ScrollView contentContainerStyle={{flexGrow: 1}} showsVerticalScrollIndicator={false}>
        <VStack flex={1} bg='gray.700' px={10} pb={16}>
            <Image 
            source={BackgroundImg} 
            defaultSource={BackgroundImg} 
            alt='Pessoas treinando'
            resizeMode="contain"
            position='absolute'
            />
            <Center my={24}>
            <LogoSvg/>
            <Text color='gray.100' fontSize='sm'>
             Treine sua mente e o seu corpo
            </Text>
            </Center>
            <Center>
            <Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'>
                Acesse sua conta
            </Heading>
            <Controller
            control={control}
            name="email"
            rules={{required: 'Informe o e-mail.'}}
            render={({field: {onChange}}) => (
                <Input 
                placeholder='E-mail'
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                />
            )}
            />
           <Controller
            control={control}
            name="password"
            rules={{required: 'Informe a senha.'}}
            render={({field: {onChange}}) => (
                <Input 
                placeholder="Senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}
                />
            )}
            />
            <Button 
            title='Acessar'
            onPress={handleSubmit(handleSignIn)}
            isLoading={isLoading}
            />
            </Center>
            <Center mt={20}>
            <Text color='gray.100' fontSize='sm' mb={3} fontFamily='body' >
                Ainda não tem acesso?
            </Text>
            <Button 
            title='Criar conta' 
            variant='outline' 
            onPress={handleNewAccount}
            />
            </Center>
        </VStack>
        </ScrollView>
    )
}