import { Milvus } from "@langchain/community/vectorstores/milvus";
import { OpenAIEmbeddings } from "@langchain/openai";

export const getVectorStore = async () => {
	return Milvus.fromExistingCollection(
		new OpenAIEmbeddings({
			openAIApiKey: process.env.OPENAI_TOKEN ?? "",
		}),
		{
			collectionName: process.env.MILVUS_COLLECTION_NAME,
			url: process.env.DB_ADDRESS,
			clientConfig: {
				address: "",
				token: process.env.DB_PUBLIC_TOKEN,
			},
		}
	);
};
