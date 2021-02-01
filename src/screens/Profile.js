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
		<Body>
			<FullCard insetTop={insets.top} insetBottom={insets.bottom + 60}>
				<Title>{displayName}</Title>
				<Subtitle>{email}</Subtitle>
				<StyledButton
					style={{ background: "red" }}
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
