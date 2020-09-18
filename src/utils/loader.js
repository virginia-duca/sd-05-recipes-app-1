import style from './loader.css';

const body = document.querySelector('BODY');
let wheelColor = '#e53935';
let baseColor = '#f3f3f3';
let bgColor = '#000000E9';
let thickness = '6px';
let size = '64px';
let cOverflow = 'auto';

function init() {
  cOverflow = body.style.overflow || 'auto';
  if (!document.querySelector('._style')) {
    const elStyle = document.createElement('style');
    elStyle.className = '_style';
    document.querySelector('HEAD')
      .appendChild(elStyle)
      .innerText = style;
  }
}

function start() {
  body.style.overflow = 'hidden';
  if (!document.querySelector('._loader')) {
    let el = body.insertBefore(document.createElement('div'), body.firstChild);
    el.className = '_loader';
    el.style.backgroundColor = bgColor;
    el = el.appendChild(document.createElement('div'));
    el.className = '_spinner';
    el.style.width = size;
    el.style.height = size;
    el.style.borderColor = baseColor;
    el.style.borderTopColor = wheelColor;
    el.style.borderWidth = thickness;
  }
}

function stop() {
  body.style.overflow = cOverflow;
  if (document.querySelector('._loader')) {
    body.removeChild(document.querySelector('._loader'));
  }
}

function setSize(s) {
  size = s;
}

function setThickness(t) {
  thickness = t;
}

function setColor({ base, wheel, bg }) {
  baseColor = base || baseColor;
  wheelColor = wheel || wheelColor;
  bgColor = bg || bgColor;
}

export default {
  init,
  setSize,
  setThickness,
  setColor,
  start,
  stop,
};
