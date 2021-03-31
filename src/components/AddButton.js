import React from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native"

const AddButton = ({ onPress }) => {
	return (
		<Wrapper>
			<Ionicons
				onPress={onPress}
				name="ios-add-circle"
				size={36}
				color="#c5c4c6cc"
			/>
			{/* <MaterialCommunityIcons name="plus" size={25} color="white" /> */}
		</Wrapper>
	);
};

export const Wrapper = styled.TouchableOpacity`
	/* background-color: #c5c4c6; */
	height: 35;
	width: 35;
	margin-top: 15px;
	margin-bottom: 20px;
	align-self: center;
	border-radius: 50%;
	justify-content: center;
	align-items: center;
`;

//  const AddButton = styled.TouchableOpacity`
// 	background-color: #37d673;
// 	height: 35;
// 	width: 35;
// 	margin-top: 15px;
// 	margin-bottom: 20px;
// 	align-self: center;
// 	border-radius: 10;
// 	justify-content: center;
// 	align-items: center;
// `;

export default AddButton;
