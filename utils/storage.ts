import AsyncStorage from "@react-native-async-storage/async-storage";

// Store data
export const storeData = async (key: string, value: string): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.error("Error storing data: ", e);
    }
};

// Retrieve data
export const retrieveData = async (key: string): Promise<string | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // Data found
            return value;
        } else {
            // Data not found

            return null;
        }
    } catch (e) {
        console.error("Error retrieving data: ", e);
        return null;
    }
};

// Remove data
export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (e) {
        console.error("Error removing data: ", e);
    }
};
