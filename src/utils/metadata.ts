import { Article } from '@/types/article';

export function isGithubRepoUrl(url: string) {
  return /^https:\/\/github\.com\/[^/]+\/[^/]+/.test(url);
}

function decodeBase64(str: string): string {
  try {
    const cleanedStr = str.replace(/\s+/g, "");
    return atob(cleanedStr);
  } catch (error) {
    throw new Error(`Failed to decode base64: ${error}`);
  }
}

export async function fetchMetadata({
  sourceUrl,
  githubToken,
}: {
  sourceUrl: string;
  githubToken?: string;
}): Promise<Article[]> {
  if (!sourceUrl) return [];
  
  if (isGithubRepoUrl(sourceUrl)) {
    const match = sourceUrl.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) throw new Error("Invalid GitHub repo URL");
    const [, owner, repo] = match;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/metadata.json`;
    
    const res = await fetch(apiUrl, {
      headers: githubToken ? { Authorization: `token ${githubToken}` } : undefined,
    });
    
    if (!res.ok) throw new Error("Failed to fetch metadata.json from GitHub");
    
    const data = await res.json();
    if (!data.content) throw new Error("metadata.json not found in repo");
    
    const decodedContent = decodeBase64(data.content);
    const json = JSON.parse(decodedContent);
    
    return parseArticlesFromJson(json);
  } else {
    const res = await fetch(sourceUrl);
    if (!res.ok) throw new Error("Failed to fetch metadata.json");
    const json = await res.json();
    
    return parseArticlesFromJson(json);
  }
}

function parseArticlesFromJson(json: any): Article[] {
  if (Array.isArray(json)) {
    return json;
  } else if (json.articles && Array.isArray(json.articles)) {
    return json.articles;
  } else if (json.articles && typeof json.articles === "object") {
    return Object.entries(json.articles).map(([id, art]: [string, any]) => ({
      id,
      ...art,
    }));
  } else if (typeof json === "object") {
    return Object.entries(json).map(([id, art]: [string, any]) => ({
      id,
      ...art,
    }));
  }
  return [];
}

export function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
}
