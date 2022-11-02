import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text} from "react-native";

export default function Input({ placeHolder, isPassword = false, icon, setText, isValid, keyboardType = 'default', maxLength = undefined }) {
    const [visible, setVisible] = useState(isPassword)
    
    return<>
        <View style={styles.field}>
            <TextInput
                style={styles.input}
                placeholder={placeHolder}
                secureTextEntry={isPassword} 
                placeholderTextColor={'#FFB400'}
                onChangeText={setText}
                onTextInput={isValid}
                keyboardType={keyboardType}
                maxLength={maxLength}
            />  
        </View>
    </>
}

const styles = StyleSheet.create({
    field: {
        width: '90%',
        height: 50,
        marginVertical: 12,
        marginHorizontal: 12,
        borderWidth: 2,
        padding: 10,
        borderRadius:8,
        borderColor: '#FFB400',
        alignItems:'center',
        flexDirection:'row',
    },

    input: {
        width: '100%',
        marginStart: '3%',
        color: '#FFB400'
    },
    errorText: {
        color: 'red'
    }

})