import utils from "../node_modules/decentraland-ecs-utils/index"
import { PianoKey } from "./pianoKey"
import resources from "./resources"

// Base scene
const baseScene = new Entity()
baseScene.addComponent(resources.models.baseScene)
engine.addEntity(baseScene)

const keyShape = new PlaneShape()

// White keys
const whiteKeySounds: AudioClip[] = [
  resources.sounds.whiteKeys.c3,
  resources.sounds.whiteKeys.d3,
  resources.sounds.whiteKeys.e3,
  resources.sounds.whiteKeys.f3,
  resources.sounds.whiteKeys.g3,
  resources.sounds.whiteKeys.a3,
  resources.sounds.whiteKeys.b3,
  resources.sounds.whiteKeys.c4,
  resources.sounds.whiteKeys.d4,
  resources.sounds.whiteKeys.e4,
  resources.sounds.whiteKeys.f4,
  resources.sounds.whiteKeys.g4,
  resources.sounds.whiteKeys.a4,
  resources.sounds.whiteKeys.b4,
]

let whiteKeyXPos = 2.75

for (let i = 0; i < whiteKeySounds.length; i++) {
  const key = new PianoKey(
    keyShape,
    new Transform({
      position: new Vector3(whiteKeyXPos, 0.11, 8),
      scale: new Vector3(0.7, 4, 0.5),
      rotation: Quaternion.Euler(90, 0, 0),
    }),
    Color3.White(),
    whiteKeySounds[i],
    resources.trigger.triggerWhitePianoKey
  )
  whiteKeyXPos += 0.8
}

// Black keys
const blackKeySounds: AudioClip[] = [
  resources.sounds.blackKeys.cSharp3,
  resources.sounds.blackKeys.dSharp3,
  resources.sounds.blackKeys.fSharp3,
  resources.sounds.blackKeys.gSharp3,
  resources.sounds.blackKeys.aSharp3,
  resources.sounds.blackKeys.cSharp4,
  resources.sounds.blackKeys.dSharp4,
  resources.sounds.blackKeys.fSharp4,
  resources.sounds.blackKeys.gSharp4,
  resources.sounds.blackKeys.aSharp4,
]

let blackKeyXPos = 3.15
let skipKey = 1

for (let i = 0; i < blackKeySounds.length; i++) {
  const key = new PianoKey(
    keyShape,
    new Transform({
      position: new Vector3(blackKeyXPos, 0.12, 9),
      scale: new Vector3(0.45, 2, 0.5),
      rotation: Quaternion.Euler(90, 0, 0),
    }),
    Color3.Black(),
    blackKeySounds[i],
    resources.trigger.triggerBlackPianoKey
  )

  // Skip key
  skipKey++
  if (skipKey == 7) skipKey = 1
  skipKey != 3 && skipKey != 6 ? (blackKeyXPos += 0.8) : (blackKeyXPos += 1.6)
}

// Modify player's trigger shape
utils.TriggerSystem.instance.setCameraTriggerShape(
  new utils.TriggerBoxShape(
    new Vector3(0.5, 0.25, 0.5),
    new Vector3(0, -0.5, 0)
  )
)
