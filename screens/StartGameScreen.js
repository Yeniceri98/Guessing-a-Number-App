import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, Keyboard, Alert, Image } from "react-native";

import Card from "../custom_components/Card";               // Input containerlar için oluşturduğumuz template'i aldığımız dosya
import Input from "../custom_components/Input";             // <Card /> componentinde yaptığımız gibi custom component oluşturduk
import Colors from "../constants/Colors";                   // Color template. Aşağıdaki buton kısmında color={Colors.primary} diyerek kullandık
import text from "../constants/text";                       // Text template
import MainButton from "../custom_components/MainButton";   // Custom Button

const StartGameScreen = ({ onStartGame }) => {     // App.js'den aldığımız "onStartGame" prop'unu aşağıdaki "Start Game" butonunun olduğu kısımda kullanıcaz
    const [enteredValue, setEnteredValue] = useState("");       // TextInput'a girilen sayı (String yaptığımız için aşağıda parseInt ile int'e çeviriyoruz)
    const [confirmed, setConfirmed] = useState(false);          // True olunca "Chosen Number" yazısı gözükür. Yani valid bir değer girdiğimiz belli olur
    const [selectedNumber, setSelectedNumber] = useState();     // Butona basıp seçimini gerçekleştirdiğimiz sayı

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ""));      // 0-9 arası herhangi bir değer girmediğimiz durumlarda otomatikman global (g) olarak siler. Mesela virgül veya nokta koyamayız
    };

    const resetInputHandler = () => {
        setEnteredValue("");
        setConfirmed(false);
    };

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);

        if (chosenNumber === NaN || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("It's an unvalid number!", "Number has to be between 1 and 99", [
                {
                    text: "Okay",
                    style: "destructive",
                    onPress: resetInputHandler,
                },
            ]);
            return;
        }

        console.log(chosenNumber);
        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue("");
        Keyboard.dismiss();
    };

    let confirmedNumber;    // Aşağıda confirmed=true olunca yazıyı yazdırması için atadık

    if (confirmed) {
        confirmedNumber = (
            <Card style={styles.confirmedCard}>
                <Text style={styles.confirmedText}>Chosen Number: {selectedNumber} </Text>
                <View style={styles.startButton}>
                    {/* <Button title="Start Game" onPress={() => onStartGame(selectedNumber)} /> */}
                    {/* "MainButton" custom componentini kullanıcaz. Custom Button kullanırken "title" kullanılmaz. Onun yerine aşağıdaki gibi componentin arasına yazılır */}

                    <MainButton onPress={() => onStartGame(selectedNumber)}>
                        START GAME
                    </MainButton>

                    {/* App.js'den "onStartGame" prop'unu aldık */}
                </View>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback       // Ekranda herhangi bir yere tıkladığımız zaman
            onPress={() => {
                Keyboard.dismiss();     // Keyboard API'sini kullanarak klavyenin kapanmasını sağlarız
            }}
        >
            <View style={styles.screen}>
                <Image
                    source={{
                        uri:
                            "https://raw.githubusercontent.com/thiagodnf/guess-the-number/master/img/logo.png?token=AAG9XwrL-t72tifQ-eA47lewNBqqV9Nwks5cDnuJwA%3D%3D",
                    }}
                    style={styles.image}
                />
                <Card style={styles.inputContainer}>
                    <Text style={styles.parapraph}>Select a Number</Text>
                    <Input
                        style={styles.input}
                        blurOnSubmit
                        keyboardType="numeric"
                        maxLength={2}
                        autoCorrect={false}
                        autoCapitalize="none"
                        onChangeText={numberInputHandler}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} />
                        </View>
                        <View style={styles.button}>
                            <Button title="Reset" onPress={resetInputHandler} color={Colors.secondary} />
                        </View>
                    </View>
                </Card>
                {confirmedNumber}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default StartGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",           // Cross axis. Direction "column" (default) olduğu için burada yazıyı soldan sağa yatay şekilde (horizontal) ortalar
        backgroundColor: Colors.backgroundScreen,
    },
    parapraph: {
        fontSize: text.paragraphSize,
        color: "black",
        fontFamily: "gorditas-regular",     // Custom Font
    },
    inputContainer: {
        width: 300,                         // Bu 3 property "Card.js" de yok. Ekstra ekledik
        maxWidth: "80%",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 2,
        // elevation: 15,                   // Android ---> Elevation    iOS ---> Shadow   property'lerini destekler
        // backgroundColor: "white",        // Yorum satırına aldığım property'ler Card.js'den gelenlerdi ve <Card /> componenti oluşturarak onları otomatikman aldık. Bu yüzden ekstra bir daha bu propertyleri yazmak zorunda değiliz
        // padding: 20,
        // borderRadius: 15,
    },
    // textInput: {                         // textInput için her seferinde ayrı ayrı StyleSheet ataması yapmak yerine "custom_components" klasörü içinde "Input.js" adında bir dosya oluşturup <Input /> componentini kullanacağız. O yüzden burayı yorum satırına aldım
    //     width: "60%",
    //     height: "20%",
    //     borderColor: "black",
    //     borderWidth: 1,
    //     padding: 5,
    //     marginBottom: 10,
    //     marginTop: 10
    // },
    input: {
        width: "40%",               // "Input.js" deki StyleSheet'e ek olarak style ataması yaptık
        height: "20%",
        textAlign: "center",
    },
    buttonContainer: {
        flexDirection: "row",       // Default is column
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    button: {           // Buton boyutlarını birbirine eşitlemek için butonları ekstra bir <View> componenti içine aldık
        width: 100,
    },
    confirmedCard: {
        backgroundColor: "#ff8c00",
        padding: 20,
        marginTop: 15,
        borderWidth: 2,
        alignItems: "center",
    },
    confirmedText: {
        fontSize: text.paragraphSize,
        fontWeight: "bold",
    },
    startButton: {
        paddingTop: 15,
        width: "50%",
    },
    image: {
        width: "80%",           // Network image'larda width ve height belirtmemiz zorunludur
        height: 120,            // Local image'da koymasak da çalışır ve resmin tam boyutunu alır
        marginVertical: 10,
    },
});
