# Piano Floor Example Scene 

_demo of piano-floor-example-scene running in preview._

A piano floor where the player walks on the keys to play.

![demo](https://github.com/decentraland-scenes/piano-floor-example-scene/blob/master/screenshots/piano-floor.gif)

This scene shows you:
- How to play sounds from files
- How to change the material of a primitive shape
- How to use the trigger area from the Utils library to activate something when a player walks over it
- How to keep players synced by using the messagebus to communicate each player's actions to others

## Try it out

**Install the CLI**

Download and install the Decentraland CLI by running the following command:

```bash
npm i -g decentraland
```

**Previewing the scene**

Download this example and navigate to its directory, then run:

```
$:  dcl start
```

Any dependencies are installed and then the CLI opens the scene in a new browser tab.

**Scene Usage**

Step on the keys to activate each note. 

If there are multiple players in the scene, they should all hear what each other plays. You can simulate this by opening two browser tabs with the same preview.

Learn more about how to build your own scenes in our [documentation](https://docs.decentraland.org/) site.

If something doesn’t work, please [file an issue](https://github.com/decentraland-scenes/Awesome-Repository/issues/new).

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
