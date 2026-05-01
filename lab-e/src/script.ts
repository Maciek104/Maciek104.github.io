type StyleMap = {
    [key: string]: string;
};


const styles: StyleMap = {
    "1": "styles/style-1.css",
    "2": "styles/style-2.css",
    "3": "styles/style-3.css"
};


let currentStyleKey: string = Object.keys(styles)[0];
let currentLinkElement: HTMLLinkElement | null = null;


function applyStyle(stylePath: string) {
    if (currentLinkElement) {
        document.head.removeChild(currentLinkElement);
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = stylePath;

    document.head.appendChild(link);

    currentLinkElement = link;
}


function changeStyle(styleKey: string) {
    currentStyleKey = styleKey;
    const stylePath = styles[styleKey];
    applyStyle(stylePath);
}


function createStyleSwitcher() {
    const container = document.createElement("div");
    container.id = "style-switcher";

    const title = document.createElement("p");
    title.textContent = "WYBIERZ STYL";
    title.id = "style-switcher-title"
    container.appendChild(title);

    const buttonsRow = document.createElement("div");
    buttonsRow.id = "buttons-row"

    Object.keys(styles).forEach((styleKey) => {
        const btn = document.createElement("button");
        btn.textContent = styleKey;
        btn.id = "style-switch-button"

        btn.addEventListener("click", () => {
            changeStyle(styleKey);
        });

        buttonsRow.appendChild(btn);
    });

    container.appendChild(buttonsRow)

    document.body.appendChild(container);
}


function init() {
  createStyleSwitcher();
  applyStyle(styles[currentStyleKey]);
}

init();