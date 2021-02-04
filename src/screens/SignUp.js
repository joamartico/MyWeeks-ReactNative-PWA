import React, { useState } from "react";
import styled from "styled-components/native";
import { authentication, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	Body,
	StyledButton,
	ButtonTitle,
	Title,
	FullCard,
	InputText,
	Subtitle,
} from "../../constants/styledComponents";
import { View } from "react-native";

const SignUp = () => {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSignUp = () => {
		authentication
			.createUserWithEmailAndPassword(email, password)
			.then(async (res) => {
				db.collection("users").doc(res.user.uid).set({
					name,
					email,
					password,
				});
				await authentication.currentUser
					.updateProfile({
						displayName: name,
					})
					.then(() => navigation.navigate("BottomTabs"));
			})
			.catch((err) => console.log(err));
	};

	return (
		<Body>
			<FullCard insetTop={insets.top} insetBottom={insets.bottom}>
				<Title style={{ fontSize: "5vh" }}>Create your account</Title>

				<View>
					<Subtitle>User Name</Subtitle>
					<InputText
						style={{marginTop: 0}}
						placeholder="Enter your name"
						value={name}
						onChangeText={(val) => setName(val)}
					/>
				</View>

				<View>
					<Subtitle>Email</Subtitle>
					<InputText
						style={{marginTop: 0}}

						placeholder="Enter your email"
						value={email}
						onChangeText={(val) => setEmail(val)}
					/>
				</View>

				<View>
					<Subtitle>Password</Subtitle>
					<InputText
						style={{marginTop: 0}}

						placeholder="Enter your password"
						value={password}
						onChangeText={(val) => setPassword(val)}
						secureTextEntry={true}
					/>
				</View>

				<StyledButton onPress={() => onSignUp()}>
					<ButtonTitle>Sign Up</ButtonTitle>
				</StyledButton>
			</FullCard>
		</Body>
	);
};

// const Title = styled.Text`
// 	font-size: 24px;
// 	font-weight: bold;
// 	color: ${COLORS.primary};
// `;

const Input = styled.TextInput`
	padding-left: 10px;
	margin-top: 10px;
	width: 100%;
	height: 30px;
	border-radius: 6px;
	border-width: 1px;
`;

// const StyledButton = styled.TouchableOpacity`
// 	margin-top: 20px;
// 	justify-content: center;
// 	align-items: center;
// 	width: 100%;
// 	height: 45;
// 	border-radius: 10;
// 	background-color: ${COLORS.primary};
// `;

export default SignUp;
