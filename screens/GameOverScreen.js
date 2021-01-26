import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import Colors from '../constants/Colors';
import text from '../constants/text';


const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={styles.gameOver}>Game is Over!</Text>
            <Text style={styles.selectedNumber}>Chosen Number: {props.userNumber}</Text>
            <Text style={styles.rounds}>Number of Rounds: {props.roundsNumber}</Text>     
            <Text style={styles.buttonContainer}>
                <Button title="New Game" onPress={props.onRestartGame} color="navy"/>
            </Text>
            
        </View>
    )
}

export default GameOverScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.backgroundScreen
    },
    gameOver: {
        fontSize: text.titleSize,
        fontWeight: text.titleWeight,
        color: Colors.titleColor,
        marginBottom: 10
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
    }
})
