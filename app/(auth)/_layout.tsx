import { Stack } from "expo-router";
import { Text } from "react-native";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="signup"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="sign-in"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="verification"
                options={{
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="forgot-password"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="pin-code"
                options={{
                    headerShown: true,
                    headerTitle: "",
                }}
            />
            <Stack.Screen
                name="reset-password"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
