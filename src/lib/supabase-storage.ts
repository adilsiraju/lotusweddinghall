import { supabase } from '@/integrations/supabase/client';

const STORAGE_PUBLIC_PREFIX = '/storage/v1/object/public/';
const DEFAULT_BUCKET = 'gallery';

const cachedPublicBaseByBucket: Record<string, string> = {};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

const getStoragePublicBaseUrl = (bucket: string = DEFAULT_BUCKET) => {
  if (cachedPublicBaseByBucket[bucket]) {
    return cachedPublicBaseByBucket[bucket];
  }

  const probePath = '__storage_probe__';
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(probePath);

  const baseUrl = publicUrl.endsWith(probePath)
    ? publicUrl.slice(0, -probePath.length)
    : `${trimTrailingSlash(publicUrl)}/`;

  cachedPublicBaseByBucket[bucket] = baseUrl;
  return baseUrl;
};

const getStoragePathFromPublicUrl = (imageUrl: string, bucket: string) => {
  const marker = `${STORAGE_PUBLIC_PREFIX}${bucket}/`;
  const markerIndex = imageUrl.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  return imageUrl.slice(markerIndex + marker.length).split(/[?#]/)[0];
};

export const normalizeStoragePublicUrl = (imageUrl: string, bucket: string = DEFAULT_BUCKET) => {
  if (!imageUrl || imageUrl.startsWith('/')) {
    return imageUrl;
  }

  const storagePath = getStoragePathFromPublicUrl(imageUrl, bucket);
  if (!storagePath) {
    return imageUrl;
  }

  return `${getStoragePublicBaseUrl(bucket)}${storagePath}`;
};

export const getStorageObjectPath = (imageUrl: string, bucket: string = DEFAULT_BUCKET) => {
  if (!imageUrl) {
    return null;
  }

  if (!imageUrl.includes('://')) {
    return imageUrl.split(/[?#]/)[0];
  }

  const storagePath = getStoragePathFromPublicUrl(imageUrl, bucket);
  if (storagePath) {
    return storagePath;
  }

  try {
    const url = new URL(imageUrl);
    const lastSegment = url.pathname.split('/').filter(Boolean).pop();
    return lastSegment ?? null;
  } catch {
    return imageUrl.split('/').pop()?.split(/[?#]/)[0] ?? null;
  }
};
