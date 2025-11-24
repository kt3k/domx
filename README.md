# domx v0.1.11

> A minimal jsx runtime. Renders jsx into DOM nodes

# Install

as npm package

```
npx jsr add @kt3k/domx
```

as jsr package

```
deno install jsr:@kt3k/domx
```

Specify it in `@jsxImportSource`

```
/** @jsxImportSource @kt3k/domx */
/** @jsxRuntime automatic */
```

# Usage

Write JSX and it's evaluated as an equivalent DOM nodes

```
const div = (
  <div class="flex">
    <span class="m-1 p-1">hello</span>
  </div>
)
```

is roughly equivalent of:

```
const div = document.createElement("div")
const div.classList.add("flex");

const span = document.createElement("span")
span.textContent = "hello"
span.classList.add("m-1", "p-1");
```

## Types

Currently returned values of JSX expressions are typed as `HTMLElement`. If you need more granular types such as HTMLInputElement, HTMLButtonElement, etc, then you need to cast it:

```
const button = <button type="button">hello</button> as HTMLButtonElement
const input = <input type="text" /> as HTMLInputElement
```

# License

MIT
