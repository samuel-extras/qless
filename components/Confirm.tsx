import { Alert } from "react-native";

const ConfirmationPrompt = ({ title, message, onConfirm, onCancel }: any) => {
    const handleConfirm = () => {
        Alert.alert(
            title,
            message,
            [
                { text: "Cancel", onPress: onCancel, style: "cancel" },
                { text: "OK", onPress: onConfirm },
            ],
            { cancelable: false }
        );
    };

    return handleConfirm;
};

export default ConfirmationPrompt;
