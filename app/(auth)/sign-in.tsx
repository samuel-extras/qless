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
import { Link, useRouter } from "expo-router";
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

const SignIn = () => {
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

        if (!res?.user.is_phone_verified && !res?.user.is_email_verified) {
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
                    paddingTop:
                        Platform.OS === "android" ? StatusBar.currentHeight : 0,
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
                                    <Text className="font-bold text-lg text-black mt-2">
                                        Let’s get you Signed In quickly
                                    </Text>
                                </LinearGradient>
                                <View className="w-full rounded-md px-8 -mt-6 ">
                                    <View className="px-6 py-10 flex bg-white flex-col rounded-lg shadow-lg bg-opacity-70">
                                        <Input
                                            error={errors.email}
                                            onChangeText={(e) =>
                                                handleChange(e, "email")
                                            }
                                            message="Email must be valid"
                                            keyboardType={"email-address"}
                                            label="Email"
                                            placeholder="Enter your Email"
                                            value={formData.email}
                                            // value="Station004@mail.comm"
                                            // value={
                                            //     "emmanuelloluwatobi@gmail.comm"
                                            // }
                                        />

                                        <Input
                                            error={errors.password}
                                            onChangeText={(e) =>
                                                handleChange(e, "password")
                                            }
                                            message={"Enter a valid password"}
                                            label="Password"
                                            placeholder="Enter Your password"
                                            secureTextEntry={!showPassword}
                                            icon={
                                                <FontAwesome
                                                    size={15}
                                                    name={
                                                        !showPassword
                                                            ? "eye"
                                                            : "eye-slash"
                                                    }
                                                />
                                            }
                                            onClickIcon={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            // value={"1111111"}
                                            value={formData.password}
                                            // value={"Oluwatobi@166"}
                                        />
                                        <Link
                                            className="text-right py-1 mt-[-10] "
                                            href={
                                                "https://api.sachmicrofinance.com/rest/web"
                                            }
                                        >
                                            <Text className="text-black underline ">
                                                Forgot password
                                            </Text>
                                        </Link>

                                        <View>
                                            <Button onPress={handleSubmit}>
                                                <Text className="text-center text-base text-white font-semibold">
                                                    Sign In
                                                </Text>
                                            </Button>
                                        </View>

                                        <View className="flex flex-row mt-2">
                                            <Text className="text-black">
                                                Already have an account?{" "}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    router.push("(auth)/signup")
                                                }
                                            >
                                                <Text className="italic text-[#CC9933]">
                                                    Sign up
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
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

export default SignIn;
