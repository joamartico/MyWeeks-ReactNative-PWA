import React, { useState } from "react";
import { View, Text } from "react-native";
import {
	Body,
	Title,
	FullCard,
	Subtitle,
	StyledButton,
	ButtonTitle,
} from "../../constants/styledComponents";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import PWAPrompt from "react-ios-pwa-prompt";
import { COLORS } from "../../constants/theme";






const Onboarding = ({ navigation }) => {
	const [showPWAPrompt, setShowPWAPrompt] = useState(false);
	const insets = useSafeAreaInsets();

	function IsSafari() {
		let userAgentString = navigator.userAgent;

		console.log(userAgentString);

		// Detect Chrome
		let chromeAgent = userAgentString.indexOf("Chrome") > -1;

		// Detect Safari
		let safariAgent = userAgentString.indexOf("Safari") > -1;

		// Discard Safari since it also matches Chrome
		if (chromeAgent && safariAgent) safariAgent = false;

		console.log(safariAgent);
		return safariAgent;
	}

	return (
		<Body insetTop={insets.top} insetBottom={insets.bottom}>
			<FullCard>
				{/* <FullCard insetTop={insets.top} insetBottom={insets.bottom}> */}
				<View
					style={{
						height: "30%",
						margin: "auto",
						maxWidth: "550px",
						// backgroundColor: "red",
					}}
				>
					<Title style={{ fontSize: "7vh" }}>
						Welcome to {""} MyWeeks!
					</Title>

					<Subtitle style={{ marginTop: "3vh" }}>
						Your weekly schedule app to manage your time and achive
						your goals
					</Subtitle>
				</View>
				{IsSafari() && (
					<StyledButton
						style={{
							marginTop: "auto",
							background: "#fff",
							marginBottom: 10,
						}}
						onPress={() => setShowPWAPrompt(true)}
					>
						<ButtonTitle style={{ color: COLORS.primary }}>
							Install App
						</ButtonTitle>
					</StyledButton>
				)}
				<StyledButton
					style={{ marginTop: "10" }}
					onPress={() => navigation.navigate("SignIn")}
				>
					<ButtonTitle>Get Started!</ButtonTitle>
				</StyledButton>
			</FullCard>

			{showPWAPrompt && (
				<PWAPrompt
					// debug={showPWAPrompt}
					debug={true}
					delay={5}
					onClose={() =>
						setTimeout(function () {
							setShowPWAPrompt(false);
						}, 300)
					}
				/>
			)}
		</Body>
	);
};

export default Onboarding;
