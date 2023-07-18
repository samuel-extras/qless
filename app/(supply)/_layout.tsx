import { Stack } from "expo-router";

export default function SupplyLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="supplies"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="add-supply"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="edit-supply"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
