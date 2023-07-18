import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import {
    ScrollView,
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Modal,
} from "react-native";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/users";
import Input from "../../components/Input";
import SetPin from "../../components/Settings/SetPin";
import { USER_TYPE } from "../../utils/types";

const ProfileSettingsScreen = () => {
    const [editEmailModalVisible, setEditEmailModalVisible] = useState(false);
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);
    // const [pinModal, setPinModal] = useState(false);
    const router = useRouter();

    const handleSave = () => {
        // Handle saving changes to profile
    };

    const handleChangePassword = () => {
        // Handle changing password
    };

    const handleDeactivateAccount = () => {
        // Handle deactivating account
    };

    const handleEditEmail = () => {
        setEditEmailModalVisible(true);
    };

    const handleEditEmailModalSave = () => {
        // Handle saving changes to email
        setEditEmailModalVisible(false);
    };

    const handleEditEmailModalCancel = () => {
        // Handle canceling changes to email
        setEditEmailModalVisible(false);
    };
    const userData = [
        { key: "Name", value: user.name },
        { key: "Email", value: user.email },
        { key: "Phone", value: user.phone },
        { key: "Address", value: user.address || "---" },
        { key: "City", value: user.city || "---" },
        { key: "State", value: user.state || "---" },
        { key: "Plan", value: user.plan || "---" },
    ];

    const renderItem = ({ item }: any) => (
        <>
            <View style={styles.itemContainer}>
                <Text style={styles.itemKey}>{item.key}</Text>
                <Text style={styles.itemValue}>{item.value}</Text>
            </View>
        </>
    );

    return (
        <ScrollView>
            <View style={{ margin: 16 }}>
                <View style={styles.container}>
                    {/* <FlatList
                        data={userData}
                        renderItem={({ item }: any) => (
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemKey}>{item.key}</Text>
                                <Text style={styles.itemValue}>
                                    {item.value}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item) => item.key}
                    /> */}
                    <ScrollView>
                        {userData.map((item: any) => (
                            <View style={styles.itemContainer} key={item.key}>
                                <Text style={styles.itemKey}>{item.key}</Text>
                                <Text style={styles.itemValue}>
                                    {item.value}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <View style={{ marginBottom: 16 }}>
                    <TouchableOpacity
                        onPress={() =>
                            router.push("/(settings)/change-password")
                        }
                        className="p-3 text-center "
                    >
                        <Text className="text-center text-blue-700">
                            Change Password
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push("/(settings)/set-pin")}
                        className="p-3 text-center "
                    >
                        <Text className="text-center text-blue-600">
                            Set Transaction Pin
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 16 }}>
                    <Button
                        title="Logout"
                        onPress={() => router.replace("(auth)")}
                        color="red"
                    />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 4,
    },
    itemContainer: {
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemKey: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 8,
    },
    itemValue: {
        fontSize: 16,
    },
});

export default ProfileSettingsScreen;
