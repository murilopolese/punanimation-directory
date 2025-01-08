console.log('loaded')

const app = Choo()
app.route('/', mainView)
app.mount('body')

function mainView(state, emit) {
  return html`
    <body>
      <div id="header">
        <div class="menu">
          <nav class="pages">
            <a href="#about">About</a>
            <a href="#" target="_blank">Join</a>
            <a href="#" target="_blank">Support</a>
          </nav>
          <nav class="social-media">
            <a href="#"><img src="media/facebook.svg" alt="Facebook" /></a>
            <a href="#"><img src="media/vimeo.svg" alt="Vimeo" /></a>
            <a href="#"><img src="media/instagram.svg" alt="Instagram" /></a>
          </nav>
        </div>
        <div class="logo">
          <img src="media/newlogo.svg" alt="Panimation" />
          <div class="sub-header">A directory of women, trans and non-binary friends working with animation and motion graphics.</div>
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
      <div id="container">
        <div class="item">
          <a href="#">
            <img src="media/thumbnail.png" />
            <span class="name">
              <span class="fullname">Full Name da Silva</span>
              <span class="location">(Cidade, XX)</span>
            </span>
          </a>
        </div>
        <div class="item">
          <a href="#">
            <img src="media/thumbnail.png" />
            <span class="name">
              <span class="fullname">Full Name da Silva</span>
              <span class="location">(Cidade, XX)</span>
            </span>
          </a>
        </div>
        <div class="item">
          <a href="#">
            <img src="media/thumbnail.png" />
            <span class="name">
              <span class="fullname">Full Name da Silva</span>
              <span class="location">(Cidade, XX)</span>
            </span>
          </a>
        </div>
        <div class="item">
          <a href="#">
            <img src="media/thumbnail.png" />
            <span class="name">
              <span class="fullname">Full Name da Silva</span>
              <span class="location">(Cidade, XX)</span>
            </span>
          </a>
        </div>
        <div class="item">
          <a href="#">
            <img src="media/thumbnail.png" />
            <span class="name">
              <span class="fullname">Full Name da Silva</span>
              <span class="location">(Cidade, XX)</span>
            </span>
          </a>
        </div>
      </div>
      <div id="modal">
        <div id="dialog">
          <div class="link"><a href="#"><img src="media/link.svg" /></a></div>
          <div class="row">
            <span class="title">Fullname da Silva</span>
            <span class="body">Cidade, XX</span>
          </div>
          <div class="row">
            <span class="title">Skills</span>
            <span class="body">2D Animation, Editing, Illustration, Graphic Design, Live Action, Stop Motion Animation, Art Direction, Motion Graphics, Cel Animation, Typography / Lettering, Storyboard Artist, Mentorship / Coaching</span>
          </div>
          <div class="row">
            <span class="title">Software</span>
            <span class="body">Photoshop, Dragonframe, Illustrator, After Effects, Premiere</span>
          </div>
        </div>
      </div>
    </body>
  `
}
