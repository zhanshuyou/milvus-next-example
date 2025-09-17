import useSWR from "swr";

import axios from "axios";

type DatabaseResponse = {
  db_names: string[];
  db_ids: string[];
  created_timestamp: string[];
};

export type DatabaseSchema = {
  id: string;
  name: string;
  createdTimestamp: string;
};

export type DatabaseListSchema = DatabaseSchema[];

const defaultResponse = {
  db_names: [],
  db_ids: [],
  created_timestamp: [],
};

export const useDatabases = () => {
  return useSWR(["/api/milvus/databases"], async () => {
    const res = await axios.get<DatabaseResponse>("/api/milvus/databases");
    const { db_names, db_ids, created_timestamp } = res.data ?? defaultResponse;
    const list: DatabaseListSchema = db_names
      .map((name, index) => ({
        id: db_ids[index],
        name,
        createdTimestamp: created_timestamp[index],
      }))
      .sort((a, b) => {
        return Number(b.createdTimestamp) - Number(a.createdTimestamp);
      });
    return list;
  });
};
