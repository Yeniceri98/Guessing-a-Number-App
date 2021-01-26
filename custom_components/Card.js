import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const Card = props => {
    return (
        <View style={{ ...styles.card, ...props.style }}>        
            {props.children}
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    card: {
        // width: 400,                 // width, maxWidth ve alignItems'ı yorum satırına aldık çünkü tüm input container'ların bu özelliklerinin aynı olmamasını istiyoruz. Bunları ek olarak o dosyada belirleriz
        // maxWidth: "80%",
        // alignItems: "center",
        elevation: 15,                 // Buradaki 4 property ise bizim input containerlarımız için template olacak
        backgroundColor: "white",
        padding: 20,
        borderRadius: 15,        
    },
})


// Card.js adında bir dosya oluşturarak default bir "card" stylesheet'i oluşturacağız ve bu bizim template'imiz olacak
// Bu şekilde oluşturulan bu StyleSheet'i birden fazla yerde kullanacağımız zaman kodu her seferinde tekrar tekrar yazmak zorunda kalmayız
// Card.js dosyasını istediğimiz bir dosyada import ederek kullanabiliriz
// <View style={{ ...styles.card, ...props.style }}> kısmındaki spread operator kısmını yazmayı unutmamalıyız. Burayı yazmazsak başka dosyalarda <Card /> componentini kullanamayız
