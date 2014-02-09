cordova-plugin-gapreload
========================

*LiveReload* plugin for *Cordova/PhoneGap* applications. [Watch the video demo][demo].

## Installation

Note: if you use the *grunt-gapreload* task, skip these steps and follow [the proper documentation][grunt-gapreload] instead.

**Cordova 3.3** - For now, move *config.xml* back to the *www* folder (it won't break anything). I'm currently working on a better way to make the plugin work again without doing this (probably by writing configuration values in the *index.html* file itself). Please be patient, this is a temporary solution.

1. Install the [LiveReload][LiveReload] app (latest version can be found [here][latest]).
2. Install the [Apache Cordova][Cordova] 3 CLI: `$ npm install -g cordova` (you may need to use `sudo`).
3. `cd` into your Cordova app folder previously created using the `cordova create` command.
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

Note: if you use the *grunt-gapreload* task, skip these steps and follow [the proper documentation][grunt-gapreload] instead.

Because you shouldn't let this plugin make it to production.

1. `cd` into your Cordova app folder.
2. Execute `$ cordova plugin remove pro.fing.cordova.gapreload`.
3. That's it, GapReload is gone for good.

## Weird stuff to investigate

- I noticed that when using Chrome 32.0.1700.107 and LiveReload 2.3.34, once every two page refresh, the *livereload.js* file doesn't load at all. An error is thrown and this is what I get for this particular request in the developer tools: *caution provisional headers are shown*...

[grunt-gapreload]: https://github.com/fingerproof/grunt-gapreload
[LiveReload]: http://livereload.com/
[latest]: http://feedback.livereload.com/knowledgebase/articles/67441-how-do-i-start-using-livereload-
[Cordova]: http://cordova.apache.org/docs/en/3.1.0/guide_cli_index.md.html#The%20Command-line%20Interface
[whitelist]: http://cordova.apache.org/docs/en/3.1.0/guide_appdev_whitelist_index.md.html#Whitelist%20Guide
[config]: http://cordova.apache.org/docs/en/3.1.0/config_ref_index.md.html#The%20config.xml%20File
[demo]: https://vimeo.com/81192559
