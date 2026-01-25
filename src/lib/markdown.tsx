import React from "react";

/**
 * Simple markdown parser for chat messages.
 * Handles:
 * - **bold** text
 * - * or - bullet points (unordered lists)
 * - 1. 2. 3. numbered lists (ordered lists)
 * - Newlines
 */
export function parseMarkdown(text: string): React.ReactNode {
  if (!text) return null;

  // Normalize text: insert newlines before numbered list items that don't have them
  // Matches patterns like ":1." or ".1." where a number follows punctuation without a newline
  let normalizedText = text.replace(/([.:!?])\s*(\d+\.)\s*\*\*/g, "$1\n$2 **");

  // Also handle cases where numbered items might not have bold markers
  normalizedText = normalizedText.replace(/([.:!?])\s*(\d+\.)\s+([A-Z])/g, "$1\n$2 $3");

  // Split by double newlines for paragraph-like breaks
  const paragraphs = normalizedText.split(/\n\n+/);

  return paragraphs.map((paragraph, pIndex) => {
    const lines = paragraph.split("\n");
    const unorderedItems: string[] = [];
    const orderedItems: string[] = [];
    const nonListLines: string[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      // Unordered list: * or -
      if (trimmed.match(/^[*-]\s+/)) {
        unorderedItems.push(trimmed.replace(/^[*-]\s+/, ""));
      }
      // Ordered list: 1. 2. etc.
      else if (trimmed.match(/^\d+\.\s+/)) {
        orderedItems.push(trimmed.replace(/^\d+\.\s+/, ""));
      }
      else if (trimmed) {
        nonListLines.push(line);
      }
    });

    const elements: React.ReactNode[] = [];

    // Render non-list content
    if (nonListLines.length > 0) {
      elements.push(
        <span key={`text-${pIndex}`}>
          {parseBoldText(nonListLines.join("\n"))}
        </span>
      );
    }

    // Render unordered list
    if (unorderedItems.length > 0) {
      elements.push(
        <ul key={`ul-${pIndex}`} className="list-disc list-inside my-1 space-y-0.5">
          {unorderedItems.map((item, i) => (
            <li key={i}>{parseBoldText(item)}</li>
          ))}
        </ul>
      );
    }

    // Render ordered list
    if (orderedItems.length > 0) {
      elements.push(
        <ol key={`ol-${pIndex}`} className="list-decimal list-inside my-1 space-y-0.5">
          {orderedItems.map((item, i) => (
            <li key={i}>{parseBoldText(item)}</li>
          ))}
        </ol>
      );
    }

    // Add line break between paragraphs (except last)
    if (pIndex < paragraphs.length - 1) {
      elements.push(<br key={`br-${pIndex}`} />);
    }

    return <React.Fragment key={pIndex}>{elements}</React.Fragment>;
  });
}

/**
 * Parse **bold** patterns in text
 */
function parseBoldText(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    // Check if this part is bold (wrapped in **)
    const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (boldMatch) {
      return <strong key={index}>{boldMatch[1]}</strong>;
    }
    // Handle line breaks within text
    if (part.includes("\n")) {
      const lines = part.split("\n");
      return lines.map((line, lineIndex) => (
        <React.Fragment key={`${index}-${lineIndex}`}>
          {line}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      ));
    }
    return part;
  });
}
