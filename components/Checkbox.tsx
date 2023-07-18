import { FC, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ICheck {
    checked?: boolean;
    onChecked?: () => void;
}

const Checkbox: FC<ICheck> = ({ checked, onChecked }: ICheck) => {
    return (
        <Pressable
            className={`w-5 h-5 justify-center items-center rounded-md  border border-[#CC9933] ${
                checked ? "bg-[#CC9933]" : " bg-transparent"
            }`}
            onPress={onChecked}
        >
            {checked && <Ionicons name="checkmark" size={12} color="white" />}
        </Pressable>
    );
};

export default Checkbox;
const styles = StyleSheet.create({
    checkboxBase: {
        width: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "coral",
        backgroundColor: "transparent",
    },
    checkboxChecked: {
        backgroundColor: "coral",
    },
    appContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    appTitle: {
        marginVertical: 16,
        fontWeight: "bold",
        fontSize: 24,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    checkboxLabel: {
        marginLeft: 8,
        fontWeight: 500,
        fontSize: 18,
    },
});
