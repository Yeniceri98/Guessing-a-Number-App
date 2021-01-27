import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Colors from '../constants/Colors';
import text from '../constants/text';


const Header = ({ title }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        paddingTop: 30,
        // backgroundColor: "#90ee90",          // Yorum satırına aldım çünkü aşağı satırda Colors.js'de template'ini oluşturduğum rengi aldım
        backgroundColor: Colors.background,
        alignItems: "center",                   // Cross axis
        justifyContent: "center"                // Main axis
    },
    headerTitle: {
        color: Colors.titleColor,
        fontSize: text.titleSize,
        // fontWeight: text.titleWeight,        // Custom Font kullanıldığı zaman fontWeight kullanılmaz
        fontFamily: "gorditas-bold"             // Custom Font 
    }
})


// App.js'de kullandım