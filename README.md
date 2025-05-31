# SoM Academy Website & CMS Monorepo

This monorepo contains two main projects:
- `website/`: RedwoodJS application (SoM Academy website)
- `cms/`: Sanity Studio for content management

## Prerequisites

- [Cloudflare](https://cloudflare.com) Account (for deploying [RedwoodSDK](https://rwsdk.com))
- [Sanity](https://sanity.io) Account
- Node.js 22+
- pnpm

## Quick Start

### 1. Install Dependencies

```bash
# Install website dependencies
cd website
pnpm install

# Install Sanity Studio dependencies
cd ../cms
pnpm install
```

### 2. Set up Local Database (Website)

```bash
cd website
pnpm run migrate:dev  # Creates local D1 database
```

### 3. Run Development Servers

#### Website (RedwoodJS)
```bash
cd website
pnpm dev
```
The website will be available at http://localhost:5173

#### Sanity Studio
```bash
cd cms
pnpm dev
```
Sanity Studio will be available at http://localhost:3333

## Current Implementation

### Website Features
- **Homepage**: Minimal design with header and hero section
- **Styling**: Tailwind CSS v4 + Flowbite components
- **Primary Color**: Amber (customizable in `website/src/app/styles.css`)
- **Database**: Cloudflare D1 (SQLite) with Prisma ORM
- **Content**: Dynamic fetching from Sanity CMS (no rebuild needed for content updates)

### Components Created
- `SimpleHeader`: Navigation with responsive menu
- `SimpleHeroSection`: Hero with CTA for teaching children problem-solving through mathematics

### Deployment

#### Website (Cloudflare Workers)
- **Production URL**: https://som-academy-website.chowder-trombone091.workers.dev
- **Cloudflare Settings**:
  - Root directory: `website`
  - Build command: `pnpm run release`
  - Deploy command: (leave empty)

#### Sanity Studio
- Deploy via Sanity CLI when schema changes are made
- Content updates don't require deployment

## Known Issues Resolved
- ✅ D1 database authentication errors
- ✅ Flowbite-react compatibility with Tailwind v4
- ✅ Miniflare configuration format mismatch

## Next Steps
- [ ] Add blog/article pages that fetch from Sanity
- [ ] Implement authentication (WebAuthn ready)
- [ ] Add more content sections to homepage
- [ ] Deploy Sanity Studio to production
- [ ] Set up custom domain

## Project Structure

- `website/`: RedwoodJS application
  - Frontend with React components
  - Cloudflare Workers backend
  - D1 database with Prisma ORM
  - WebAuthn authentication ready

- `cms/`: Sanity Studio
  - Content Management System
  - Content models for blog posts
  - Studio configuration
  - Schema definitions

## Environment Setup

### Website
1. Local D1 database is created automatically with `pnpm run migrate:dev`
2. Sanity project ID is hardcoded in `website/src/app/lib/sanity/client.ts`

### CMS
1. Sanity project details are in `cms/sanity.cli.ts` and `cms/sanity.config.ts`

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

Register the schema in the `studio/schemaTypes/index.ts`

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