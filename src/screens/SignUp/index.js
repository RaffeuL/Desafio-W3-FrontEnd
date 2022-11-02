import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "./components/Input";
import Button from "./components/Button";

export default function SignUp(){

    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    const spaceRegex = /\s{2,}/
    const nameRegex = /^[a-záàâãéèêíïóôõöúçñ]+([\ a-záàâãéèêíïóôõöúçñ]+$)/gi
    const cpfRegex = /^[0-9]{11}$/g

    function isValid(regex, input){
        if(regex.test(input) && !spaceRegex.test(input)) return true
        else return false
    }

    function validatePassword() {
        if(password == confirmPass) console.log('Passou Senha')
        else console.log('Não passou Senha')

    }

    function signIn(){
        console.log('Sign In')
    }
    
    return(
        <View style={styles.screen}>
            <Text style={styles.text}>Pagina de Cadastro</Text>
            <Input placeHolder={'Name'} setText={setName} isValid={() => isValid(nameRegex, name)}/>
            <Input placeHolder={'CPF: 12345678900'} setText={setCpf} isValid={() => isValid(cpfRegex, cpf)} keyboardType={'numeric'} maxLength={11}/>
            <Input placeHolder={'Password'} isPassword={true} setText={setPassword}/>
            <Input placeHolder={'Confirm the password'} isPassword={true} setText={setConfirmPass} isValid={validatePassword}/>
            <Button label={'Sign In'} onPress={signIn}></Button>
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