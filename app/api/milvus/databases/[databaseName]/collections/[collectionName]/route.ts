import { MilvusClient } from "@zilliz/milvus2-sdk-node";

export async function GET(
  request: Request,
  {
    params,
  }: { params: Promise<{ collectionName: string; databaseName: string }> }
) {
  try {
    const address = request.headers.get("Address");
    const token = request.headers.get("Token") ?? "";

    if (!address) {
      return Response.json({ error: "Address is required" }, { status: 400 });
    }

    const { collectionName, databaseName } = await params;

    const client = new MilvusClient({ address, token });
    const response = await client.describeCollection({
      db_name: databaseName,
      collection_name: collectionName,
    });
    return Response.json(response);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
