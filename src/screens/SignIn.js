import React, { useState } from "react";
import { COLORS } from "../../constants/theme";
import styled from "styled-components/native";
import { authentication, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import {
	Body,
	StyledButton,
	ButtonTitle,
	InputText,
	Title,
	Card,
	FullCard,
} from "../../constants/styledComponents";
import { Alert, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

const SignIn = ({ navigation }) => {
	const insets = useSafeAreaInsets();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSignIn = () => {
		authentication
			.signInWithEmailAndPassword(email, password)
			.then((user) => {
				console.log(user);
				navigation.navigate("BottomTabs");
			})
			.catch((err) => {
				function getMessage(err) {
					if(err.code === "auth/user-not-found") return `The email ${email} is not registered`
					if(err.code === "auth/wrong-password") return `The password is incorrect`
				}
				alert(getMessage(err) || err);
				console.log(err);
			});
	};

	const PROVIDER_ID =
		"660837128286-colba8t7tkdsr0rnibm2jju7drag6t84.apps.googleusercontent.com";

	const uiConfig = {
		signInFlow: "popup",

		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		],
		// signInSuccessUrl: "/bottomtabs/weeks",
		callbacks: {
			signInSuccess: () => navigation.replace("BottomTabs"),
		},
	};

	return (
		<>
			<Body insetTop={insets.top} insetBottom={insets.bottom}>
				{/* <Title style={{marginTop: 30, fontSize: 30,  }}>Welcome to MyWeeks!</Title> */}
				<FullCard>
					<Title style={{ fontSize: "5vh", marginTop: "2vh" }}>
						Login to your Account
					</Title>
					<View>
						<InputText
							placeholder="Email"
							value={email}
							onChangeText={(val) => setEmail(val)}
						/>
						<InputText
							placeholder="Password"
							value={password}
							onChangeText={(val) => setPassword(val)}
							secureTextEntry={true}
						/>

						<Text
							style={{
								color: "gray",
								marginTop: 20,
								textAlign: "center",
								textDecorationLine: "underline",
							}}
						>
							Forgot your password?
						</Text>

						<StyledButton
							onPress={() => onSignIn()}
							style={{ marginTop: 20 }}
						>
							<ButtonTitle>Sign In</ButtonTitle>
						</StyledButton>

						<StyledButton
							onPress={() => navigation.navigate("SignUp")}
							style={{
								marginTop: 10,
								borderWidth: 1,
								background: "white",
							}}
						>
							<ButtonTitle style={{ color: COLORS.primary }}>
								Create an account
							</ButtonTitle>
						</StyledButton>
					</View>

					<View>
						<Text
							style={{
								color: "gray",
								marginTop: "6%",
								marginBottom: "15",
								fontSize: 20,
								textAlign: "center",
							}}
						>
							Or connect with
						</Text>
						<Row>
							<StyledFirebaseAuth
								uiConfig={uiConfig}
								firebaseAuth={authentication}
								style={{ width: "100%!" }}
							/>

							{/* <SocialButton style={{ borderColor: "#eb060a" }}>
								<ButtonTitle style={{ color: "#eb060a" }}>
									Google
								</ButtonTitle>
							</SocialButton>

							<SocialButton style={{ borderColor: "#1a4367" }}>
								<ButtonTitle style={{ color: "#1a4367" }}>
									Facebook
								</ButtonTitle>
							</SocialButton> */}
						</Row>
					</View>
				</FullCard>
			</Body>
		</>
	);
};

export default SignIn;

const SocialButton = styled.TouchableOpacity`
	height: 45px;
	border-radius: 20;
	width: 140;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
	margin-left: 10px;
	border-width: 1;
`;

const Row = styled.View`
	flex-direction: row;
	width: 100%;
	justify-content: center;
	padding-left: 40px;
	padding-right: 40px;
	align-items: center;
	margin-bottom: 25px;
`;
