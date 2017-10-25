const lines = [
  {
    min: 9,
    max: 11,
    text: "The Blender Foundation presents"
  },
  {
    min: 12,
    max: 14,
    text: "What brings you to the land of GateKeepers"
  },
  {
    min: 18,
    max: 20,
    text: "I'm searching for someone"
  },
  {
    min: 36,
    max: 39,
    text: "Dengerous quest for a lonely hunter"
  },
  {
    min: 40,
    max: 44,
    text: "I've been alone for as long as I can remember"
  }
];

const videoWrapper = document.querySelector('.video-wrapper')
const videoText = document.querySelector('.video-wrapper__text')
const video = document.getElementById('video')

let currentTime
let currentData = {}

function setCurrentTime() {
  currentTime = video.currentTime.toFixed(3)
  console.log(currentTime)
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
