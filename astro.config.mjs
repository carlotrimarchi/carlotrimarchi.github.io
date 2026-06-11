import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { visit } from "unist-util-visit";
import { h, s } from "hastscript";


import mdx from "@astrojs/mdx";

export default defineConfig({

    site: "https://carlotrimarchi.it",
    integrations: [react(), mdx()],
    vite: {
        css: {
            transformer: "lightningcss",
        },
        server: {
            allowedHosts: true,
        },
    },
    markdown: {
        rehypePlugins: [
            () => (tree) => {
                visit(tree, 'element', (node, index, parent) => {
                    if (node.tagName !== 'pre') return;

                    const [pre] = parent.children.splice(index, 1);
                    const lang = node.properties.dataLanguage;
                    const figure = h('figure', { class: 'code-block' }, [
                        h('figcaption', { class: "code-block__header cluster repel" }, [
                            h("span", { 'aria-hidden': true }, [
                                s("svg", { class: "code-block__icon" }, [
                                    s("use", { href: "#code-snippet" })
                                ])
                            ]),
                            h("dl", [
                                h("dt", { class: "visually-hidden" }, ["code language"]),
                                h("dd", [lang]),
                            ])
                        ]),
                        pre,
                    ]);
                    parent.children.splice(index, 0, figure);
                })
                // console.log(JSON.stringify(tree, null, 2));
            }
        ],
    }
});

//     return `<figure class="code-block">
//   <figcaption class="code-block__header cluster repel">
// <span aria-hidden="true">
// <svg class="code-block__icon">
//   <use href="#code-snippet"></use>
// </svg>
// </span>
//     <dl>
//       <dt class="visually-hidden">Code language</dt>
//       <dd>${lang}</dd>
//     </dl>
//   </figcaption>
//   ${inner}
// </figure>`;