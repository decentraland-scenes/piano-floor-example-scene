import utils from '../node_modules/decentraland-ecs-utils/index'
import { TriggerBoxShape } from '../node_modules/decentraland-ecs-utils/triggers/triggerSystem'

export const sceneMessageBus = new MessageBus()

export let keys: PianoKey[] = []

export class PianoKey extends Entity {
  material: Material
  onColor = new Color3(1.75, 1.25, 0.0) // Orange glow
  offColor = Color3.Black() // To zero out emissive
  note: number

  constructor(
    shape: PlaneShape,
    transform: Transform,
    color: Color3,
    sound: AudioClip,
    trigger: TriggerBoxShape,
    note: number
  ) {
    super()
    engine.addEntity(this)
    this.addComponent(shape)
    this.addComponent(transform)
    this.material = new Material()
    this.material.albedoColor = color
    this.material.metallic = 0.0
    this.material.roughness = 1.0
    this.addComponent(this.material)

    // note ID
    this.note = note

    // Sound
    this.addComponent(new AudioSource(sound))

    // Create trigger
    this.addComponent(
      new utils.TriggerComponent(
        trigger, //shape
        0, //layer
        0, //triggeredByLayer
        null, //onTriggerEnter
        null, //onTriggerExit
        () => {
          //onCameraEnter
          log('enter trigger: ', sound.url)
          sceneMessageBus.emit('noteOn', { note: this.note })
        },
        () => {
          //onCameraExit
          sceneMessageBus.emit('noteOff', { note: this.note })
        },
        false // debug
      )
    )
  }
  public play(): void {
    this.getComponent(AudioSource).playOnce()
    this.material.emissiveColor = this.onColor
  }
  public end(): void {
    this.material.emissiveColor = this.offColor
  }
}

sceneMessageBus.on('noteOn', (e) => {
  keys[e.note].play()
})

sceneMessageBus.on('noteOff', (e) => {
  keys[e.note].end()
})