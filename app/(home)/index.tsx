import {
    Dimensions,
    Pressable,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
    FontAwesome5,
    MaterialIcons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "react-native";
import { useRouter } from "expo-router";
import { useRecoilState } from "recoil";
import { USER_TYPE } from "../../utils/types";
import { userState } from "../../atoms/users";
import USerDashboard from "../../components/Home/User";
import Station from "../../components/Home/Station";
import ProfileAPIManager from "../../services/profile";
import { toast } from "../../utils";
import { ScrollView } from "react-native";

const Home = () => {
    const router = useRouter();
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        handleOnload();
    }, []);

    const handleOnload = async () => {
        setLoading(true);
        const res: any = await new ProfileAPIManager().userInfo();
        setLoading(false);

        if (!res.success) {
            toast(res.message);
            return;
        }

        setUser({ ...res.user });
    };

    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={handleOnload}
                    />
                }
                className="h-screen w-screen group"
            >
                {user.type === "user" && <USerDashboard />}
                {user.type == "station" && <Station reload={loading} />}
                <View
                    style={{
                        marginBottom:
                            user.type === "station"
                                ? Dimensions.get("screen").height * 0.3
                                : 10,
                    }}
                />
            </ScrollView>
        </>
    );
};

export default Home;

const styles = StyleSheet.create({});
