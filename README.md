# Next.js with Milvus Node SDK

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and integrated with [Milvus Node SDK](https://github.com/milvus-io/milvus-sdk-node).

## Installation

First, initialize a Next.js project:

```bash
npx create-next-app@latest
```

Then, install Milvus Node SDK:

```bash
yarn add @zilliz/milvus2-sdk-node
```

## Configuration

Fixed the issue of "Unable to load service: milvus.proto.milvus.MilvusService"

There may be two reasons why this problem occurs

1. Pages use [static rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default)
2. `next.config.js` missing [configuration](https://nextjs.org/docs/app/api-reference/config/next-config-js/serverExternalPackages)

You can change pages which are using @zilliz/milvus2-sdk-node to [dynamic rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering), recommended [connection()](https://nextjs.org/docs/app/api-reference/functions/connection) function.

```tsx
import { connection } from "next/server";
import { getCollections } from "@/app/utils/milvus";

export default async function Collection() {
  await connection();
  const { data: collections } = await getCollections();

  const sortedCollections = [...collections].sort((a, b) => {
    return Number(b.timestamp) - Number(a.timestamp);
  });
  ...
}
```

Or update `next.config.js`

```javascript
/* Next.js version 15 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@zilliz/milvus2-sdk-node"],
  outputFileTracingIncludes: {
    // When deploying to Vercel, the following configuration is required
    "/api/**/*": ["node_modules/@zilliz/milvus2-sdk-node/dist/proto/**/*"],
  },
};

module.exports = nextConfig;
```

```javascript
/* Next.js version 14 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@zilliz/milvus2-sdk-node"],
    outputFileTracingIncludes: {
      // When deploying to Vercel, the following configuration is required
      "/api/**/*": ["node_modules/@zilliz/milvus2-sdk-node/dist/proto/**/*"],
    },
  },
};
module.exports = nextConfig;
```

## Usage

### Server Page Component

Create a server page component in `pages/index.js`. This component will interact with Milvus Node SDK to perform operations.

### Router API

Create a router API in `pages/api/milvus.js`. This API will handle requests from the client and interact with Milvus Node SDK.

You can now access the application at:

- Main page: `http://localhost:3000/`
- Milvus API: `http://localhost:3000/api/milvus`
