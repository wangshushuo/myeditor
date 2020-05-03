"use strict"

customElements.define('x-foo-shadowdom', class extends HTMLElement {
  constructor() {
    super(); // always call super() first in the constructor.

    // Attach a shadow root to the element.
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>:host { color:red; }</style> <!-- look ma, scoped styles -->
      <b>I'm in shadow dom!</b>
      <button id="click">click!</button>
      <slot></slot>
    `;
    this.bindEvent()
  }
  message="123"
  click(){
    console.log(this);
    alert(this.message)
  }
  bindEvent(){
    const button = this.shadowRoot.querySelector('#click');
    button.addEventListener('click', this.click.bind(this), false)
  }
});