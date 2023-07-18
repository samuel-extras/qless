import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    useColorScheme,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../assets/images/blackLogo.png";
import { StatusBar } from "react-native";
import Loader from "../../components/loader";
import AuthAPIManager from "../../services/auth";
import {
    checkError,
    formValidation,
    isError,
} from "../../utils/formValidation";
import { toast } from "../../utils";
import { useRecoilState } from "recoil";
import { userState } from "../../atoms/users";
import { USER_TYPE } from "../../utils/types";
import { storeData } from "../../utils/storage";
import { CONSTANT } from "../../constants";
import { FontAwesome } from "@expo/vector-icons";

type FORM_DATA = {
    email?: string;
    password?: string;
};

const Support = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<FORM_DATA>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<any>({});
    const [loader, setLoader] = useState<boolean>(false);
    const [user, setUser] = useRecoilState<USER_TYPE>(userState);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    useEffect(() => {
        //    if(user.email){
        //     router.push()
        //    }
    }, []);

    const handleChange = (value: string, name: string) => {
        const isValid = formValidation(name, value);
        setErrors({ ...errors, [name]: !isValid });
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        //handle Error
        const checkErrors = checkError(formData);
        setErrors(checkErrors);
        if (isError(checkErrors)) return;
        setLoader(true);
        const res: any = await new AuthAPIManager().signInUser(formData);
        setLoader(false);
        if (!res.success) {
            Alert.alert("Failed", res?.message);
            return;
        }

        await storeData(CONSTANT.USER_TOKEN, res?.token);

        setUser({ ...res?.user, token: res?.token });

        if (!user.is_phone_verified && !user.is_email_verified) {
            router.push("/verification");
            return;
        }
        router.replace("/(home)");
    };

    return (
        <>
            {loader && <Loader />}
            <SafeAreaView
                style={{
                    flex: 1,
                }}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View style={styles.inner}>
                                <LinearGradient
                                    className="w-full flex justify-center items-center h-52 bg-gradient-to-r rounded-b rounded-lg"
                                    colors={["#CC9933", "#926f34"]}
                                    start={[0, 1]}
                                    end={[1, 0]}
                                >
                                    <Image
                                        source={Logo}
                                        alt="logo"
                                        className="w-32 h-28"
                                    />
                                </LinearGradient>
                                <View className="w-full rounded-md px-8 -mt-6  ">
                                    <View className="px-6 py-10 flex flex-col rounded-lg shadow-lg bg-white">
                                        <Text className="text-center text-3xl font-bold">
                                            Hi {user.name},
                                        </Text>
                                        <Text className="text-center p-3 text-[#aaa] font-bold ">
                                            You can contact support through the
                                            contact details below:
                                        </Text>
                                        <TouchableOpacity className="rounded-full bg-yellow-600 p-3 bg-opacity-5 m-4">
                                            <Text className="text-white font-bold text-lg">
                                                emmanuell@gmail.com
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity className="rounded-full border-dotted border-4 border-yellow-500 p-3 bg-opacity-5 m-4">
                                            <Text className="text-[#aaa] font-bold text-lg">
                                                09037271631
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ flex: 1 }} />
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    );
};
const styles = StyleSheet.create({
    inner: {
        flex: 1,
        justifyContent: "flex-end",
    },
});

export default Support;
