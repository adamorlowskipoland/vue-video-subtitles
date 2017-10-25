const lines = [
  {
    min: 0,
    max: 1,
    text: "Linia nr 1"
  },
  {
    min: 5,
    max: 6,
    text: "Llinia nr 2"
  },
  {
    min: 8,
    max: 9,
    text: "Llinia nr 3"
  },
  {
    min: 11,
    max: 14,
    text: "Llinia nr 4"
  }
];

const videoWrapper = document.querySelector('.video-wrapper')
const videoText = document.querySelector('.video-wrapper__text')
const video = document.getElementById('video')

let currentTime
let currentData = {}

function setCurrentTime() {
  currentTime = Math.floor(video.currentTime)
  displayLine()
}

function displayLine() {
  if (currentData) {
    if (!inBetween(currentTime, currentData)) {
      setCurrentData()
    }
  } else {
    setCurrentData()
  }
}

function setCurrentData () {
  videoText.textContent = ""
  currentData = lines.find(line => {
    if (inBetween(currentTime, line)) {
      videoText.textContent = line.text
    }
  })
}

function inBetween(x, {min, max}) {
  return x >= min && x <= max;
}

video.addEventListener('timeupdate', setCurrentTime)
