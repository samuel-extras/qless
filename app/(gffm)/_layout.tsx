import { Stack } from "expo-router";

export default function SupplyLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="gffms"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="add-gffm"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="edit-gffm"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
