import DOMPurify from "dompurify"

export function cleanHtml(html, allowedTags = ["p", "b", "i", "em", "strong", "a", "ul", "ol", "li", "br"]) {
    html = String(html || ""); // Convert undefined/null to an empty string
  
    let cleanedHtml = html.replace(/(srcset|sizes)="[^"]*"/g, "");
  
    cleanedHtml = DOMPurify.sanitize(cleanedHtml, {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: ["href", "target", "rel"],
    });

    // Improve formatting
    cleanedHtml = cleanedHtml
        .replace(/<p>/g, '<p class="mb-4">')
        .replace(/<ul>/g, '<ul class="list-disc pl-5 mb-4">')
        .replace(/<ol>/g, '<ol class="list-decimal pl-5 mb-4">')
        .replace(/<li>/g, '<li class="mb-2">')
        .replace(/<a /g, '<a class="text-yellow-500 hover:underline" ')
        .replace(/<strong>|<b>/g, '<strong class="font-bold">')
        .replace(/<em>|<i>/g, '<em class="italic">')
        
    return cleanedHtml;
  }
  

