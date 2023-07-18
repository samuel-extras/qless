import {
    StyleSheet,
    Text,
    TextInput,
    View,
    Platform,
    TextInputProps,
    TouchableOpacity,
} from "react-native";
import React from "react";
interface InputProps extends TextInputProps {
    label?: string;
    id?: string;
    icon?: any;
    error?: string | boolean;
    onClickIcon?: () => void;
    message?: string;
}

const Input = ({
    label,
    id = "Input",
    icon,
    onClickIcon,
    error,
    message,
    ...rest
}: InputProps) => {
    const inputID =
        Platform.OS === "android" ? { accessibilityLabel: id } : { testID: id };

    return (
        <View className="w-full mb-4 ">
            {label && (
                <Text className="block text-sm mb-1.5 font-medium text-gray-900">
                    {label}
                </Text>
            )}
            <View className="relative">
                <TextInput
                    style={{ paddingVertical: Platform.OS === "ios" ? 8 : 6 }}
                    placeholderTextColor="gray"
                    className={`bg-transparent border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#CC9933] ${
                        error ? "focus:border-[red]" : "focus:border-[#CC9933]"
                    }  block w-full px-3 `}
                    {...inputID}
                    {...rest}
                />
                {icon && (
                    <TouchableOpacity
                        className="absolute  right-0 pointer-events-none p-3.5 "
                        onPress={onClickIcon}
                    >
                        {icon}
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.error}>{message || "Invalid"}</Text>}
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    error: {
        color: "red",
        fontSize: 12,
        padding: 5,
    },
});
