import { MilvusClient, type RowData } from "milvus-sdk";

let milvusClient: MilvusClient;

const initMilvusClient = () => {
  milvusClient = new MilvusClient({
    address: process.env.DB_ADDRESS ?? "",
    token: process.env.DB_PUBLIC_TOKEN ?? "",
  });
  return milvusClient;
};

export const getMilvusClient = () => {
  if (!milvusClient) {
    initMilvusClient();
  }
  return milvusClient;
};

export async function getData() {
  const milvusClient = getMilvusClient();

  let res: any = await milvusClient.getMetric({
    request: { metric_type: "system_info" },
  });

  const result = res.response.nodes_info.map((v: any) => {
    return v.infos;
  });

  return result;
}

export async function insertData(collectionName: string, data: RowData[]) {
  const milvusClient = getMilvusClient();

  const res = await milvusClient.insert({
    collection_name: collectionName,
    data,
  });

  return res;
}

export async function getCollections() {
  const milvusClient = getMilvusClient();

  const res = await milvusClient.listCollections();

  return res;
}
