import React, { useState } from "react";
import { COLORS } from "../../constants/theme";
import styled from "styled-components/native";
import { authentication, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import {
	Body,
	StyledButton,
	ButtonTitle,
	Title,
	Card,
	FullCard,
} from "../../constants/styledComponents";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";

const SignIn = ({navigation}) => {

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
			.catch((err) => console.log(err));
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
			signInSuccess: () => navigation.replace("BottomTabs")
		},
		
	};

	return (
		<>
			<Body>
				{/* <Title style={{marginTop: 30, fontSize: 30,  }}>Welcome to MyWeeks!</Title> */}
				<FullCard insetTop={insets.top} insetBottom={insets.bottom}>
					<Title style={{ fontSize: 40 }}>
						Welcome to {""} MyWeeks!
					</Title>
					<View>
						<Input
							placeholder="Email"
							value={email}
							onChangeText={(val) => setEmail(val)}
						/>
						<Input
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
								marginTop: 45,
								marginBottom: 20,
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
								uiCallback={() => <Text>hola</Text>}
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

const Input = styled.TextInput`
	font-size: 20px;
	padding-left: 10px;
	margin-top: 20px;
	width: 100%;
	height: 50px;
	/* border-radius: 6px; */
	border-bottom-width: 1px;
	border-color: ${COLORS.primary};
`;
