import React from "react";
import { Button, StyleSheet, Text, View, Image } from "react-native";

import Colors from "../constants/Colors";
import text from "../constants/text";

import MainButton from "../custom_components/MainButton";       // Custom Button

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.gameOver}>Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image source={require("../assets/images/success.png")} style={styles.image} />
            </View>
            <Text style={styles.selectedNumber}>Chosen Number: {props.userNumber}</Text>
            <Text style={styles.rounds}>Number of Rounds: {props.roundsNumber}</Text>
            <Text style={styles.buttonContainer}>
                {/* <Button title="New Game" onPress={props.onRestartGame} color="navy"/> */}
                {/* Custom Button kullanırken "title" kullanılmaz. Onun yerine aşağıdaki gibi componentin arasına yazılır */}

                <MainButton onPress={props.onRestartGame}>NEW GAME</MainButton>
            </Text>
        </View>
    );
};

export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.backgroundScreen,
    },
    gameOver: {
        fontSize: text.titleSize,
        fontWeight: text.titleWeight,
        color: Colors.titleColor,
        marginBottom: 10,
    },
    rounds: {
        fontSize: text.paragraphSize,
    },
    selectedNumber: {
        fontSize: text.paragraphSize,
    },
    buttonContainer: {
        marginTop: 15,
        alignItems: "center",
    },
    imageContainer: {
        width: "80%",
        height: 250,
        marginVertical: 15,         // Top and Bottom (ayrı ayrı marginTop ve marginBottom yapmaya gerek kalmaz)
        borderRadius: 50,
        borderWidth: 3,
        overflow: "hidden",         // Burayı eklemezsek çerçeve kısmı borderRadius yüzünden düzgün durmaz
    },
    image: {
        width: "100%",          // borderRadius kullanınca resimden kırpar. Resimden kırpmaması için <Image /> componentini <View /> in içine alıp <View /> componentinde "imageContainer" style ataması yaptık
        height: "100%",         // "imageContainer" da width ve height'ı ayarlamıştık. Burada o ayarların aynı kalması için her iki property'yi de 100% yaptım
    },
});
