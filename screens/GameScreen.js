import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'

import Card from '../custom_components/Card';
import Colors from '../constants/Colors';
import text from '../constants/text';


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;    // This JavaScript function always returns a random number between min (included) and max (excluded):

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);    // Recursion
    } else {
        return rndNum;
    }
}

const GameScreen = ({ userChoice, onGameOver }) => {     // App.js'den "userChoice" ve "onGameOver" proplarını aldık
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userChoice));

    // useRef:
    const currentLow = useRef(1);         // İlk başta minimum sayıyı 1 olarak atadık
    const currentHigh = useRef(100);      // İlk başta maximum sayıyı 100 olarak atadık

    const [rounds, setRounds] = useState(0);

    useEffect(() => {                            // Doğru sayı tahmininin yapıldığı ve oyunun bittiği durum için kullandık
        if (currentGuess === userChoice) {
            onGameOver(rounds);                  // App.js'den "onGameOver" prop'unu aldık
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {       // Buradaki direction "lower" veya "greater" ı temsil ediyor
    if ((direction === "lower" && currentGuess < userChoice) || (direction === "greater" && currentGuess > userChoice)) {
        Alert.alert("You are lying!!!", "Please command properly...", [{ text: "Sorry just kidding", style: "cancel" }]);
        return;
    }

    if (direction === "lower") {
        currentHigh.current = currentGuess;      // Eğer bilgisayarın tahmini bizim sayımızdan fazlaysa "lower" butonuna basıyoruz. Burada da "useRef" sayesinde bilgisayarın tahmin ettiği sayının max nokta olduğunu belirliyor. Bu sayede bir sonraki tahmini random şekilde yaparken bu değerin üstündeki sayıları almıyor
    } 
    
    else if (direction === "greater") {
        currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);      // useRef ile atadığımız "currentLow" ve "currentHigh" sayesinde bu değerler arasında random bir sayı gelmiş oluyor 
    setCurrentGuess(nextNumber);
    setRounds(curRounds => curRounds + 1);
}

    return (
        <View style={styles.screen}>
            <Text style={styles.paragraph}>Opponent's Guess: {currentGuess}</Text>
            <Card style={styles.buttonContainer}>
                <Button title="Lower" onPress={nextGuessHandler.bind(this, "lower")} color="red" />   
                <Button title="Greater" onPress={nextGuessHandler.bind(this, "greater")} color="blue" />
            </Card>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
        backgroundColor: Colors.backgroundScreen
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        width: 300,
        height: "15%",
    },
    paragraph: {
        fontSize: text.paragraphSize,
        fontFamily: "gorditas-regular"
    }
})
