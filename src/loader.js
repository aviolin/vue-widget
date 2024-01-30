export const DEFAULT_NAME = '_mywidget';

/**
 * Loads widget instance.
 *
 * @param win Global window object which stores pre-loaded and post-loaded state of widget instance.
 * @param defaultConfig A configurations that are merged with user.
 * @param scriptElement The script tag that includes installation script and triggered loader.
 * @param render A method to be called once initialization done and DOM element for hosting widget is ready.
 */
export default (
    win,
    defaultConfig,
    scriptElement,
    render) => {

    // get a hold of script tag instance, which has an
    // attribute `id` with unique identifier of the widget instance
    const instanceName = scriptElement?.attributes.getNamedItem('id')?.value ?? DEFAULT_NAME;
    const loaderObject = win[instanceName];
    if (!loaderObject || !loaderObject.q) {
        throw new Error(`Widget didn't find LoaderObject for instance [${instanceName}]. ` +
            `The loading script was either modified, no call to 'init' method was done ` +
            `or there is conflicting object defined in \`window.${instanceName}\` .`);
    }

    // check that the widget is not loaded twice under the same name
    if (win[`loaded-${instanceName}`]) {
        throw new Error(`Widget with name [${instanceName}] was already loaded. `
            + `This means you have multiple instances with same identifier (e.g. '${DEFAULT_NAME}')`);
    }

    // this will be the root element of the vue app
    let vueContainer;

    // iterate over all methods that were called up until now
    for (let i = 0; i < loaderObject.q.length; i++) {
        const item = loaderObject.q[i];
        const methodName = item[0];
        if (i === 0 && methodName !== 'init') {
            throw new Error(`Failed to start Widget [${instanceName}]. 'init' must be called before other methods.`);
        } else if (i !== 0 && methodName === 'init') {
            continue;
        }

        switch (methodName) {
            case 'init':
                const loadedObject = Object.assign(defaultConfig, item[1]);
                if (loadedObject.debug) {
                    console.log(`Starting widget [${instanceName}]`, loadedObject);
                }

                // find wrapping element
                let wrappingElement = win.document.body;
                if (loadedObject.elementId) {
                    wrappingElement = win.document.getElementById(loadedObject.elementId);
                    if (!wrappingElement) {
                        throw new Error(`Failed to find element with id [${loadedObject.elementId}]`);
                    }
                }

                // create shadow dom host element
                if (loadedObject.shadow) {
                    wrappingElement = wrappingElement.attachShadow({ mode: loadedObject.shadowMode ?? 'open' });
                }

                if (loadedObject.stylesheets) {
                    /**
                     * Adds a link tag with the given stylesheet to the wrapper element
                     * 
                     * @param {string} href 
                     * @param {HTMLElement} wrapper
                     */
                    const addStylesheet = (href, wrapper) => {
                        const linkTag = win.document.createElement('link');
                        linkTag.setAttribute('rel', 'stylesheet');
                        linkTag.setAttribute('href', href);
                        wrapper.prepend(linkTag);
                    }

                    if (typeof loadedObject.stylesheets === 'string') {
                        loadedObject.stylesheets = [loadedObject.stylesheets];
                    }

                    for (let i = 0; i < loadedObject.stylesheets.length; i++) {
                        addStylesheet(loadedObject.stylesheets[i], wrappingElement);
                    }
                }

                // create and set up vue app container
                vueContainer = wrappingElement.appendChild(win.document.createElement('div'));
                vueContainer.setAttribute('id', `${instanceName}`);
                vueContainer.setAttribute('class', `app-root`);
                render(vueContainer, loadedObject);

                // vueContainer.addEventListener('widget-event', (e) => {
                //     console.log(e)
                // })

                // store indication that widget instance was initialized
                win[`loaded-${instanceName}`] = true;
                break;
            // TODO: here you can handle additional async interactions
            // with the widget from page (e.q. `_mywidget('refreshStats')`)
            default:
                console.warn(`Unsupported method [${methodName}]`, item[1]);
        }
    }

    // once finished processing all async calls, we going
    // to convert LoaderObject into sync calls to methods
    win[instanceName] = (method, ...args) => {
        switch (method) {
            case 'event': {
                vueContainer?.dispatchEvent(new CustomEvent('widget-event', { detail: { name: args?.[0] } }));
                break;
            }
            case 'update': {
                vueContainer?.dispatchEvent(new CustomEvent('widget-update', { detail: args }));
                break;
            }
            default:
                console.warn(`Unsupported method [${method}]`, args);
        }
    };
};
