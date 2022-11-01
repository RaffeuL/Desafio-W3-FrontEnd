import React, { useState } from "react";
import { View, TextInput, StyleSheet} from "react-native";

export default function Input({ placeHolder, password = false, icon, setText, validate }) {
    const [visible, setVisible] = useState(password)
    
    return<>
        <View style={styles.field}>
            <TextInput
                style={styles.input}
                placeholder={placeHolder}
                secureTextEntry={password} 
                placeholderTextColor={'#FFB400'}
                onChangeText={setText}
                onTextInput={validate}
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
    }

})