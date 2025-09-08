# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 application that demonstrates integration with Milvus vector database using the official Milvus Node SDK and LangChain. The project showcases vector operations, database management, and LangChain integration for AI-powered applications.

## Development Commands

- `yarn dev` - Start development server on port 3000
- `yarn build` - Build the production application  
- `yarn start` - Start production server
- `yarn lint` - Run ESLint to check code quality

## Architecture

### Key Technologies
- **Next.js 15** with App Router and React Server Components
- **Milvus Node SDK** (`@zilliz/milvus2-sdk-node`) for vector database operations
- **LangChain** integration for AI/ML workflows with OpenAI embeddings
- **TypeScript** for type safety
- **Tailwind CSS** with shadcn/ui components
- **React Hook Form** with Zod validation

### Project Structure
- `app/` - Next.js App Router pages and API routes
  - `api/` - Server-side API endpoints for Milvus operations
  - `utils/` - Core utility functions for Milvus and LangChain integration
  - `components/` - React components for UI
- `components/ui/` - Reusable shadcn/ui components
- `lib/` - Shared utility functions
- `consts/` - Application constants
- `hooks/` - Custom React hooks

### Core Modules

#### Milvus Integration (`app/utils/milvus.ts`)
- `getMilvusClient()` - Singleton pattern for Milvus client initialization
- `getData()` - Retrieve system metrics from Milvus
- `insertData()` - Insert data into collections
- `getCollections()` - List available collections

#### LangChain Integration (`app/utils/langchain.ts`)
- `getVectorStore()` - Initialize Milvus vector store with OpenAI embeddings for LangChain workflows

### Environment Configuration

Required environment variables:
- `DB_ADDRESS` - Milvus database connection address
- `DB_PUBLIC_TOKEN` - Milvus authentication token
- `MILVUS_COLLECTION_NAME` - Collection name for LangChain operations
- `OPENAI_TOKEN` - OpenAI API key for embeddings

### Next.js Configuration

The `next.config.js` includes critical configuration for Milvus SDK:
- `serverExternalPackages: ["@zilliz/milvus2-sdk-node"]` - Excludes Milvus SDK from server-side bundling to prevent protobuf loading issues

### API Routes

API endpoints follow RESTful patterns:
- `app/api/milvus/databases/route.ts` - Database management
- `app/api/collections/data/route.ts` - Collection operations
- `app/api/langchain/route.ts` - LangChain integration endpoints

All API routes include proper error handling and require authentication headers (Address, Token) for Milvus operations.