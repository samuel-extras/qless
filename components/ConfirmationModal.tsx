import { FontAwesome } from "@expo/vector-icons";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface IC {
    visible?: boolean;
    onCancel?: () => void;
    onConfirm?: () => void;
}

const ConfirmationModal: FC<IC> = ({ visible, onCancel, onConfirm }: IC) => {
    return (
        <Modal visible={visible} transparent>
            <View style={styles.container}>
                <View style={styles.modal}>
                    <View style={styles.iconContainer}>
                        <FontAwesome
                            name="exclamation-triangle"
                            size={50}
                            color="#FFA500"
                        />
                    </View>
                    <Text style={styles.title}>Are you sure?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onCancel}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.confirmButton]}
                            onPress={onConfirm}
                        >
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modal: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    iconContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: "row",
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginHorizontal: 10,
    },
    cancelButton: {
        backgroundColor: "#ccc",
    },
    confirmButton: {
        backgroundColor: "#FFA500",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default ConfirmationModal;
