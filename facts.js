class FunFact extends HTMLElement {
    static observedAttributes = ['compact'];
    
    constructor() {
        super();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (funFact.hasAttribute('compact')) {
            funFactExpansion.setAttribute('hidden', 'hidden');
        }
        else {
            funFactExpansion.removeAttribute('hidden');
        }
    }
}

customElements.define('fun-fact', FunFact);

const funFactList = ['Wallace\'s flying frog has large webbing that lets it glide from tree to tree.', 'After an octopus lays eggs, she stops eating and dies in an act of self-sacrifice for the offspring.', 'Chimpanzees and vervet monkeys have been known to steal alcholic beverages.'];
const funFactStatusList = ['That\'s pretty fun!', 'I think we can do funner.', 'The funnest fact there is.'];
const funFactExpansionList = ['Rhacophorus nigropalmatus', 'Octopus vulgaris', 'Pan troglodytes, Chlorocebus pygerythrus'];
let funFactIndex = 0;

const funFact = document.querySelector('fun-fact');

const funFactHeading = document.createElement('h2');
funFactHeading.textContent = 'Fun Facts!';
funFact.appendChild(funFactHeading);

const funFactItem = document.createElement('p');
funFactItem.textContent = funFactList[funFactIndex];
funFact.appendChild(funFactItem);

const funFactExpansion = document.createElement('p');
funFactExpansion.textContent = 'Scientific name: ' + funFactExpansionList[funFactIndex];
funFact.appendChild(funFactExpansion);

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
    funFactExpansion.textContent = 'Scientific name: ' + funFactExpansionList[funFactIndex];
});

const toggle = document.getElementById('toggle');

toggle.addEventListener('click', () => {
    funFact.toggleAttribute('compact');
});