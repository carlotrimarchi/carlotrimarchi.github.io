---
title: TEST - Markdown Demo Test
mainTitle: TEST - Markdown Demo Test
teaser: Test markdown + demo embed in post .md
---

# Markdown heading

- item one
- item two

Text before the demo.

## test heading before demo

{% renderTemplate "webc" %}

<demo-embed name="demo-md-1">
<my-demo></my-demo>
</demo-embed>

{% endrenderTemplate %}

```js
const value = 42;
```
