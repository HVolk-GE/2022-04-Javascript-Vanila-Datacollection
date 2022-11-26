'use strict';

const dom = {
    // classes ist so gedacht, dass Klassen als Array übergeben werden
    createEl(content, type, parent, classes) {
        const newEl = document.createElement(type);
        if (content) newEl.innerHTML = content;
        if (classes) newEl.className = classes.join(' ');
        if (parent) parent.append(newEl);
        return newEl;
    },

    createModal(content){
        console.log(content);
        const background = dom.createEl(false, 'div', document.body, ['modalBackground']);
        dom.createEl(content, 'div', background, ['container']);

        // Schließen-Knopf
        dom.createEl('X', 'div', background, ['closer']);

        background.addEventListener('click', () => background.remove());
    },

    $(sel){
        return document.querySelector(sel);
    },

    $$(sel){
        return Array.from(document.querySelectorAll(sel));
    },
}