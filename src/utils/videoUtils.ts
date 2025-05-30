
/**
 * Utility functions for handling video URLs and embedding
 */

// Video platform types
export type VideoPlatform = 'youtube' | 'instagram' | 'vimeo' | 'facebook';

// Function to extract video ID from various platform URLs
export function extractVideoId(url: string, platform: VideoPlatform): string | null {
  switch (platform) {
    case 'youtube': {
      // Handle various YouTube URL formats
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return (match && match[2].length === 11) ? match[2] : null;
    }
    case 'vimeo': {
      // Handle Vimeo URLs
      const regExp = /^.+vimeo.com\/(.*\/)?([^#?]*)/;
      const match = url.match(regExp);
      return match ? match[2] : null;
    }
    // For Instagram and Facebook, we currently use the full embed URLs directly
    default:
      return null;
  }
}

// Function to convert standard URLs to embed URLs
export function getEmbedUrl(url: string, platform: VideoPlatform): string {
  // If it's already an embed URL, just return it
  if (url.includes('/embed/')) {
    return url;
  }
  
  switch (platform) {
    case 'youtube': {
      const videoId = extractVideoId(url, 'youtube');
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    case 'vimeo': {
      const videoId = extractVideoId(url, 'vimeo');
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    }
    // For these platforms, we assume the user is providing the embed URL directly
    case 'instagram':
    case 'facebook':
    default:
      return url;
  }
}

// Function to validate a video URL based on platform
export function isValidVideoUrl(url: string, platform: VideoPlatform): boolean {
  switch (platform) {
    case 'youtube':
      return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/.test(url);
    case 'vimeo':
      return /^(https?:\/\/)?(www\.)?(vimeo\.com)\/.+/.test(url);
    case 'instagram':
      return /^(https?:\/\/)?(www\.)?(instagram\.com)\/.+/.test(url);
    case 'facebook':
      return /^(https?:\/\/)?(www\.)?(facebook\.com)\/.+/.test(url);
    default:
      return false;
  }
}

// Get platform display name
export function getPlatformDisplayName(platform: VideoPlatform): string {
  switch (platform) {
    case 'youtube': return 'YouTube';
    case 'vimeo': return 'Vimeo';
    case 'instagram': return 'Instagram';
    case 'facebook': return 'Facebook';
    default:
      // This should never happen with proper typing, but we'll provide a fallback
      return String(platform).charAt(0).toUpperCase() + String(platform).slice(1);
  }
}
