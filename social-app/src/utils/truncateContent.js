export function truncateContent(content, charLimit) {
  if (content.length > charLimit) {
    return content.slice(0, charLimit) + "... Read more";
  }
  return content;
}
