export function createElement (tag, className, text) {
    const element = document.createElement(tag);

    if (className) {
        // element.classList.add(className);
        element.className = className;
    }

    if (text) {
        element.textContent = text;
    }

    return element;
}

export function getElement (selector) {
    return document.querySelector(selector);
}

export function scrollTo (element) {
    element.scrollIntoView(true);
}