export function header(state, emit) {
  return html`
    <div id="header">
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
      <div class="filters">
        <div class="filter selected">
          <div class="label">Label</div>
          <div class="icon">
            <img src="media/arrowdown.svg" alt="arrow down" />
          </div>
          <div class="drawer closed">
            <div class="search">
              <input type="text" />
              <img src="media/search.svg" alt="search" />
            </div>
            <div class="list">
              <div class="item-header">Header Item</div>
              <div class="item selected">Selected Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item-header">Header Item</div>
              <div class="item selected">Selected Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
            </div>
          </div>
        </div>
        <div class="filter">
          <div class="label">Label</div>
          <div class="icon">
            <img src="media/arrowdown.svg" alt="arrow down" />
          </div>
          <div class="drawer closed">
            <div class="search">
              <input type="text" />
              <img src="media/search.svg" alt="search" />
            </div>
            <div class="list">
              <div class="item-header">Header Item</div>
              <div class="item selected">Selected Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item-header">Header Item</div>
              <div class="item selected">Selected Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
            </div>
          </div>
        </div>
        <div class="filter">
          <div class="label">Label</div>
          <div class="icon">
            <img src="media/arrowdown.svg" alt="arrow down" />
          </div>
          <div class="drawer closed">
            <div class="search">
              <input type="text" />
              <img src="media/search.svg" alt="search" />
            </div>
            <div class="list">
              <div class="item-header">Header Item</div>
              <div class="item selected">Selected Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item-header">Header Item</div>
              <div class="item selected">Selected Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
              <div class="item">Regular Item</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}
