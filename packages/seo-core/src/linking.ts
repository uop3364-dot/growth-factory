export function buildInternalLinks(currentPath: string, allPaths: string[], maxLinks = 10): string[] {
  // Simple internal linking: suggest related paths
  const parts = currentPath.split('/').filter(Boolean);

  return allPaths
    .filter(p => p !== currentPath)
    .map(p => {
      const otherParts = p.split('/').filter(Boolean);
      const overlap = parts.filter(part => otherParts.includes(part)).length;
      return { path: p, score: overlap };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, maxLinks)
    .map(item => item.path);
}
