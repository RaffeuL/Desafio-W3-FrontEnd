import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "./components/Input";
import Button from "./components/Button";

export default function SignUp(){

    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})

    function handleError(errorMenssage, input){
        setErrors(prevState => ({ ...prevState, [input]: errorMenssage }))
    }
    
    function validate(){
        let valid = true
        const spaceRegex = /\s{2,}/
        const nameRegex = /^[a-záàâãéèêíïóôõöúçñ]+([\ a-záàâãéèêíïóôõöúçñ]+$)/gi
        const cpfRegex = /^[0-9]{11}$/g

        if(!name){
            handleError('Please input your name', 'name')
            valid = false
        }else if(!nameRegex.test(name) || spaceRegex.test(name)){
            handleError('Name cannot contain numbers, simbols or more than one space', 'name')
            valid = false
        }

        if(!cpf){
            handleError('Please input your CPF', 'cpf')
            valid = false
        }else if(!cpfRegex.test(cpf)){
            handleError('CPF cannot contain letters or simbols and must have 11 numbers', 'cpf')
            valid = false
        }

        if(!password){
            handleError('Please input your password', 'password')
            valid = false
        }else if(password.length < 8){
            handleError('The password shold have more than 8 characters', 'password')
            valid = false
        }

        if(password !== confirmPassword){
            handleError('As senhas não são iguais', 'confirmPassword')
            valid = false
        }

        if(valid){signIn()}
    }

    function signIn(){
        console.log('Sign In')
        const user = {
            name: name,
            cpf: cpf,
            password: password
        }
        console.log(user)
    }
    
    return(
        <View style={styles.screen}>
            <Text style={styles.text}>Pagina de Cadastro</Text>
            <Input placeholder={'Name'} iconName={'account-circle'} onChangeText={setName} error={errors.name} onFocus={() => handleError(null, 'name')}/>
            <Input placeholder={'CPF: 12345678900'} iconName={'card-account-details'} onChangeText={setCpf}  keyboardType={'numeric'} maxLength={11} error={errors.cpf} onFocus={() => handleError(null, 'cpf')}/>
            <Input placeholder={'Password'} iconName={'lock'} isHide={true} onChangeText={setPassword} error={errors.password} onFocus={() => handleError(null, 'password')}/>
            <Input placeholder={'Confirm the password'} iconName={'lock'} isHide={true} onChangeText={setConfirmPassword} error={errors.confirmPassword} onFocus={() => handleError(null, 'confirmPassword')}/>
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