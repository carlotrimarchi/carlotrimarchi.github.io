export function postDate(dateObj) {
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	const date = new Date(dateObj).toLocaleDateString("en-IE", options);
	return date;
}

export function dateAttribute(date: Date): string {
	return new Date(date).toISOString().slice(0, 10);
}
