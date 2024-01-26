// import './assets/main.css'
import loader from './loader'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

/**
 * Default configurations that are overridden by
 * parameters in embedded script.
 */
const defaultConfig = {
    debug: false,
    text: 'Hello World',
};

// main entry point - calls loader and renders app
loader(
    window,
    defaultConfig,
    window.document.currentScript,
    (elementId, config) => {
        const app = createApp(App)
        app.use(createPinia())
        app.mount(elementId) // replace #app with el
    }
);
