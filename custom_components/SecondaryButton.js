import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import Colors from "../constants/Colors";

const MainButton = props => {
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.5}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default MainButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.secondaryButtonColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    buttonText: {
        color: "white",
        fontFamily: "CarterOne-Regular",
        fontSize: 18,
    },
});
