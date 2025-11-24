// Copyright 2025 Yoshiya Hinosawa. MIT License.

/** @jsxImportSource @kt3k/domx */
/** @jsxRuntime automatic */

const div = (
  <div class="container">
    Hello, <span>world!</span>
  </div>
);
div.classList.add("new-class");
const button = <button type="button">hello</button> as HTMLButtonElement;
const _status = button.disabled;
