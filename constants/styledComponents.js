import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { COLORS, screenHeight, screenWidth } from "./theme";

export const ScrollBody = styled.ScrollView`
	height: ${screenHeight};
	width: 100vw;
	background: ${COLORS.bg};
	padding-left: 10px;
	padding-right: 10px;
	padding-top: ${({ insetTop }) => insetTop};
	padding-bottom: ${({ insetBottom }) => insetBottom};
	aspect-ratio: 1;
`;

export const Body = styled.SafeAreaView`
	height: ${({ insetBottom, insetTop }) => screenHeight + insetTop};
	/* width: 100vw; */
	width: ${screenWidth};
	background: ${COLORS.bg};
	padding-left: 10px;
	padding-right: 10px;
	padding-top: ${({ insetTop }) => insetTop + 15};
	padding-bottom: ${({ insetBottom }) => insetBottom + 15};
	/* padding-top: 10px;
	padding-bottom: 10px; */
	align-items: center;
	justify-content: center;
	aspect-ratio: 1;
`;

export const Card = styled.View`
	background-color: #fff;
	width: 100%;
	padding: 15px;
	border-radius: 15px;
	margin-top: 20px;
	box-shadow: 0 7px 5px ${() => "#0004"};
`;

export const FullCard = styled.View`
	background-color: #fff;
	padding: 15px;
	border-radius: 15px;
	padding-top: 25px;
	padding-bottom: 25px;
	margin-top: 10px;
	margin-bottom: 10px;
	height: 100%;
	width: 100%;
	/* height: ${({ insetTop, insetBottom }) =>
		Dimensions.get("window").height - insetTop - insetBottom};
	margin-top: ${({ insetTop }) => insetTop};
	margin-bottom: ${({ insetBottom }) => insetBottom + 30}; */
	box-shadow: 0 7px 5px ${() => "#0004"};
	flex-direction: column;
	justify-content: space-around;
	/* position: absolute;
	bottom: ${({ insetBottom }) => insetBottom + 15};
	top: ${({ insetTop }) => insetTop + 15};
	left: 10px;
	right: 10px; */
	/* height: ${({ insetTop, insetBottom }) =>
		Dimensions.get("window").height - 20 - 20 - insetTop - insetBottom}; */
`;

export const Title = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: ${COLORS.primary};
	align-items: center;
`;

export const Subtitle = styled.Text`
	font-size: 20;
	display: flex;
	/* font-weight: bold; */
	color: ${COLORS.primary};
	margin-bottom: 8px;
`;

export const StyledButton = styled.TouchableOpacity`
	margin-top: 20px;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 55;
	border-radius: 10;
	border-width: 1;
	border-color: ${COLORS.primary};
	background-color: ${COLORS.primary};
	border-color: ${COLORS.primary};
`;

export const ButtonTitle = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: white;
`;

export const InputNotes = styled.TextInput`
	width: 100%;
	font-size: 15px;
`;

export const InputObjective = styled.TextInput`
	width: 100vw;
	font-size: 15px;
	margin-left: auto;
`;

export const AddButton = styled.TouchableOpacity`
	background-color: #37d673;
	height: 35;
	width: 35;
	margin-top: 15px;
	margin-bottom: 20px;
	align-self: center;
	border-radius: 10;
	justify-content: center;
	align-items: center;
`;

export const InputText = styled.TextInput`
	font-size: 18px;
	/* padding-left: 10px; */
	margin-top: 20px;
	width: 100%;
	height: 50px;
	/* border-radius: 6px; */
	border-bottom-width: 1px;
	border-color: ${COLORS.primary};
`;
