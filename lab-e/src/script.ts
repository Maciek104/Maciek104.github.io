function changeStyle(style: string) {
    const existingLink = document.querySelector('link[data-style]');
    if (existingLink) {
        existingLink.remove();
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/styles/${style}.css`;
    link.dataset.style = style;
    document.head.appendChild(link);
}

const buttons = document.querySelectorAll('footer button');
buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const styleName = `style-${index + 1}`;
        changeStyle(styleName);
    });
})

function loadDefaultStyle() {
    changeStyle('style-1');
}

window.addEventListener('load', loadDefaultStyle);