import React, { useState, createContext, useEffect } from "react";
import { authentication } from "../../firebase";

export const Context = createContext();

function getCurrentUserId() {
	if (authentication.currentUser) {
		return authentication.currentUser.uid;
	} else {
		return null;
	}
}

const ContextComponent = (props) => {
	const [objectives, setObjectives] = useState([]);
	const [actualRoute, setActualRoute] = useState()

	

	return (
		<Context.Provider
			value={{
				objectives,
				setObjectives,
				actualRoute,
				setActualRoute
			}}
		>
			{props.children}
		</Context.Provider>
	);
};

export default ContextComponent;
