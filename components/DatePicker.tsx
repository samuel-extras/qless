import React, { useState } from "react";
import {
    Button,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";

interface DatePickerProps {
    value: Date;
    onChange: (date: Date) => void;
    label?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ value, onChange, label }) => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    // const [date, setDate] = useState<any>(undefined);

    const onDateChange = (dateSelected: Date) => {
        setShowDatePicker(false);
        console.log({ dateSelected: new Date(dateSelected).toDateString() });

        onChange(dateSelected);
    };

    return (
        <>
            {label && (
                <Text className="block text-sm mb-1.5 font-medium text-gray-900 -dark:text-white">
                    {label}
                </Text>
            )}
            <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.textInput}
            >
                {/* <TextInput
                    style={styles.textInput}
                    editable={false}
                    value={value.toLocaleDateString()}
                /> */}
                {value ? (
                    <Text>{new Date(value).toDateString()}</Text>
                ) : (
                    <Text>Select Date </Text>
                )}
            </TouchableOpacity>

            <Modal visible={showDatePicker} transparent={true}>
                <View style={styles.modalContainer}>
                    <View
                        style={{
                            backgroundColor: "#fff",
                            padding: 10,
                            marginHorizontal: 20,
                        }}
                    >
                        <CalendarPicker
                            selectedStartDate={value}
                            onDateChange={(e: any) => onDateChange(e)}
                            selectedDayColor="#CC9933"
                            selectedDayTextColor="white"
                        />

                        <Button
                            title="Close"
                            onPress={() => setShowDatePicker(false)}
                        />
                    </View>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    textInput: {
        fontSize: 18,
        flex: 1,
        padding: 13,
        borderColor: "#ccc",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
    },
    modalContainer: {
        backgroundColor: "rgba(25, 25, 25, 0.7)",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default DatePicker;
