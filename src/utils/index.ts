/**
 * It converts an array of strings into a sentence with commas and the word "&" before the last element.
 * @param arr Array of strings
 * @returns string like a sentence
 * @example toSentence(['a', 'b', 'c']) // 'a, b & c'
 */
export function toSentence(arr: string[]) {
	return arr.reduce((acc, curr, index) => {
		if (index === arr?.length - 1) return `${acc} & ${curr}`;
		return `${acc}, ${curr}`;
	});
}
