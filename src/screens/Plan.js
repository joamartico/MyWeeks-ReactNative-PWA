import React, { useState } from "react";
import { View, Text, SafeAreaView } from "react-native";
import {
	Card,
	InputNotes,
	ScrollBody,
	Subtitle,
} from "../../constants/styledComponents";
import WeekHeader from "../components/WeekHeader";
import { Temporal } from "proposal-temporal";
import SegmentedControl from "@react-native-community/segmented-control";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getDate = () => {
	return Temporal.PlainDate.from(Temporal.now.zonedDateTimeISO());
};

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

const segmentValues = ["Month", "Year", "Five Years", "Ten Years"];

const Plan = ({ route }) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const insets = useSafeAreaInsets();
	const [date, setDate] = useState(getDate());

	const selectedSegment = segmentValues[selectedIndex];

	const changeTime = (selectedSegmentt, symbol) => {
		switch (selectedSegmentt) {
			case "Month":
				if (symbol === "+") {
					const newDate = date.add({ months: 1 });
					setDate(newDate);
				}
				if (symbol === "-") {
					const newDate = date.add({ months: -1 });
					setDate(newDate);
					console.log(date);
				}
				break;
			case "Year":
				if (symbol === "+") {
					const newDate = date.add({ years: 1 });
					setDate(newDate);
				}
				if (symbol === "-") {
					const newDate = date.add({ years: -1 });
					setDate(newDate);
				}
				break;
			case "Five Years":
				if (symbol === "+") {
					const newDate = date.add({ years: 5 });
					setDate(newDate);
				}
				if (symbol === "-") {
					const newDate = date.add({ years: -5 });
					setDate(newDate);
				}
				break;
			case "Ten Years":
				if (symbol === "+") {
					const newDate = date.add({ years: 10 });
					setDate(newDate);
				}
				if (symbol === "-") {
					const newDate = date.add({ years: -10 });
					setDate(newDate);
				}
				break;
		}
	};


	return (
		<>
			<View
				style={{
					backgroundColor: "transparent",
					zIndex: 9999999999999,
					padding: 15,
					paddingTop: insets.top + 22,
				}}
			>
				<SegmentedControl
					style={{ zIndex: 999999999 }}
					values={segmentValues}
					selectedIndex={selectedIndex}
					onChange={(event) => {
						setSelectedIndex(
							event.nativeEvent.selectedSegmentIndex
						);
					}}
				/>
			</View>
			<WeekHeader
				insetTop={insets.top + 65}
				date={date}
				time={selectedSegment}
				onPressNext={() => changeTime(selectedSegment, "+")}
				onPressPrevious={() => changeTime(selectedSegment, "-")}
			/>

			<ScrollBody>
				<Card
					insetTop={85 + insets.top}
					insetBottom={100 + insets.bottom}
				>
					<Subtitle>Objectives</Subtitle>

					{objectives
						?.filter((objective) => objective.type === "week")
						.sort((a, b) => {
							return a.n - b.n;
						})
						.map((objective) => (
							<Objective
								key={objective.id}
								n={objective.n}
								text={objective.text}
								id={objective.id}
								isDone={objective.done}
								date={date}
							/>
						))}

					<AddButton onPress={() => onAddObjective("week")}>
						<MaterialCommunityIcons name="plus" size={25} />
					</AddButton>

					<Subtitle>Notes</Subtitle>

					<InputNotes
						value={notes}
						onChangeText={(text) => {
							setNotes(text);
							weekRef.set({ notes: text });
						}}
						multiline={true}
						numberOfLines={20}
						placeholder="Write your achievements, mistakes, learnings and thoughts of the week"
					/>
				</Card>
			</ScrollBody>
		</>
	);
};

export default Plan;
