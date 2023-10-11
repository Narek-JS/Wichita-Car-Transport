interface DangerousHTML {
    __html: string;
}
  
export function sliceDangerousHTMLString(
    dangerouslySetInnerHTML: DangerousHTML,
    maxLength: number = Infinity
): DangerousHTML {
    // Extract the HTML string from dangerouslySetInnerHTML
    const htmlString = dangerouslySetInnerHTML.__html;

    // Use a regular expression to match HTML tags
    const tagRegExp = /<\/?[\w\s="/.':;#-\/\?]+>/g;

    // Initialize variables for the sliced and remaining HTML strings
    let slicedString = '';
    let remainingString = htmlString;

    // Iterate over the HTML string and slice it into pieces
    while (slicedString.length < maxLength && remainingString.length > 0) {
        // Find the next HTML tag in the remaining string
        const match = tagRegExp.exec(remainingString);
        
        if (!match) {
            // No more HTML tags found, append remaining string
            slicedString += remainingString;
            remainingString = '';
        } else if (slicedString.length + match.index + match[0].length <= maxLength) {
            // Append the matched HTML tag and its content to slicedString
            slicedString += remainingString.slice(0, match.index + match[0].length);
            remainingString = remainingString.slice(match.index + match[0].length);
        } else {
            // The matched HTML tag and its content would make slicedString too long
            remainingString = '';
        }
    }

    // Create a new dangerouslySetInnerHTML object for the sliced string
    const slicedDangerouslySetInnerHTML: DangerousHTML = { __html: slicedString };

    // Return the new dangerouslySetInnerHTML object
    return slicedDangerouslySetInnerHTML;
}