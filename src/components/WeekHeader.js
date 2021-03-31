import { BlurView } from "expo-blur";
import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from "styled-components/native";
import { Title } from "../../constants/styledComponents";


const months = [
	"January",
	"February",
	"March",
	"Arpil",
	"May",
	"june",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];


const WeekHeader = ({ date, onPressNext, onPressPrevious, time, insetTop }) => {
	
	const fromDayNumber = date.day;
	const fromDayMonthNumber = date.month;
	const fromDayMonth = months[fromDayMonthNumber - 1];

	const toDayNumber = date.add({ days: 6 }).day;
	const toDayMonthNumber = date.add({ days: 6 }).month;
	const toDayMonth =  months[toDayMonthNumber - 1];

	return (
		// <BlurView intensity={90} tint="light" style={[{height: 70 + insets.top, paddingTop: insets.top}, styles.header]} >
		// 	<MaterialCommunityIcons
		// 		name="chevron-left"
		// 		size={40}
		// 		color={COLORS.secondary}
		// 	/>
		// 	<Text style={styles.title}>{title}</Text>
		// 	<MaterialCommunityIcons
		// 		name="chevron-right"
		// 		size={40}
		// 		color={COLORS.secondary}
		// 	/>
		// </BlurView>








		<Header style={{ height: 70 + insetTop, paddingTop: insetTop }}>
			<Wrapper>
				<TouchableOpacity onPress={onPressPrevious}>
					<MaterialCommunityIcons
						name="chevron-left"
						size={40}
						color={COLORS.bg}
					/>
				</TouchableOpacity>

				<Title>
					{time == "weeks" &&`${fromDayMonth} ${fromDayNumber} - ${toDayNumber < 7 ? `${toDayMonth} ` : ""}${toDayNumber}`}
					{time == "Months" && fromDayMonth}
					{time == "Years" && date.year}
					{time == "Five Years" && `${date.year} - ${date.add({years: 5}).year}`}
					{time == "Ten Years" && `${date.year} - ${date.add({years: 10}).year}`}
				
				</Title>

				<TouchableOpacity onPress={onPressNext}>
					<MaterialCommunityIcons
						name="chevron-right"
						size={40}
						color={COLORS.bg}
					/>
				</TouchableOpacity>

				</Wrapper>
			</Header>
	);
};

export default WeekHeader;

const Header = styled.View`
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	border-bottom-color: #6666;
	border-bottom-width: 1px;
	flex-direction: row;
	/* background-color: #fff; */
	background: #fffc;
	backdrop-filter: blur(16px);
	z-index: 1000;
	justify-content: center;
	align-items: center;
	width: "100%";
`;

const Wrapper = styled.View`
	width: 100%;
	max-width: 700px;
	height: 100%;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: center;


`

const styles = StyleSheet.create({
    header: {
	position: "absolute",
	left: 0,
	right: 0,
	top: 0,
	borderBottomColor: "#6666",
	borderBottomWidth: 1,
	flexDirection: "row",
	backgroundColor: "#fff",
	zIndex: 1000,
	justifyContent: "space-evenly",
	alignItems: "center",
	width: "100%",
    },

title: {
	fontSize: 24,
	fontWeight: "bold",
	color: COLORS.primary,
	alignItems: "center",
}
});
