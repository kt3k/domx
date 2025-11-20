// Copyright 2025 Yoshiya Hinosawa. MIT License.
/**
 * Rendering JSX to DOM nodes
 *
 * @module
 */

type Props = Record<string, unknown>
type EL = HTMLElement | DocumentFragment

/** jsx factory */
export function jsx(
  type: string | ((props: Props) => EL),
  props: { children: boolean | string | EL | EL[] } & Props,
): EL {
  if (typeof type === "function") {
    return type(props)
  }
  const el = document.createElement(type)
  const { children, ...rest } = props
  appendChildren(el, children)
  Object.entries(rest).forEach(
    ([k, v]) => {
      if (typeof v === "boolean") {
        if (v) {
          el.setAttribute(k, k)
        }
      } else {
        el.setAttribute(k, String(v))
      }
    },
  )
  return el
}

/** jsxs factory */
export function jsxs(
  type: string | ((props: Props) => EL),
  props: { children: EL[] } & Props,
): EL {
  return jsx(type, props)
}

/** Fragment factory */
export function Fragment(
  { children }: { children: EL | EL[] },
): DocumentFragment {
  const fragment = document.createDocumentFragment()
  appendChildren(fragment, children)
  return fragment
}

function appendChildren(
  parent: EL,
  children: undefined | null | boolean | string | EL | EL[],
) {
  if (Array.isArray(children)) {
    for (const child of children) {
      parent.appendChild(child)
    }
  } else if (typeof children === "string") {
    parent.appendChild(document.createTextNode(children))
  } else if (typeof children === "boolean") {
    if (children) {
      parent.appendChild(document.createTextNode(String(children)))
    }
  } else if (typeof children === "undefined") {
    parent.appendChild(document.createTextNode("undefined"))
  } else if (children != null) {
    parent.appendChild(children)
  }
}

/** JSX namespace */
export declare namespace JSX {
  interface IntrinsicElements {
    div: HTMLDivElement
    span: HTMLSpanElement
    p: HTMLParagraphElement
    a: HTMLAnchorElement
    ul: HTMLUListElement
    li: HTMLLIElement
    button: HTMLButtonElement
    input: HTMLInputElement
    // Add more elements as needed
    // deno-lint-ignore no-explicit-any
    [elemName: string]: any
  }
}
