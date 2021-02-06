import { BlurView } from "expo-blur";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
				<Pressable onPress={onPressPrevious}>
					<MaterialCommunityIcons
						name="chevron-left"
						size={40}
						color={COLORS.bg}
					/>
				</Pressable>

				<Title>
					
						
					{time == "week" &&`${fromDayMonth} ${fromDayNumber} - ${toDayNumber < 7 ? `${toDayMonth} ` : ""}${toDayNumber}`}
					{time == "Month" && fromDayMonth}
					{time == "Year" && date.year}
					{time == "Five Years" && `${date.year} - ${date.add({years: 5}).year}`}
					{time == "Ten Years" && `${date.year} - ${date.add({years: 10}).year}`}
				
				</Title>

				<Pressable onPress={onPressNext}>
					<MaterialCommunityIcons
						name="chevron-right"
						size={40}
						color={COLORS.bg}
					/>
				</Pressable>
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
	background-color: #fff;
	z-index: 1000;
	justify-content: space-evenly;
	align-items: center;
	width: "100%";
`;

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
