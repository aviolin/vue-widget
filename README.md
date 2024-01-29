# vue-widget

This project is based on the articles and repo in the following readme.

This is a reference project that demonstrate how to build web UI widget that can be embedded into 3rd party website. See walkthrough for details [here](https://blog.jenyay.com/web-ui-widget/).

## Development

```
npm i
```

```
npm run dev
```

```
npm run build-watch
```

* The widget script needs to be fully compiled, so build-watch is needed to rebuild the widget when a file is saved.

## Usage

Embed this script tag on the page to display the widget. In production, replace the widget.js url with the production url.

```html
<script>
    (function(w,d,s,o,f,js,fjs){w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
    }(window, document, 'script', '_mywidget', './dist/assets/widget.js', './dist/assets/widget.css'));
    _mywidget('init', { debug: true, elementId: 'MyWidget' });
</script>
```

Then place this line where you want the widget to be displayed.

```html
<div id="MyWidget"></div>
```