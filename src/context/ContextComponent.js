import React, { useState, createContext } from "react";

export const Context = createContext();

const ContextComponent = (props) => {
	const [objectives, setObjectives] = useState([]);

	return (
		<Context.Provider
			value={{
				objectives,
				setObjectives,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};

export default ContextComponent;
