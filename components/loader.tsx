import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const Loader = () => {
    return (
        <View style={styles.overlay}>
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#CC9933" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(128, 128, 128, 0.6)",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        zIndex: 1,
    },
});

export default Loader;
