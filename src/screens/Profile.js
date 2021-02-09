import React from "react";
import {
	Body,
	StyledButton,
	ButtonTitle,
	Title,
	Subtitle,
	Card,
	FullCard,
} from "../../constants/styledComponents";
import { authentication } from "../../firebase";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Profile = ({navigation}) => {
	const insets = useSafeAreaInsets()

	const { displayName, email } = authentication.currentUser;
	return (
		<Body insetTop={insets.top} insetBottom={insets.bottom + 50}>
			<FullCard >
				<Title>{displayName}</Title>
				<Subtitle>{email}</Subtitle>
				<StyledButton
					style={{ background: "red", borderWidth: 0 }}
					onPress={() =>
						authentication
							.signOut()
							.then(() => navigation.replace("SignIn"))
					}
				>
					<ButtonTitle>Log Out</ButtonTitle>
				</StyledButton>
			</FullCard>
		</Body>
	);
};

export default Profile;
