import { MilvusClient } from "@zilliz/milvus2-sdk-node";

export async function getData() {
	const milvusClient = new MilvusClient({
		address: process.env.DB_ADDRESS ?? "",
		token: process.env.DB_PUBLIC_TOKEN ?? "",
	});

	let res: any = await milvusClient.getMetric({
		request: { metric_type: "system_info" },
	});

	const result = res.response.nodes_info.map((v: any) => {
		return v.infos;
	});

	return result;
}
