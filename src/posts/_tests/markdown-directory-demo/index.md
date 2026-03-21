---
title: TEST - Markdown Directory Demo
mainTitle: TEST - Markdown Directory Demo
slug: markdown-directory-demo
teaser: Test markdown + demo WebC in a directory-based post.
---

# Markdown works here

- first item
- second item

Text before the embedded demo.

{% renderTemplate "webc" %}
<demo-embed name="demo-md-dir-1">
<demo-markdown-directory></demo-markdown-directory>
</demo-embed>
{% endrenderTemplate %}

Text after embedded demo


```js
const answer = 42;
```
