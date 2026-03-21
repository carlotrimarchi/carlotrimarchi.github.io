import esbuild from "esbuild";
import { glob } from "glob";

const demos = await glob("src/_demos/**/*.jsx");

if (demos.length === 0) {
  console.log("No demos found, skipping.");
} else {
  await esbuild.build({
    entryPoints: demos,
    bundle: true,
    outdir: "dist/demos",
    format: "esm",
    jsx: "automatic",
    external: ["react", "react-dom"],
  });
  console.log(`Built ${demos.length} demo(s).`);
}