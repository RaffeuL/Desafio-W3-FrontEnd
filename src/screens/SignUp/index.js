import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "./components/Input";
import Button from "./components/Button";

export default function SignUp(){
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')

    function validate() {
        console.log('validando')
    }
    
    return(
        <View style={styles.screen}>
            <Text style={styles.text}>Pagina de Cadastro</Text>
            <Input placeHolder={'Name'} setText={setName}/>
            <Input placeHolder={'CPF: 000.000.000-00'} setText={setCpf}/>
            <Input placeHolder={'Password'} password={true} setText={setPassword}/>
            <Input placeHolder={'Confirm the password'} password={true} setText={setConfirmPass}/>
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