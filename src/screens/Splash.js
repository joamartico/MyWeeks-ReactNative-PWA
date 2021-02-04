import React from "react";
import { View, Text, Image } from "react-native";
import { COLORS } from "../../constants/theme";

const Splash = () => {
	return (
		<View style={{ flex: 1, background: COLORS.bg }}>
			<Image
				source={require("../../assets/icon.png")}
				style={{ height: "100%", width: "100%" }}
				resizeMode="contain"
			/>
		</View>
	);
};

export default Splash;
