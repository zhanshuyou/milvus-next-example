"use client";

import { useState } from "react";

export const LangchainExample = () => {
	const [data, setData] = useState<any>();

	const handleClick = async () => {
		const data = await fetch("/api/langchain").then((res) => res.json());
		setData(data);
	};

	return (
		<div>
			<button onClick={handleClick}>Get Vector Data</button>
			<div>{JSON.stringify(data)}</div>
		</div>
	);
};
