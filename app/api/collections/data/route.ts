import { insertData } from "@/app/utils/milvus";

export async function POST(request: Request) {
  const body = await request.json();
  const { collectionName, data } = body ?? {};
  const detail = await insertData(collectionName, data);
  return Response.json(detail);
}
