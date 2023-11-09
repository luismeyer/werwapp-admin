const [, , , blobStoreId] = process.env.BLOB_READ_WRITE_TOKEN?.split("_") ?? [];

export function getBlobUrl(pathname: string) {
  return `https://${blobStoreId}.public.blob.vercel-storage.com/${pathname}`;
}
