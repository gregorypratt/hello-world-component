class HelloWorld extends HTMLElement {
  constructor() {
    super();
    console.log('constructor');

    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
            <h2>Example heading (scoped style)</h2>
            <slot name="first"></slot>
            <slot name="second"></slot>
            <button></button>
            <slot></slot>
            <style>
                :host {
                    font-family: Arial;
                }
                ::slotted(div) {
                    border: 1px solid black;
                }
            </style>
        `;
  }

  static get is() {
    return 'hello-world';
  }

  static get observedAttributes() {
    return ['text'];
  }

  get text() {
    return this.getAttribute('text');
  }

  set text(val) {
    this.setAttribute('text', val);
  }

  get message() {
    return this.getAttribute('message');
  }

  set message(val) {
    this.setAttribute('message', val);
  }

  render() {
    console.log('render');
    //
    // Could do with some template engine here 👇
    //
    this.shadowRoot.querySelector('button').textContent = this.text;
  }

  connectedCallback() {
    console.log('connectedCallback: inserted into the DOM');
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      alert(this.message);
    });
  }

  disconnectedCallback() {
    console.log('disconnectedCallback: removed from the DOM');
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    console.log('attributeChangedCallback: HTML attribute changed', {attrName}, {oldVal}, {newVal});
    this.render();
  }

  adoptedCallback() {
    console.log('adoptedCallback: element moved into a new document');
  }
}

customElements.define(HelloWorld.is, HelloWorld);