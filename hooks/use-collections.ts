import useSWR from "swr";
import axios from "axios";

export interface Status {
  extra_info: {};
  error_code: string;
  reason: string;
  code: number;
  retriable: boolean;
  detail: string;
}

type CollectionData = {
  name: string;
  id: string;
  timestamp: string;
};

type CollectionResponse = {
  collection_names: string[];
  collection_ids: string[];
  created_timestamps: string[];
  created_utc_timestamps: string[];
  inMemory_percentages: any[];
  query_service_available: any[];
  status: Status;
  data: CollectionData[];
};

export const useCollections = (database: string) => {
  const path = `/api/milvus/databases/${database}/collections`;
  return useSWR([path], async () => {
    const res = await axios.get<CollectionResponse>(path);
    return res.data.data.sort((a, b) => {
      return Number(b.timestamp) - Number(a.timestamp);
    });
  });
};
