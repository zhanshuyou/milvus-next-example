"use client";

import { useState } from "react";

export const LangchainExample = () => {
	const [dataGet, setDataGet] = useState<any>();
	const [dataPost, setDataPost] = useState<any>();
	const [dataPut, setDataPut] = useState<any>();

	const handleGetClick = async () => {
		const res = await fetch("/api/langchain");
		const data = await res.json();
		setDataGet(data);
	};

	const handlePostClick = async () => {
		const res = await fetch("/api/langchain", { method: "POST" });
		const data = await res.json();
		setDataPost(data);
	};

	const handlePutClick = async () => {
		const res = await fetch("/api/langchain", { method: "PUT" });
		const data = await res.json();
		setDataPut(data);
	};

	return (
		<section>
			<div>
				<button onClick={handleGetClick}>Request: GET</button>
				<div>GET Response: {JSON.stringify(dataGet)}</div>
			</div>
			<br />
			<div>
				<button onClick={handlePostClick}>Request: POST</button>
				<div>POST Response: {JSON.stringify(dataPost)}</div>
			</div>
			<br />
			<div>
				<button onClick={handlePutClick}>Request: PUT</button>
				<div>PUT Response: {JSON.stringify(dataPut)}</div>
			</div>
		</section>
	);
};
