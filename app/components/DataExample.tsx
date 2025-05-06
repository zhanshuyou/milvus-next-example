"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function DataExample(props: {}) {
  const [data, setData] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [res, setRes] = useState();
  const [errorMessage, setErrorMessage] = useState("");

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
      setErrorMessage("");
    } catch (err) {
      console.error((err as Error).message);
      setErrorMessage((err as Error).message);
      setRes(undefined as any);
    }
  };

  return (
    <div className="p-4">
      <p className="pb-2">
        <Input
          placeholder="Collection Name"
          value={collectionName}
          onChange={handleCollectionNameChange}
        />
      </p>
      <p className="pb-2">
        <Textarea
          placeholder="Data"
          value={data}
          rows={8}
          onChange={handleDataChange}
        ></Textarea>
      </p>
      <Button onClick={handleSubmit}>Insert</Button>
      <p className="text-[14px]">{JSON.stringify(res)}</p>
      <p className="text-red-400 text-[14px]">{errorMessage}</p>
    </div>
  );
}
