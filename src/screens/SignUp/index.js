import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Input from "./components/Input";
import Button from "./components/Button";

export default function SignUp(){

    const [inputs, setInputs] = useState({
        name: '',
        cpf: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({})

    const spaceRegex = /\s{2,}/
    const nameRegex = /^[a-záàâãéèêíïóôõöúçñ]+([\ a-záàâãéèêíïóôõöúçñ]+$)/gi
    const cpfRegex = /^[0-9]{11}$/g

    function handleOnChange(text, input){
        setInputs(prevState => ({ ...prevState, [input]: text }))
        handleError(null, input)

    }

    function handleError(errorMenssage, input){
        setErrors(prevState => ({ ...prevState, [input]: errorMenssage }))
    }

    function validate(){
        let valid = true
        if(!inputs.name){
            handleError('Please input your name', 'name')
            valid = false
        }else if(!nameRegex.test(inputs.name) || spaceRegex.test(inputs.name)){
            handleError('Name cannot contain numbers, simbols or more than one space', 'name')
            valid = false
        }
        if(!inputs.cpf){
            handleError('Please input your CPF', 'cpf')
            valid = false
        }else if(!cpfRegex.test(inputs.cpf)){
            handleError('CPF cannot contain letters or simbols', 'cpf')
            valid = false
        }
        if(!inputs.password){
            handleError('Please input your password', 'password')
            valid = false
        }else if(inputs.password.length < 8){
            handleError('The password shold have more than 8 characters', 'password')
            valid = false
        }
        if(inputs.password !== inputs.confirmPassword){
            handleError('As senhas não são iguais', 'confirmPassword')
            valid = false
        }

        if(valid){signIn()}
    }

    function signIn(){
        console.log('Sign In')
    }
    
    return(
        <View style={styles.screen}>
            <Text style={styles.text}>Pagina de Cadastro</Text>
            <Input placeholder={'Name'} iconName={'account-circle'} onChangeText={(text) => handleOnChange(text, 'name')} error={errors.name} onFocus={() => handleError(null, 'name')}/>
            <Input placeholder={'CPF: 12345678900'} onChangeText={(text) => handleOnChange(text, 'cpf')}  keyboardType={'numeric'} maxLength={11} error={errors.cpf} onFocus={() => handleError(null, 'cpf')}/>
            <Input placeholder={'Password'} iconName={'eye'} secureTextEntry onChangeText={(text) => handleOnChange(text, 'password')} error={errors.password} onFocus={() => handleError(null, 'password')}/>
            <Input placeholder={'Confirm the password'} secureTextEntry onChangeText={(text) => handleOnChange(text, 'confirmPassword')} error={errors.confirmPassword} onFocus={() => handleError(null, 'confirmPassword')}/>
            <Button label={'Sign In'} onPress={validate}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#232323',
        height: '100%',
        width: '100%',
        justifyContent: 'center'
    },
    text: {
        color: '#FFB400',
        textAlign: 'center',
    }
})