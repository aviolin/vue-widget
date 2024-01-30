# vue-widget

This project is based on the following articles: https://blog.jenyay.com/web-ui-widget/.

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
    (function(w,d,s,o,f,lf,js,fjs){w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
    js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
    js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
    l=d.createElement('link');l.rel='preload';l.as='style';l.href=lf;fjs.parentNode.insertBefore(l,fjs);
    }(window, document, 'script', '_mywidget', './dist/assets/widget.js', './dist/assets/widget.css'));
    _mywidget('init', { debug: true, elementId: 'MyWidget', stylesheets: './dist/assets/widget.css' });
</script>
```

Then place this line where you want the widget to be displayed.

```html
<div id="MyWidget"></div>
```

### Dispatching events to the widget

You can dispatch an update event to the widget like this:

```javascript
_mywidget('update', { 'background-color': 'red' });
```
