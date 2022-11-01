import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SignUp(){
    return(
        <View style={styles.screen}>
            <Text style={styles.text}>Pagina de Cadastro</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: '#000000',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#FFFFFF',
        textAlign: 'center',
    }
})