import { getVectorStore } from "../../utils/langchain";

export async function GET() {
	const vectorStore = await getVectorStore();
	const data = await vectorStore.similaritySearch("question");
	return Response.json({ data });
}

export async function POST() {
	const vectorStore = await getVectorStore();
	const data = await vectorStore.similaritySearch("question");
	return Response.json({ data });
}

export async function PUT() {
	const vectorStore = await getVectorStore();
	const data = await vectorStore.similaritySearch("question");
	return Response.json({ data });
}
