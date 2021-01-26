import React from 'react'
import { StyleSheet, TextInput} from 'react-native'

const Input = props => {
    return (
        <TextInput {...props} style={{ ...styles.input, ...props.style }} />
        
        // style={{ ...styles.input, ...props.style }} ekleyerek "style" olarak atadığımız her şeyi başka dosyalarda kullanabilmiştik
        // {...props} ataması yaparak ise, <Input /> componentini kullandığımız her yerde "style" haricinde farklı bir property ataması yapabiliriz (StartGameScreen.js'de yaptım)
    )
}

export default Input

const styles = StyleSheet.create({
    input: {
        borderColor: "black", 
        borderWidth: 1, 
        padding: 5,
        marginBottom: 10,
        marginTop: 10
    }
})
