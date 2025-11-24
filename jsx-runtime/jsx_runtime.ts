// Copyright 2025 Yoshiya Hinosawa. MIT License.
/**
 * Rendering JSX to DOM nodes
 *
 * @module
 */

type Props = Record<string, unknown>

/** jsx factory */
export function jsx<const K extends string>(
  type: K | ((props: Props) => JSX.Element),
  props:
    & { children: boolean | number | string | JSX.Element | JSX.Element[] }
    & Props,
): JSX.Element {
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
  return el as JSX.Element
}

/** jsxs factory */
export function jsxs<const K extends string>(
  type: K | ((props: Props) => JSX.Element),
  props:
    & { children: boolean | number | string | JSX.Element | JSX.Element[] }
    & Props,
): JSX.Element {
  if (typeof type === "function") {
    return type(props)
  }
  return jsx(type, props)
}

/** Fragment factory */
export function Fragment(
  { children }: {
    children: boolean | number | string | JSX.Element | JSX.Element[]
  },
): JSX.Element {
  const fragment = document.createDocumentFragment() as unknown as JSX.Element
  appendChildren(fragment, children)
  return fragment
}

function appendChildren(
  parent: JSX.Element,
  children:
    | undefined
    | null
    | boolean
    | number
    | string
    | JSX.Element
    | JSX.Element[],
) {
  if (Array.isArray(children)) {
    for (const child of children) {
      appendChildren(parent, child)
    }
  } else if (typeof children === "string") {
    parent.appendChild(document.createTextNode(children))
  } else if (typeof children === "boolean") {
    if (children) {
      parent.appendChild(document.createTextNode(String(children)))
    }
  } else if (typeof children === "number") {
    parent.appendChild(document.createTextNode(String(children)))
  } else if (typeof children === "undefined") {
    parent.appendChild(document.createTextNode("undefined"))
  } else if (children != null) {
    parent.appendChild(children)
  }
}

/** JSX namespace */
export declare namespace JSX {
  interface IntrinsicElements {
    [el: string]: Props
  }

  /*
  type Element<K extends string = string> = K extends "div" ? HTMLDivElement
    : K extends "input" ? HTMLInputElement
    : K extends "button" ? HTMLButtonElement
    : K extends "span" ? HTMLSpanElement
    : K extends "Fragment" ? DocumentFragment
    : HTMLElement
    */
  type Element = HTMLElement
}
