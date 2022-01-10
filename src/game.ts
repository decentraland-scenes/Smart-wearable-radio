import * as ui from '@dcl/ui-scene-utils'

let radios = {
  Rave: {
    value: 'https://icecast.ravepartyradio.org/ravepartyradio-192.mp3',
  },
  Delta: {
    value: 'https://cdn.instream.audio/:9069/stream?_=171cd6c2b6e',
  },
  Signs: {
    value: 'https://edge.singsingmusic.net/MC2.mp3',
  },
  MK_Lab: {
    value:
      'https://freeuk13.listen2myradio.com/live.mp3?typeportmount=s2_20223_stream_944192845',
  },
}

let radioUI = new ui.CustomPrompt(ui.PromptStyles.DARKLARGE, null, null)

radioUI.addText('DCL Radio', 0, 170, Color4.White(), 25)

radioUI.addText('Choose a station', 0, 150, Color4.Gray(), 20)

radioUI.addSwitch(
  'Radio On',
  -170,
  -130,
  () => {
    playRadio(true, station)
  },
  () => {
    playRadio(false)
  },
  ui.SwitchStyles.SQUAREGREEN
)

let station1 = radioUI.addCheckbox(
  'Rave',
  -130,
  100,
  () => {
    station2.uncheck()
    station3.uncheck()
    station4.uncheck()
    playRadio(true, radios.Rave.value)
  },
  () => {
    playRadio(false)
  }
)

let station2 = radioUI.addCheckbox(
  'Delta',
  -130,
  70,
  () => {
    station1.uncheck()

    station3.uncheck()
    station4.uncheck()
    playRadio(true, radios.Delta.value)
  },
  () => {
    playRadio(false)
  }
)

let station3 = radioUI.addCheckbox(
  'Signs',
  -130,
  40,
  () => {
    station1.uncheck()
    station2.uncheck()

    station4.uncheck()
    playRadio(true, radios.Signs.value)
  },
  () => {
    playRadio(false)
  }
)

let station4 = radioUI.addCheckbox(
  'MK_Labs',
  -130,
  10,
  () => {
    station1.uncheck()
    station2.uncheck()
    station3.uncheck()
    playRadio(true, radios.MK_Lab.value)
  },
  () => {
    playRadio(false)
  }
)

let volUp = radioUI.addButton('Volume +', -100, -50, () => {
  volume += 0.1

  if (radioPlayer.hasComponent(AudioStream))
    radioPlayer.getComponent(AudioStream).volume = volume
})

let volDown = radioUI.addButton('Volume -', 100, -50, () => {
  volume -= 0.1

  if (radioPlayer.hasComponent(AudioStream))
    radioPlayer.getComponent(AudioStream).volume = volume
})

Input.instance.subscribe('BUTTON_DOWN', ActionButton.SECONDARY, false, (e) => {
  if (radioUI) {
    if (!radioUI.background.visible) {
      radioUI.show()
    } else {
      radioUI.hide()
    }
  }
})

let volume: number = 0.5
let station = ''

let radioPlayer = new Entity()
engine.addEntity(radioPlayer)

export function playRadio(state: boolean, url?: string) {
  if (!state) {
    if (radioPlayer.hasComponent(AudioStream))
      radioPlayer.getComponent(AudioStream).playing = false
  } else if (url) {
    station = url
    let musicStream = new AudioStream(url)
    radioPlayer.addComponentOrReplace(musicStream)
    musicStream.playing = true
    musicStream.volume = volume
  }
}
