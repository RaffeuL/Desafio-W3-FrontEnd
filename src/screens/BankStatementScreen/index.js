import React, { useState }from "react";
import { Text, View, StyleSheet, Alert, Keyboard } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import Input from "../../globalComponents/Input";
import Button from "../../globalComponents/Button";


export default function BankStatementScreen() {
  
  const [agency, setAgency] = useState('')
  const [account, setAccount] = useState('')

  const [showInitialDate, setShowInitialDate] = useState(false)
  const [showFinalDate, setShowFinalDate] = useState(false)

  const [initialDate, setInitialDate] = useState(new Date())
  const [finalDate, setFinalDate] = useState(new Date())

  const [errors, setErrors] = useState({})


  function handleError(errorMenssage, input){
      setErrors(prevState => ({ ...prevState, [input]: errorMenssage }))
  }

  function onChangeInitialDate(event, selectedDate) {
    const currentDate = selectedDate;
    setShowInitialDate(false);
    setInitialDate(currentDate) 
  }
  function onChangeFinalDate(event, selectedDate) {
    const currentDate = selectedDate;
    setShowFinalDate(false)
    setFinalDate(currentDate)
  }

  function showMode(isInitialDate) {
    isInitialDate ? setShowInitialDate(true) : setShowFinalDate(true) 
  }

  function formatDate(date){
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  function validate() {
      Keyboard.dismiss();
      let valid = true
      const agencyRegex = /^[0-9]{1,4}$/g
      const accountRegex = /^[0-9]{1,8}$/g

      if (!agency) {
          handleError('Please input the agency', 'agency')
          valid = false
      } else if (!agencyRegex.test(agency)) {
          handleError('Agency cannot contain letters and should have 4 digits', 'agency')
          valid = false
      }

      if (!account) {
          handleError('Please input the account', 'account')
          valid = false
      } else if (!accountRegex.test(account)) {
          handleError('Account Number cannot contain letters and should have 8 digits', 'account')
          valid = false
      }
      if(!initialDate){
        handleError('Please input the initial date', 'initialDate')
        valid = false
      }

      if(!finalDate){
        handleError('Please input the final date', 'finalDate')
        valid = false
      }else if(finalDate.getTime() < initialDate.getTime()) {
        Alert.alert('Error', 'Final date cannot be before initial date')
        valid = false
      }

      if (valid) { statement() }

  }

  function statement() {
    if(agency === '1234' && account === '12345678'){
      Alert.alert('Statement', `Initial Date ${formatDate(initialDate)} final Date ${formatDate(finalDate)} Statement: R$ 1000,00`)
    }else {
      Alert.alert('Error', 'Invalid credentials')
    }
  }

  return <>
    <View style={styles.screen}>
      <Text style={styles.text}>Bank Statement Screen</Text>
      <Input placeholder={'Agency'} onChangeText={setAgency} keyboardType={'numeric'} error={errors.agency} onFocus={() => {handleError(null, 'agency')}}/>
      <Input placeholder={'Account Number'} onChangeText={setAccount} keyboardType={'numeric'} error={errors.account} onFocus={() => {handleError(null, 'account')}}/>
      <Button label={'Choose Initial Date'} onPress={() => {showMode(true)}}/>
      {showInitialDate && <DateTimePicker value={initialDate} onChange={onChangeInitialDate}/>}
      <Button label={'Choose Final Date'} onPress={() => {showMode(false)}}/>
      {showFinalDate && <DateTimePicker value={finalDate} onChange={onChangeFinalDate}/>}
      <Button label={'Check'} onPress={validate} />
    </View>
  </>;
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
  },
  picker: {
    marginTop: 10,
    backgroundColor: '#5e5d58',
    height: 50,
    width: '80%',
    alignSelf: 'center',
    color: '#FFB400',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFB400',
  },
})