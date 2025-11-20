# domx v0.1.7

> A minimal jsx runtime. Renders jsx into DOM nodes

# Usage

```
npx jsr add @kt3k/domx
```

```
deno install jsr:@kt3k/domx
```

Specify it in `@jsxRuntime`

```
/** @jsxImportSource @kt3k/domx */
/** @jsxRuntime automatic */
```

Write JSX and it's evaluated as an equivalent DOM nodes

```
const div = (
  <div class="flex">
    <span class="m-1 p-1">hello</span>
  </div>
)
```

is equivalent of:

```
const div = document.createElement("div")
const div.classList.add("flex");

const span = document.createElement("span")
span.textContent = "hello"
span.classList.add("m-1", "p-1");
```

# License

MIT
