import { filters } from './filters.js'

export function header(state, emit) {
  function hiddenParts() {
    return html`
      <div class="menu">
        <div class="pages">
          <a href="#about">About</a>
          <a href="#" target="_blank">Join</a>
          <a href="#" target="_blank">Support</a>
        </div>
        <div class="social-media">
          <a href="#"><img src="media/facebook.svg" alt="Facebook" /></a>
          <a href="#"><img src="media/vimeo.svg" alt="Vimeo" /></a>
          <a href="#"><img src="media/instagram.svg" alt="Instagram" /></a>
        </div>
      </div>
      <div class="logo">
        <a href="/">
          <img src="media/newlogo.svg" alt="Panimation logo" />
        </a>
        <div class="sub-header">
          A directory of women, trans and non-binary friends working with
          animation and motion graphics.
        </div>
      </div>
    `
  }
  if (state.isMenuShowing) {
    return html`
      <div id="header" class="header">
        ${hiddenParts(state, emit)}
        ${filters(state, emit)}
      </div>
      <div id="header-fixed" class="header fixed">
        ${hiddenParts(state, emit)}
        ${filters(state, emit)}
      </div>
    `
  }
  return html`
    <div id="header" class="header">
      ${hiddenParts(state, emit)}
      ${filters(state, emit)}
    </div>
  `
}
