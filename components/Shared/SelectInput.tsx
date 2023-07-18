import { Switch, TextInput, View } from "react-native";
import ModalSelector from "react-native-modal-selector";
import React, { FC, useState } from "react";
import Input from "../Input";
import { TextInputProps } from "react-native";

interface IPicker extends TextInputProps {
    data?: Array<IData>;
    onChange: (e: any) => void;
    label?: string;
    message?: string;
    error?: boolean;
}

interface IData {
    label: string;
    key: string | number;
    value: any;
}

const Picker: FC<IPicker> = ({
    data,
    onChange,
    label,
    message,
    error,
    ...rest
}: IPicker) => {
    const [textInputValue, setTextInputValue] = useState<string>();

    const handleSelect = (e: IData) => {
        setTextInputValue(e.label);
        onChange(e);
    };

    return (
        <View style={{ flex: 1, justifyContent: "space-around" }}>
            <ModalSelector
                overlayStyle={{ paddingTop: 50 }}
                data={data as any}
                initValue="Select something yummy!"
                supportedOrientations={["portrait"]}
                accessible={true}
                scrollViewAccessibilityLabel={"Scrollable options"}
                cancelButtonAccessibilityLabel={"Cancel Button"}
                onChange={(option) => {
                    handleSelect(option as any);
                }}
            >
                <Input
                    error={error}
                    message={message}
                    label={label}
                    editable={false}
                    value={textInputValue}
                    {...rest}
                />
            </ModalSelector>
        </View>
    );
};

export default Picker;
