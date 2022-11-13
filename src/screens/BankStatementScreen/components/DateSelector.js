import React from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function DateSelector({buttonLabel, date, onChange, show, onPress, error }) {
    
    function formatDate(date){
        if(!date) return ''
        const day = date.getDate()
        const month = date.getMonth() + 1
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    return<>
    {error && <Text style={styles.errorText}>{error}</Text>}
    <View style={styles.field}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{buttonLabel}</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{formatDate(date)}</Text>
        {show && <DateTimePicker value={date ? date : new Date()} onChange={onChange}></DateTimePicker>}
    </View>
    </>
}

const styles = StyleSheet.create({
    field: {
        width: '90%',
        height: 50,
        marginVertical: 10,
        marginHorizontal: 12,
        borderWidth: 2,
        borderRadius:8,
        borderColor: '#FFB400',
        flexDirection:'row',
    },
    button: {
        width: '40%',
        height: '100%',
        padding: 8,
        borderWidth: 1,
        borderRadius: 8,
        backgroundColor: '#FFB400',
    },

    text: {
        color: '#232323',
        fontSize: 16,
        lineHeight: 26,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dateText: {
        color: '#FFB400',
        fontSize: 20,
        lineHeight: 26,
        marginLeft: 20,
        alignSelf: 'center'
    },
    errorText: {
        marginHorizontal: 12,
        color: 'red'
    }
})