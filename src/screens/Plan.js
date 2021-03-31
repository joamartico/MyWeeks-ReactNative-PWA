import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { authentication, db } from "../../firebase";
import { Context } from "../context/ContextComponent";
import Objective from "../components/Objective";
import AddButton from "../components/AddButton";


const segmentValues = ["Months", "Years", "Five Years", "Ten Years"];

const getDate = () => {
	return Temporal.PlainDate.from(Temporal.now.zonedDateTimeISO());
};

const Plan = ({ route, navigation }) => {
	const insets = useSafeAreaInsets();

	const { objectives, setObjectives, actualRoute,  } = useContext(Context);

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [selectedSegment, setSelectedSegment] = useState("Months");
	const [date, setDate] = useState(getDate());
	const [notes, setNotes] = useState("");

	const changeTime = (selectedSegmentt, symbol) => {
		switch (selectedSegmentt) {
			case "Months":
				if (symbol === "+") {
					const newDate = date.add({ months: 1 });
					setDate(newDate);
				}
				if (symbol === "-") {
					const newDate = date.add({ months: -1 });
					setDate(newDate);
				}
				break;
			case "Years":
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

	function getDocName(selectedSegmentt) {
		if (selectedSegmentt == "Months") return `${date.year}-${date.month}`;
		if (selectedSegmentt == "Years") return date.year.toString();
		if (selectedSegmentt == "Five Years")
			return `${date.year}-${date.year + 5}`;
		if (selectedSegmentt == "Ten Years")
			return `${date.year}-${date.year + 10}`;
	}

	const timeRef =
		selectedSegment && authentication.currentUser && 
		db
			.collection("users")
			.doc(authentication.currentUser.uid)
			.collection(selectedSegment)
			.doc(getDocName(selectedSegment));

	useEffect(() => {
		timeRef
			?.get()
			.then((doc) => {
				doc.data() ? setNotes(doc.data().notes) : setNotes("");
			})
			.catch((err) => console.log(err));

		timeRef
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
		
	}, [date, selectedSegment, actualRoute]);

	useEffect(() => {
		setDate(getDate())
	}, [selectedSegment])

	const onAddObjective = () => {
		timeRef
			.collection("objectives")
			.add({
				text: "",
				done: false,

				order: objectives.length,
			})
			.then((res) => {
				setObjectives([
					...objectives,
					{
						text: "",
						done: false,

						n: objectives.length,
						id: res.id,
					},
				]);
			});
	};

	useEffect(() => {
		console.log("CAMBIO LA RUTA");
	}, [actualRoute])



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
						setSelectedSegment(
							segmentValues[
								event.nativeEvent.selectedSegmentIndex
							]
						);
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
					style={{ marginTop: "12vh" }}
					// style={{marginTop: "50%", marginBottom: "50%"}}
				>
					<Subtitle>Objectives</Subtitle>

					{objectives

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
								time={selectedSegment}
							/>
						))}

					<AddButton onPress={() => onAddObjective()} />

					<Subtitle>Notes</Subtitle>

					<InputNotes
						value={notes}
						onChangeText={(text) => {
							setNotes(text);
							timeRef.set({ notes: text });
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
