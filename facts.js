class FunFact extends HTMLElement {
    constructor() {
        super();
    }
}

customElements.define('fun-fact', FunFact);

const funFactList = ['Wallace\'s flying frog has large webbing that lets it glide from tree to tree.', 'After an octopus lays eggs, she stops eating and dies in an act of self-sacrifice for the offspring.', 'Chimpanzees and vervet monkeys have been known to steal alcholic beverages.'];
const funFactStatusList = ['That\'s pretty fun!', 'I think we can do funner.', 'The funnest fact there is.'];
let funFactIndex = 0;

const funFact = document.querySelector('fun-fact');

const funFactHeading = document.createElement('h2');
funFactHeading.textContent = 'Fun Facts!';
funFact.appendChild(funFactHeading);

const funFactItem = document.createElement('p');
funFactItem.textContent = funFactList[funFactIndex];
funFact.appendChild(funFactItem);

const funFactStatus = document.createElement('p');
funFactStatus.textContent = funFactStatusList[funFactIndex];
funFactStatus.style.fontStyle = 'italic';
funFact.appendChild(funFactStatus);

const funFactControl = document.createElement('button');
funFactControl.textContent = 'Get new fact!';
funFact.appendChild(funFactControl);

funFactControl.addEventListener('click', () => {
    funFactIndex = ++funFactIndex % funFactList.length;
    funFactItem.textContent = funFactList[funFactIndex];
    funFactStatus.textContent = funFactStatusList[funFactIndex];
});