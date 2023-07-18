import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { RootSiblingParent } from "react-native-root-siblings";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import { userIsOnboarded } from "../atoms/users";
import { CONSTANT } from "../constants";
import { retrieveData } from "../utils/storage";
import OnboardingScreen from "./(onboading)";
import Button from "../components/Button";
import { TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { StatusBar } from "expo-status-bar";
// import { TextEncoder } from "text-encoding";

// if (!window.TextEncoder) {
//     window.TextEncoder = TextEncoder;
// }

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    initialRouteName: "welcome",
};

export default function RootLayout() {
    const [loaded, error] = useFonts({
        SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
        ...FontAwesome.font,
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    return (
        <>
            {/* Keep the splash screen open until the assets have loaded. In the future, we should just support async font loading with a native version of font-display. */}
            {!loaded ? (
                <SplashScreen />
            ) : (
                <RecoilRoot>
                    <RootLayoutNav />
                </RecoilRoot>
            )}
        </>
    );
}

function RootLayoutNav() {
    const [onboarded, setOnboarded] = useRecoilState<any>(userIsOnboarded);
    useEffect(() => {
        (async () => {
            // await removeData(CONSTANT.ONBOARDED);
            const isOnboarded = await retrieveData(CONSTANT.ONBOARDED);
            setOnboarded(isOnboarded);
        })();
    }, [onboarded]);

    return (
        <>
            <StatusBar style="dark" />
            {onboarded ? (
                <RootSiblingParent>
                    <Stack initialRouteName="(auth)">
                        <Stack.Screen
                            name="(auth)"
                            options={{
                                headerShown: false,
                                headerTitle: "",
                            }}
                        />
                        <Stack.Screen
                            name="(home)"
                            options={{
                                headerShown: false,
                                headerTitle: "",
                            }}
                        />
                        <Stack.Screen
                            name="(coupon)"
                            options={{
                                headerShown: true,
                                headerTitle: "",
                            }}
                        />
                        <Stack.Screen
                            name="(fleet)"
                            options={{
                                headerShown: true,
                                headerTitle: "FLEET MGT",
                            }}
                        />
                        <Stack.Screen
                            name="(supply)"
                            options={{
                                headerShown: true,
                                headerTitle: "Supply",
                            }}
                        />
                        <Stack.Screen
                            name="(gffm)"
                            options={{
                                headerShown: true,
                                headerTitle: "Fuel For Me",
                            }}
                        />
                        <Stack.Screen
                            name="(settings)"
                            options={{
                                headerShown: true,
                                headerTitle: "",
                            }}
                        />

                        <Stack.Screen
                            name="transaction-pin"
                            options={{ headerTitle: "" }}
                        />
                        <Stack.Screen
                            name="generate-coupon"
                            options={{ headerTitle: "Generate Coupon" }}
                        />
                        <Stack.Screen
                            name="success"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="error"
                            options={{ headerShown: false }}
                        />
                        <Stack.Screen
                            name="coupon-validated"
                            options={{ headerShown: true, headerTitle: "" }}
                        />
                        <Stack.Screen
                            name="verify-pin"
                            options={{
                                headerShown: true,
                                headerTitle: "Verify Pin",
                            }}
                        />
                    </Stack>
                </RootSiblingParent>
            ) : (
                <OnboardingScreen />
            )}
        </>
    );
}
