import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import type { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ databaseName: string }> }
) {
  try {
    const address = request.headers.get("Address");
    const token = request.headers.get("Token") ?? "";

    if (!address) {
      return Response.json({ error: "Address is required" }, { status: 400 });
    }

    const { databaseName } = await params;

    const client = new MilvusClient({ address, token });
    const databases = await client.listCollections({ db_name: databaseName });
    return Response.json(databases);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
