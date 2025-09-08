import { MilvusClient } from "@zilliz/milvus2-sdk-node";

export async function GET(request: Request) {
  try {
    const address = request.headers.get("Address");
    const token = request.headers.get("Token");

    if (!address || !token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = new MilvusClient({ address, token });
    const databases = await client.listDatabases();
    return Response.json(databases);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
