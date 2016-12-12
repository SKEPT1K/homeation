# homeation
WIP: A DIY home automation framework.

Created by SKEPT1K (REFLEK7 is my other account).

## Description
The goal of homeation is to provide a modular and light-weight do-it-yourself home automation framework.

## Setup
### config.json
Create `config.json` in the homeation root directory (i.e homeation/config.json).  An example `config.json` is below.

```
{
  "homeation": {
	"listen_port": 3000,
  "active_module": "none"
	}
}

```
* `homeation`: The project name.
* `listen_port`: The port homeation listens on.
* `active_module`: The module currently in use.  This is generally managed by homeation, but can be changed manually.

### Run the Homeation Framework
`node app.js // The app.js file in the root directory will run the homeation framework.`

### Installing Modules
homeation was designed to seamlessly integrate 3rd party modules.  Simply drag and drop a module into the homeation `modules` folder and visit `<device_ip>/setup` to activate.

## Creating Modules
### Module Description
The goal of homeation was to provide a framework in which developers can create modules to interface with their favorite hardware.  Modules should contain a singular model for interacting with a specific piece of hardware, a properly formated `package.json` and custom views.

### Components of a Module
Below is how modules should be structured.

<b>NOTE:</b> This list will be updated as development progresses.

```
`module_root`: This must be the name of the module.  Please limit names to alphanumerics and underscores.
	| `views<required>`: jade templates go here.
    | `root.jade<required>`: The main page for the module... Called by homeation by default.
	| `module_config.json<optional>`: config for providing settings for the module.
	| `package.json<required>`
	| `<module_name>.js<required>`: This is the file homeation calls.  Glue all components of the module together here.
```

### Module Functions
homeation provides numerous functions to make modules focused and easy to implement.

#### renderPage
```
exports.renderInfo = function(page, callback){
  callback(err, render);
}
```

##### render
As creating a one size fits all UI can be tough, homeation requires modules provide their own UI.

```
var render = {};
render.view = page // The name of the template to render.  Default sent by homeation is 'root'.
render.params = {'temperature': temperature} // Object of data sent to the page.
```

## Current Goals
* Provide support for a wide range sensors and acctuators.
  * Build out a framework of modules to support community/contributer modules

## Releases
* VER 0.0.1:  Initial commits.
* VER 0.1.0:  First pass for module management system.  See README for module creation.
* VER 0.1.1:  Added helper functions for modules and support for module UI.
