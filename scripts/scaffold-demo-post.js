#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

if (process.argv.length < 4) {
	console.error("Usage: node scripts/scaffold-demo-post.js <slug> <title>");
	console.error("Example: node scripts/scaffold-demo-post.js my-component 'My Component  Demo'");
	process.exit(1);
}

const slug = process.argv[2];
const title = process.argv[3];
const today = new Date().toISOString().split("T")[0];
const postFolder = `${today}-${slug}`;
const postPath = path.join(projectRoot, "src/posts", postFolder);
const demosPath = path.join(postPath, "_demos");

try {
	await fs.mkdir(demosPath, { recursive: true });
	console.log(`Created ${postPath}`);
	console.log(`Created ${demosPath}`);

	const demoFileName = `demo-${slug}.webc`;
	const indexContent = `---
title: ${title}
mainTitle: ${title}
---

Your demo content here.

<demo-embed name="demo-1">
	<demo-${slug}></demo-${slug}>
</demo-embed>
`;
	await fs.writeFile(path.join(postPath, "index.webc"), indexContent);
	console.log(`Created index.webc`);

	const demoContent = `<div class="demo" webc:root="override">
	<p>Demo content here</p>
</div>

<style webc:scoped>
	:host {
		padding: 1rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}
</style>
`;
	await fs.writeFile(path.join(demosPath, demoFileName), demoContent);
	console.log(`Created _demos/${demoFileName}`);

	console.log(`\nPost demo scaffold created at: src/posts/${postFolder}/`);
	console.log(`\nNext steps:`);
	console.log(`1. Edit src/posts/${postFolder}/index.webc`);
	console.log(`2. Edit src/posts/${postFolder}/_demos/${demoFileName}`);
} catch (error) {
	console.error("Error creating post scaffold:", error.message);
	process.exit(1);
}
