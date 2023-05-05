import React, {useState} from 'react'
import {TextInput, Text, View, TouchableOpacity,Vibration, Pressable ,Keyboard} from 'react-native'
import ResultIMC from "./ResultIMC/"
import styles from "./style"

export default function Form(){

const[height,setHeight] = useState(null)
const[weight, setWeight] = useState(null)
const[messageIMC, setMessageIMC] = useState("preencha o peso e altura")
const[imc, setImc] = useState(null)
const[textButton, setTextButton] = useState("Calcular")
const[errorMessage, setErrorMessage] = useState(null)

function imcCalculator(){
    let heightFormat = height.replace(",",".");
    return setImc((weight/(heightFormat*heightFormat)).toFixed(2))
}

function verificationImc(){
    if(imc == null){
        Vibration.vibrate();
        setErrorMessage("campo obrigatório*")
    }
}


function validationImc(){
    if(weight != null && height != null){
        imcCalculator()
        setHeight(null)
        setWeight(null)
        setMessageIMC("Seu imc é igual:")
        setTextButton("Calcular Novamente")
        setErrorMessage(null)
    }
    else{
    verificationImc()
    setImc(null)
    setTextButton("Calcular")
    setMessageIMC("preencha o peso e altura")
 }

}
    return(
        <Pressable onPress={Keyboard.dismiss}style={styles.formContext}>
        <View style={styles.form}>
            <Text style={styles.formLabel}>Altura</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TextInput style={styles.input}
            onChangeText={setHeight}
            value={height}
            placeholder="Ex. 1.75"
            keyboardType="numeric"/>
            <Text style={styles.formLabel}>Peso</Text>
            <Text style={styles.errorMessage}>{errorMessage}</Text>
            <TextInput style={styles.input}
            onChangeText={setWeight}
            value={weight}
            placeholder="Ex. 78.138"
            keyboardType="numeric"/>
           <TouchableOpacity style={styles.ButtonCalculator}
            onPress={() => { Keyboard.dismiss; validationImc(); }}>
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
           </TouchableOpacity>
        </View>
        <ResultIMC messageResultIMC={messageIMC} resultIMC={imc}/>
        </Pressable>
    );
}