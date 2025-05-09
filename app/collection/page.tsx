import { getCollections } from "@/app/utils/milvus";

export default async function Collection() {
  const { data: collections } = await getCollections();

  const sortedCollections = [...collections].sort((a, b) => {
    return Number(b.timestamp) - Number(a.timestamp);
  });

  return (
    <div className="p-4">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Collection name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedCollections.map((collection) => {
              return (
                <tr
                  key={collection.name}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {collection.name}
                  </th>
                  <td className="px-6 py-4">
                    {new Date(Number(collection.timestamp)).toDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
