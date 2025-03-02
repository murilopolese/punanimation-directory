import { filters } from './filters.js'

export function header(state, emit) {
  function hiddenParts() {
    return html`
      <div class="menu">
        <div class="pages">
          <a href="#about">About</a>
          <a href="https://panimation.typeform.com/to/ZJL9Gx" target="_blank">Join</a>
          <a href="https://www.patreon.com/panimation" target="_blank">Support</a>
        </div>
        <div class="social-media">
          <a href="https://www.facebook.com/groups/panimation/" target="_blank"><img src="media/facebook.svg" alt="Facebook" /></a>
          <a href="https://vimeo.com/channels/panimation" target="_blank"><img src="media/vimeo.svg" alt="Vimeo" /></a>
          <a href="https://www.instagram.com/panimation.tv/" target="_blank"><img src="media/instagram.svg" alt="Instagram" /></a>
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
  if (state.route == 'about') {
    return html`
      <div id="header" class="header">
        ${hiddenParts(state, emit)}
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
