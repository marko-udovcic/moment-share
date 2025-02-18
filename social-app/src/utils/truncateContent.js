export function truncateContent(content, wordLimit, charLimit) {
  const truncated = content.split(" ").slice(0, wordLimit).join(" ");
  return content.length > charLimit ? truncated + "... Read more" : truncated;
}
