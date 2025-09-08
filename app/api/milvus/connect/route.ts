import { MilvusClient } from "@zilliz/milvus2-sdk-node";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { address, token } = body ?? {};
    const client = new MilvusClient({ address, token });
    const info = await client.getMetric({
      request: { metric_type: "system_info" },
    });
    return Response.json(info);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}
