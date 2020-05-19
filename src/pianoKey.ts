import utils from "../node_modules/decentraland-ecs-utils/index"
import { TriggerBoxShape } from "../node_modules/decentraland-ecs-utils/triggers/triggerSystem"

export class PianoKey extends Entity {

  constructor(
    shape: PlaneShape,
    transform: Transform,
    color: Color3,
    sound: AudioClip,
    trigger: TriggerBoxShape
  ) {
    super()
    engine.addEntity(this)
    this.addComponent(shape)
    this.addComponent(transform)
    const material = new Material()
    material.albedoColor = color
    material.metallic = 0.0
    material.roughness = 1.0
    this.addComponent(material)
    const onColor = new Color3(1.75, 1.25, 0.0) // Orange glow
    const offColor = Color3.Black() // To zero out emissive

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
          log("enter trigger: ", sound.url)
          this.getComponent(AudioSource).playOnce()
          material.emissiveColor = onColor
        },
        () => {
          //onCameraExit
          material.emissiveColor = offColor
        },
        false // debug
      )
    )
  }
}
