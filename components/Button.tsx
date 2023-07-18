import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps extends TouchableOpacityProps {
  children?: React.ReactNode;
}

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity
      // onPress={() => alert("Helllo")}
      className="rounded-full overflow-hidden mt-4 w-full"
      {...rest}
    >
      <LinearGradient
        colors={["#CC9933", "#926f34"]}
        start={[0, 1]}
        end={[1, 0]}
        className="py-2"
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
