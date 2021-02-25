import React, { useContext, useEffect, useState, useRef } from "react";
import { Pressable, Text } from "react-native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WeekHeader from "../components/WeekHeader";
import {
	InputNotes,
	Subtitle,
	Card,
	ScrollBody,
	AddButton,
} from "../../constants/styledComponents";
import { Temporal } from "proposal-temporal";
import { authentication, db } from "../../firebase";
import { Context } from "../context/ContextComponent";
import Objective from "../components/Objective";

const days = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const nowDate = Temporal.PlainDate.from(Temporal.now.zonedDateTimeISO());

function getWeekDate() {

	const daysAfterMonday = nowDate.dayOfWeek - 1;
	const weekDate = nowDate.add({ days: -daysAfterMonday });
	return weekDate;
}

const Week = ({ navigation, route }) => {
	const insets = useSafeAreaInsets();
	const {
		objectives,
		setObjectives,
		actualRoute,
		setActualRoute,
	} = useContext(Context);
	const [date, setDate] = useState(getWeekDate());
	const [notes, setNotes] = useState("");

	const weekRef =
		authentication.currentUser &&
		db
			.collection("users")
			.doc(authentication.currentUser.uid)
			.collection("weeks")
			.doc(date.toString());

	useEffect(() => {
		weekRef
			?.get()
			.then((doc) => {
				doc.data() ? setNotes(doc.data().notes) : setNotes("");
			})
			.catch((err) => console.log(err));

		weekRef
			?.collection("objectives")
			.orderBy("order", "asc")
			.get()
			.then((snapshot) => {
				setObjectives(
					snapshot.docs
						.filter((doc) => doc.data().text != "")
						.map((doc, index) => {
							var newDoc = doc.data();
							newDoc.id = doc.id;
							newDoc.n = index;
							return newDoc;
						})
				);
			});
		setActualRoute(route.name);
	}, [date, actualRoute]);

	const onChangeDate = (symbol) => {
		if (symbol === "+") {
			const newDate = date.add({ days: 7 });
			setDate(newDate);
		}
		if (symbol === "-") {
			const newDate = date.add({ days: -7 });
			setDate(newDate);
		}
	};

	const onAddObjective = (type) => {
		weekRef
			.collection("objectives")
			.add({
				text: "",
				done: false,
				type,
				order: objectives.length,
			})
			.then((res) => {
				setObjectives([
					...objectives,
					{
						text: "",
						done: false,
						type,
						n: objectives.length,
						id: res.id,
					},
				]);
			});
	};

	function dayDate(daysAfterMonday) {
		const day = date.add({ days: daysAfterMonday }).day;
		const month = date.add({ days: daysAfterMonday }).month;
		return `${day}/${month}`;
	}

	return (
		<>
			<WeekHeader
				onPressNext={() => onChangeDate("+")}
				onPressPrevious={() => onChangeDate("-")}
				date={date}
				time="weeks"
				insetTop={insets.top}
			/>

			<ScrollBody
				showsVerticalScrollIndicator={false}
				insetTop={70 + insets.top}
				insetBottom={70 + insets.bottom}
			>
				<Card>
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
								time="weeks"
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

				{days.map((day, index) => (
					<Card key={index}>
						<Subtitle>
							{day} 
							{dayDate(index)} {dayDate(index) == `${nowDate.day}/${nowDate.month}` && (
							<TodayText>
								Today
							</TodayText>)}
						</Subtitle>

						{objectives
							?.filter((objective) => objective.type === day)
							.map((objective) => (
								<Objective
									key={objective.id}
									n={objective.n}
									text={objective.text}
									id={objective.id}
									isDone={objective.done}
									date={date}
									time="weeks"
								/>
							))}

						<AddButton onPress={() => onAddObjective(day)}>
							<MaterialCommunityIcons name="plus" size={25} />
						</AddButton>
					</Card>
				))}
			</ScrollBody>
		</>
	);
};

export default Week;

const TodayText = styled.Text`
	margin-left: auto;
	font-weight: bold;


`