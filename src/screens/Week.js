import React, { useContext, useEffect, useState } from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../../constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import WeekHeader from "../components/WeekHeader";
import {
	InputText,
	Subtitle,
	Card,
	ScrollBody,
} from "../../constants/styledComponents";
import { Temporal } from "proposal-temporal";
import { authentication, db } from "../../firebase";
import { Context } from '../context/ContextComponent';
import Objective from '../components/Objective';




const days = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];


function getWeekDate() {
	const nowDate = Temporal.PlainDate.from(Temporal.now.zonedDateTimeISO());
	const daysAfterMonday = 7 - nowDate.dayOfWeek;
	const weekDate = nowDate.add({ days: -daysAfterMonday });
	return weekDate;
}




const Week = ({ navigation, route }) => {
	const insets = useSafeAreaInsets();

	const {objectives, setObjectives} = useContext(Context)

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
					.filter(doc => doc.data().text != "")
					.map((doc, index) => {
						var newDoc = doc.data();
						newDoc.id = doc.id;
						newDoc.n = index
						return newDoc;
						
					})
				);
			});
	}, [date]);


	
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
			.add({ text: "", done: false, type, order: objectives.length})
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
			<WeekHeader onPressNext={() => onChangeDate("+")} onPressPrevious={() => onChangeDate("-")} date={date}/>

			<ScrollBody insetTop={70 + insets.top} insetBottom={70 + insets.bottom}>
				<Card>
					<Subtitle>Objectives</Subtitle>

					{objectives
						?.filter((objective) => objective.type === "week")
						.sort((a, b) => {
							return a.n - b.n;
						})
						.map((objective) => (
							<Objective n={objective.n} text={objective.text} id={objective.id} isDone={objective.done}  date={date}/>
						))}

					<AddButton onPress={() => onAddObjective("week")}>
						<MaterialCommunityIcons name="plus" size={25} />
					</AddButton>

					<Subtitle>Notes</Subtitle>

					<InputText
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
					<Card>
						<Subtitle>
							{day} {dayDate(index)}
						</Subtitle>

						{objectives
							?.filter((objective) => objective.type === day)
							.map((objective) => (
								<Objective n={objective.n} text={objective.text} id={objective.id} isDone={objective.done}  date={date}/>

								
						))}

						<AddButton onPress={() => onAddObjective(day)}>
							<MaterialCommunityIcons name="plus" size={25} />
						</AddButton>
					</Card>
				))}
			</ScrollBody>
		</>
	);
}





const AddButton = styled.TouchableOpacity`
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



export default Week;
