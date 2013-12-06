cordova-plugin-gapreload
========================

LiveReload plugin for Cordova/PhoneGap applications.

## Installation

1. Install the [LiveReload][LiveReload] app.
2. Install the [Apache Cordova][Cordova] 3 CLI: `$ npm install -g cordova` (you may need to use `sudo`).
3. `cd` into your Cordova app folder previously created using the `$ cordova create` command.
4. Install GapReload: `$ cordova plugin add <repo> --variable SERVER_HOSTNAME="<host>"` where `repo` is `https://github.com/fingerproof/cordova-plugin-gapreload` and `host` typically is your localhost IP address (static is better).
5. Follow GapReload instructions in your terminal window and you will be good to go.

## Configuration

The `SERVER_HOSTNAME` variable is mandatory. Other available variables are:

| Variable name       | Default value   |
|---------------------|-----------------|
| SERVER_PORT         | 8000            |
| LIVERELOAD_HOSTNAME | SERVER_HOSTNAME |
| LIVERELOAD_PORT     | 35729           |

Generally you should not modify those values but, if you really have to, just know that you can.

Setting values for `SERVER_HOSTNAME` and `SERVER_HOSTNAME` using the CLI will also automagically [whitelist][whitelist] them for you.

But you can also declare/override values in your *[www/config.xml][config]* file like so:

```xml
<feature name="pro.fing.cordova.gapreload">
	<param name="SERVER_HOSTNAME" value="whatever you want"/>
	<param name="SERVER_PORT" value="whatever you want"/>
	<param name="LIVERELOAD_HOSTNAME" value="whatever you want"/>
	<param name="LIVERELOAD_PORT" value="whatever you want"/>
</feature>
```

## Removal

Because you shouldn't let this plugin make it to production.

1. `cd` into your Cordova app folder.
2. Enter `$ cordova plugin remove pro.fing.cordova.gapreload`.
3. That's it, GapReload is gone for good.

[LiveReload]: http://livereload.com/
[Cordova]: http://cordova.apache.org/docs/en/3.1.0/guide_cli_index.md.html#The%20Command-line%20Interface
[whitelist]: http://cordova.apache.org/docs/en/3.1.0/guide_appdev_whitelist_index.md.html#Whitelist%20Guide
[config]: http://cordova.apache.org/docs/en/3.1.0/config_ref_index.md.html#The%20config.xml%20File
