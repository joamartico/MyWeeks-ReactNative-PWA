import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { COLORS } from "./theme";

export const ScrollBody = styled.ScrollView`
	height: ${Dimensions.get("window").height};
	width: 100vw;
	background: ${COLORS.bg};
	padding-left: 10px;
	padding-right: 10px;
	aspect-ratio: 1;
	padding-top: ${({ insetTop }) => insetTop};
	padding-bottom: ${({ insetBottom }) => insetBottom};
`;

export const Body = styled.SafeAreaView`
	height: 100vh;
	width: 100vw;
	background: ${COLORS.bg};
	padding-left: 10px;
	padding-right: 10px;
	aspect-ratio: 1;
	/* padding-top: ${({ insetTop }) => 20 + insetTop};
	padding-bottom: ${({ insetBottom }) => 20 + insetBottom}; */
	padding-top: 20px;
	padding-bottom: 20px;
	align-items: center;
	justify-content: center;
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
	width: 100%;
	/* height: 100%; */
	padding: 15px;
	border-radius: 15px;
	/* margin-bottom: 20px;
	margin-top: 20px; */
	padding-top: 25px;
	padding-bottom: 25px;
	height: ${({ insetTop, insetBottom }) =>
		Dimensions.get("window").height - 20 - 20 - insetTop- insetBottom};
	box-shadow: 0 7px 5px ${() => "#0004"};
	flex-direction: column;
	justify-content: space-around;
	margin-top: ${({ insetTop }) => insetTop && insetTop};
	margin-bottom: ${({ insetBottom }) => insetBottom && insetBottom};
`;

export const Title = styled.Text`
	font-size: 20px;
	font-weight: bold;
	color: ${COLORS.primary};
	align-items: center;
`;

export const Subtitle = styled.Text`
	font-size: 20;
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
	background-color: ${COLORS.secondary};
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
