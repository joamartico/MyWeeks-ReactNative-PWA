import React, { useContext } from "react";
import { View, Text } from "react-native";
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { InputText } from "../../constants/styledComponents";
import { authentication, db } from "../../firebase";
import { Context } from '../context/ContextComponent';
import styled from 'styled-components/native';
import { COLORS } from "../../constants/theme";


const Objective = ({isDone, id, n, text, date}) => {

    const {objectives, setObjectives} = useContext(Context)


    const weekRef =
		authentication.currentUser &&
		db
			.collection("users")
			.doc(authentication.currentUser.uid)
			.collection("weeks")
			.doc(date.toString());


    const onChangeObjective = (text, id, n) => {
        console.log(n, text);
        
		objectives.sort((a, b) => a.n - b.n);
		const newObjectives = objectives.slice();
		newObjectives[n].text = text;
		setObjectives(newObjectives);
		weekRef.collection("objectives").doc(id).update({ text: text });
	};

	const onChangeCheckBox = (isChecked, id, n) => {
		objectives.sort((a, b) => a.n - b.n);
		const newObjectives = objectives.slice();
		newObjectives[n].done = !isChecked;
		setObjectives(newObjectives);
		weekRef.collection("objectives").doc(id).update({ done: !isChecked });
	};


	return (
		<ObjectiveBody>
			<BouncyCheckbox
				text=""
				onPress={() =>
					onChangeCheckBox(isDone, id, n)
				}
				isChecked={isDone}
				borderColor={COLORS.secondary}
				fillColor={COLORS.secondary}
				style={{
					marginRight: -10,
					marginLeft: 0,
				}}
			/>

			<InputText
				autoFocus={true}
				value={text}
				onChangeText={(text) =>
					onChangeObjective(text, id, n)
				}
			/>
		</ObjectiveBody>
	);
};

export default Objective;

const ObjectiveBody = styled.View`
	flex-direction: row;
	width: 100%;
	height: 30;
	margin-bottom: 2px;
	border-bottom-width: 1px;
	border-bottom-color: lightgray;
`;

