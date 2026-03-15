# Offline Social PWA (Frontend-only)

A React PWA that works offline with IndexedDB and syncs directly to MongoDB using the **MongoDB Atlas Data API** (no Node/Express backend).

## Features
- Post CRUD with text, optional image, hashtags.
- Comment CRUD.
- Hashtag extraction + clickable hashtag filters.
- Instant local search (keywords + hashtags).
- Offline-first with IndexedDB local store and queued mutations.
- Auto-sync when connection is restored.
- Last-write-wins conflict behavior via `updatedAt`.

## MongoDB setup
1. Create a MongoDB Atlas cluster.
2. Enable Data API for your app.
3. Create API Key for Data API.
4. Configure env vars in `.env` (see `.env.example`).

## Run
1. `npm install`
2. Create `.env` from `.env.example`
3. `npm run dev`
4. `npm run build` for production build

## Data model (`posts` collection)
```json
{
  "id": "uuid",
  "content": "text with #tags",
  "imageData": "data:image/... base64 (optional)",
  "hashtags": ["#pwa"],
  "comments": [{ "id": "uuid", "content": "text", "createdAt": "ISO", "updatedAt": "ISO" }],
  "createdAt": "ISO",
  "updatedAt": "ISO",
  "syncStatus": "synced|pending|error"
}