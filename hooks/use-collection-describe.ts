import useSWR from "swr";
import axios from "axios";

type CollectionDescribeResponse = {};

export const useCollectionDescribe = (params: {
  databaseName: string;
  collectionName: string;
}) => {
  const { databaseName, collectionName } = params;
  const path = `/api/milvus/databases/${databaseName}/collections/${collectionName}`;
  return useSWR([path], async () => {
    const res = await axios.get<CollectionDescribeResponse>(path);
    return res.data;
  });
};
