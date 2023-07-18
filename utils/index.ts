import Toast from "react-native-root-toast";

export const toast = (msg: string) => {
    Toast.show(msg, {
        duration: Toast.durations.LONG,
        animation: true,
        opacity: 50,
    });
};
