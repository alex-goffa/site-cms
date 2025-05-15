# Redwood ↔️ Sanity Studio Monorepo

This monorepo contains two main projects:
- `site-rwsdk/`: RedwoodJS application
- `studio-rwsdk/`: Sanity Studio for content management

## Prerequisites

- [Cloudflare](https://cloudflare.com) Account (for deploying [RedwoodSDK](https://rwsdk.com))
- [Sanity](https://sanity.io) Account
- Node.js 22+
- pnpm

## Quick Start

### 1. Install Dependencies

```bash
# Install RedwoodJS dependencies
cd site-rwsdk
yarn install

# Install Sanity Studio dependencies
cd ../studio-rwsdk
pnpm install
```

### 2. Run Development Servers

#### RedwoodJS App
```bash
cd site-rwsdk
pnpm dev
```
The RedwoodSDK app will be available at http://localhost:5173

#### Sanity Studio
```bash
cd studio-rwsdk
pnpm dev
```
Sanity Studio will be available at http://localhost:3333

## Project Structure

- `rwsdk/`: RedwoodJS application
  - Frontend and backend code

- `studio-rwsdk/`: Sanity Studio
  - Content Management System
  - Content models
  - Studio configuration
  - Schema definitions

## Environment Setup

1. Copy `.env.example` to `.env` in both directories
2. Update the environment variables with your Sanity project details

---

# Steps for Recreating this Repo from Scratch

## Setting up Sanity.io

Install Sanity

```bash
pnpm create sanity@latest -- --dataset production --template clean --typescript --output-path <project-name>
cd <project-name>
pnpm run dev
```

Open the Studio running locally in your browser from http://localhost:3333.

Define a Schema inside `studio/schemaTypes/postType.ts`

```ts
import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
})
```

Register the schema in the `studio/schemaTypes/index.ts

```ts
import {postType} from './postType'

export const schemaTypes = [postType]
```

Publish your first document

## Setting up RedwoodSDK

Set up a new RedwoodSDK project

```bash
npx create-rwsdk <project-name>
cd <project-name>
pnpm install
pnpm dev
```

Install dependencies for working with Sanity.

```bash
pnpm install @sanity/client @sanity/image-url @portabletext/react
```

Inside a page component, write Groq query:

```tsx
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{_id, title, slug, publishedAt}`;
```

Then, inside the component, fetch the data:

```tsx
const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY);
```

Display the results:

```tsx
<pre>{JSON.stringify(posts, null, 2)}</pre>
```

