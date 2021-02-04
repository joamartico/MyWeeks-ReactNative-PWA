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
	const [initializing, setInitializing] = useState(true);
	const [user, setUser] = useState(null);

	// Handle user state changes
	function onAuthStateChanged(result) {
		setUser(result);
		if (initializing) setInitializing(false);
	}

	useEffect(() => {
		const authSubscriber = authentication.onAuthStateChanged(onAuthStateChanged);

		// unsubscribe on unmount
		return authSubscriber;
	}, []);

	

	return (
		<Context.Provider
			value={{
				objectives,
				setObjectives,
				initializing,
				setInitializing,
				user,
				setUser,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};

export default ContextComponent;
