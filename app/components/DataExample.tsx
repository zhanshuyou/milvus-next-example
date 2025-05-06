"use client";

import { useState } from "react";

export function DataExample(props: {}) {
  const [data, setData] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [res, setRes] = useState();

  const handleCollectionNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCollectionName(e.target.value);
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData(e.target.value);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const jsonData = JSON.parse(data);
      const res = await fetch("/api/collections/data", {
        method: "POST",
        body: JSON.stringify({ collectionName, data: jsonData }),
      });
      const jsonRes = await res.json();
      setRes(jsonRes);
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return (
    <div>
      <p>
        <input
          placeholder="Collection Name"
          value={collectionName}
          onChange={handleCollectionNameChange}
        />
      </p>
      <p>
        <textarea
          placeholder="Data"
          value={data}
          onChange={handleDataChange}
        ></textarea>
      </p>
      <button onClick={handleSubmit}>Insert</button>
      <p>{JSON.stringify(res)}</p>
    </div>
  );
}
