import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Image,
    Button,
    TouchableOpacity,
} from "react-native";
import React from "react";
import Swiper from "react-native-swiper";
import Logo from "../../assets/images/icon.png";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { storeData } from "../../utils/storage";
import { CONSTANT } from "../../constants";
import { useRecoilState } from "recoil";
import { userIsOnboarded } from "../../atoms/users";

const Overlay = () => {
    return <View style={styles.overlay} />;
};

const OnboardingPage1 = () => {
    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1524567492592-cee28084482e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGV4cHJlc3N3YXl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
            }}
            className="flex-1 object-cover justify-center"
        >
            <Overlay />
            <View className="flex-1 items-center justify-between p-4">
                <View className="items-center mt-32">
                    <Text className="text-black -dark:text-white text-3xl font-bold ">
                        Welcome to
                    </Text>
                    <Image
                        source={Logo}
                        alt="logo"
                        className="w-[100px] h-[88px] mt-8"
                    />

                    <Text className="text-base font-medium mt-2">
                        Goodbye to Fueling Stress
                    </Text>
                </View>
                <View className="mb-8 p-4">
                    <Text className="font-semibold text-white text-lg">
                        The 1st Harmonized Digital Prepaid Fueling Service
                        Company
                    </Text>
                    <Text className="text-[#CC9933] text-sm font-medium">
                        Offering you the convenience of pre-funding and fueling
                        at multiple stations from one App and one Wallet...{" "}
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
};
const OnboardingPage2 = () => {
    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1625993032891-6a4726b2750a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTEyfHxnYXMlMjBzdGF0aW9ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            }}
            className="flex-1 object-cover justify-center"
        >
            <Overlay />
            <View className="flex-1 justify-center items-center px-6">
                <Text className="font-bold text-3xl text-white">
                    Why Q-Less?
                </Text>

                <View className="mt-20 border-y border-[#CC9933] pb-2">
                    <View style={styles.caret} />

                    <Text className="font-semibold text-white text-lg">
                        Express VIP fueling:{" "}
                    </Text>
                    <Text className="text-[#CC9933] text-sm font-medium">
                        As our client, you get Express service at partner
                        filling stations, eliminating the need to wait in long
                        queues for fuel. We make fuel available to you at ease
                        at all times...{" "}
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
};
const OnboardingPage3 = () => {
    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1581434271811-8e199e1fcab5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fHRhbmtlcnxlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60",
            }}
            className="flex-1 object-cover justify-center"
        >
            <Overlay />
            <View className="flex-1  items-center px-6">
                <View className=" border-y border-[#CC9933] pb-2 mt-28">
                    <View style={styles.caret} />

                    <Text className="font-semibold text-white text-lg">
                        On-Demand Fueling:
                    </Text>
                    <Text className="text-[#CC9933] text-sm font-medium">
                        Place supply orders for diesel and other petroleum
                        products to be delivered to your home or business
                        premises.
                    </Text>
                </View>
            </View>
        </ImageBackground>
    );
};
const OnboardingPage4 = () => {
    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1611448746128-7c39e03b71e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJpdmVyfGVufDB8MXwwfHw%3D&auto=format&fit=crop&w=500&q=60",
            }}
            className="flex-1 object-cover justify-center"
        >
            {/* <Overlay /> */}
            <View className="flex-1 justify-end items-center w-screen ">
                <BlurView
                    intensity={80}
                    tint="light"
                    className="px-6 pt-4 w-screen"
                >
                    <View className=" border-y border-[#CC9933] mb-28 pb-2">
                        <View style={styles.caret} />

                        <Text className="font-bold text-white text-lg">
                            Go-Fuel-For-Me Service:
                        </Text>
                        <Text className="text-black text-sm font-medium">
                            You’re busy working or Just Feeling lazy? We give
                            you the convenience of having your cars picked up,
                            fueled and washed for you... as you wish...
                        </Text>
                    </View>
                </BlurView>
            </View>
        </ImageBackground>
    );
};
const OnboardingPage5 = () => {
    const router = useRouter();
    const [onboarded, setOnboarded] = useRecoilState<any>(userIsOnboarded);

    return (
        <ImageBackground
            source={{
                uri: "https://images.unsplash.com/photo-1573140493109-4d9a48ed6242?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGFuYWx5dGljc3xlbnwwfDF8MHx8&auto=format&fit=crop&w=500&q=60",
            }}
            className="flex-1 object-cover justify-center"
        >
            {/* <Overlay /> */}
            <View className="flex-1 justify-between items-center w-screen">
                <BlurView
                    intensity={80}
                    tint="dark"
                    className="px-6 py-4 w-screen"
                >
                    <View className=" border-y border-[#CC9933] mt-24 pb-2 ">
                        <View style={styles.caret} />
                        <Text className="font-bold text-white text-lg">
                            Analytics & Reporting:{" "}
                        </Text>
                        <Text className="text-[#CC9933] text-sm font-medium">
                            Get full visibility and control over your fleet.
                            Generate real-time report on transactions and acct
                            balances to make informed choices... Making you a
                            great fleet manager...
                        </Text>
                    </View>
                </BlurView>
                <View className="w-full px-10 mb-14 ">
                    <TouchableOpacity
                        onPress={() => {
                            storeData(CONSTANT.ONBOARDED, CONSTANT.ONBOARDED);
                            setOnboarded(true);
                        }}
                        className="border border-white rounded-lg px-8 py-1.5 w-full text-center"
                    >
                        <Text className="text-base text-[#cc9933] font-bold text-center">
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const OnboardingScreen = () => {
    return (
        <Swiper
            activeDotColor="#CC9933"
            dotColor="white"
            showsButtons={false}
            loop={false}
            className=""
        >
            <OnboardingPage1 />
            <OnboardingPage2 />
            <OnboardingPage3 />
            <OnboardingPage4 />
            <OnboardingPage5 />
        </Swiper>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 255, 0.5)",
    },
    caret: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 15,
        borderRightWidth: 15,
        borderBottomWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "#CC9933",
        top: -10,
        alignSelf: "center",
    },
});
