// Enable the hextech entrance animations. This runs synchronously in <head>,
// before the body paints, so content is never shown un-animated and then hidden
// (no flash). If JS is disabled, the entrance styles never apply and all content
// stays fully visible, the same as the reduced-motion path.
document.documentElement.className += " hx-ready";
