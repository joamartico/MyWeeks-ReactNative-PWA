import React, { useState } from "react";
import styled from "styled-components/native";
import { authentication, db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import {
	Body,
	StyledButton,
	ButtonTitle,
	Title,
	FullCard,
} from "../../constants/styledComponents";

const SignUp = () => {
	const navigation = useNavigation();

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
				<Title>Create your account</Title>
				<Input
					placeholder="name"
					value={name}
					onChangeText={(val) => setName(val)}
				/>
				<Input
					placeholder="email"
					value={email}
					onChangeText={(val) => setEmail(val)}
				/>
				<Input
					placeholder="password"
					value={password}
					onChangeText={(val) => setPassword(val)}
					secureTextEntry={true}
				/>
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
