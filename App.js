import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import * as Font from 'expo-font';              // Custom Font için ekledik  ----->  expo install expo-font  ----->  https://fonts.google.com/ sitesinden istediğim font'u yükleyip "assets" klasörü içindeki "fonts" klasörüne attım
import AppLoading from 'expo-app-loading';      // Custom Font kullanmak için ekledik  ----->  expo install expo-app-loading    

import Header from './custom_components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';


// Custom Font
const fetchFonts = () => {
    return Font.loadAsync({
        'gorditas-regular': require('./assets/fonts/Gorditas-Regular.ttf'),       // İsimlendirmeyi istediğimiz gibi yapabiliriz
        'gorditas-bold': require('./assets/fonts/Gorditas-Bold.ttf')              // StyleSheet'te kullanmak istediğimiz componente atarken bu isimleri kullanacağız
    });
}

export default function App() {
    const [userNumber, setUserNumber] = useState();         // Boş atayınca NaN olur. <StartGameScreen /> de butona basıp oyuna başlayacağımız zaman <StartGameScreen /> in gözükmeyip <GameScreen /> in gözükmesini sağlmaka için kullanıcaz
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);    // Custom font eklerken AppLoading için ekledik

    if (!dataLoaded) {
        return (
            <AppLoading 
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={err => console.log(err)}
            />
        )
    }

    const newGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null);
    }

    const startGameHandler = selectedNumber => {
        setUserNumber(selectedNumber);      // "StartGameScreen.js" deki "Start Game" butonu burayı triggerlıyor. Burada girilen değerle userNumber=true olduğu için <StartGameScreen /> kapanıp <GameScreen /> gözüküyor
        setGuessRounds(0);
    }

    const gameOverHandler = numOfRounds => {
        setGuessRounds(numOfRounds);
    }

    let content = <StartGameScreen onStartGame={startGameHandler} />     // "StartGameScreen.js" deki "Start Game" butonuna "onStartGame" prop'unu yolluyoruz

    if (userNumber && guessRounds <= 0) {      // userNumber true olursa <GameScreen /> gözüksün istiyoruz. Aynı zamanda "guessRounds" ın 0 olduğu durumlarda <GameScreen /> görünecek. 
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    } else if (guessRounds > 0) {
        content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestartGame={newGameHandler} />
    }

    return (
        <View style={styles.screen}>
            <Header title="Guessing a Number App" />
            
            {/* <StartGameScreen />
            <GameScreen /> */}
            
            {content}

        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
