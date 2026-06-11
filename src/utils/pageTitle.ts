export default function pageTitle(title?: string): string {
	const base = "Carlo Trimarchi";
	const fallback = `${base} | Software Engineer`;
	return title ? `${title} | ${base}` : `${fallback}`;
}
