import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Input({ iconName, error, ...props }) {
    const [visible, setVisible] = useState(false)
    
    return<>
        <View style={styles.field}>
            <MaterialCommunityIcons name={iconName} size={24} color="white"/>
            <TextInput
                style={styles.input}
                autoCapitalize='none'
                placeholderTextColor={'#FFB400'}
                {...props}
            /> 
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
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
        marginStart: '2%',
        color: '#FFB400'
    },
    errorText: {
        color: '#FFFFFF'
    }

})