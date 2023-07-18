import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Modal } from "react-native";
import Button from "../Button";
import Input from "../Input";

interface IFM {
    visible?: boolean;
    handleClose?: () => void;
    handleSubmit?: () => void;
    onChange?: (e: string) => any;
}

const FundModal: FC<IFM> = ({
    visible,
    handleClose,
    handleSubmit,
    onChange,
}: IFM) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            statusBarTranslucent={true}
        >
            <TouchableOpacity
                style={{
                    marginTop: 100,
                    paddingHorizontal: 10,
                    right: 20,
                    position: "absolute",
                }}
                onPress={handleClose}
            >
                <FontAwesome name="times" size={20} />
            </TouchableOpacity>
            <View
                style={{
                    marginTop: 150,
                    paddingHorizontal: 20,
                }}
            >
                <Text
                    style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        marginBottom: 16,
                    }}
                >
                    Amout To Fund
                </Text>
                <Input
                    placeholder="Enter the amount"
                    keyboardType="number-pad"
                    onChangeText={onChange as any}
                />

                <View style={{ flexDirection: "row" }}>
                    <Button onPress={handleSubmit}>
                        <Text className="text-center text-base text-white font-semibold">
                            Fund Now
                        </Text>
                    </Button>
                </View>
            </View>
        </Modal>
    );
};

export default FundModal;
