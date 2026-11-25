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

const funFactStatusList = ['That\'s pretty fun!', 'I think we can do funner.', 'The funnest fact there is.'];
let funFactIndex = 0;

const funFact = document.querySelector('fun-fact');

const funFactHeading = document.createElement('h2');
funFactHeading.textContent = 'Fun Facts!';
funFact.appendChild(funFactHeading);

const funFactItem = document.createElement('p');
funFactItem.textContent = await loadRandomFact();
funFact.appendChild(funFactItem);

const funFactExpansion = document.createElement('p');
funFactExpansion.textContent = 'Source: https://www.djtech.net/humor/shorty_useless_facts.htm';
funFactExpansion.setAttribute('hidden', 'hidden');
funFact.appendChild(funFactExpansion);

const funFactStatus = document.createElement('p');
funFactStatus.textContent = funFactStatusList[funFactIndex];
funFactStatus.style.fontStyle = 'italic';
funFact.appendChild(funFactStatus);

const funFactControl = document.createElement('button');
funFactControl.textContent = 'Tell me a fun fact';
funFact.appendChild(funFactControl);

funFactControl.addEventListener('click', async () => {
    funFactIndex = ++funFactIndex % funFactStatusList.length;
    funFactItem.textContent = await loadRandomFact();
    funFactStatus.textContent = funFactStatusList[funFactIndex];
});

const toggle = document.getElementById('toggle');

toggle.addEventListener('click', () => {
    funFact.toggleAttribute('compact');
});

async function loadRandomFact() {
    try {
        const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random');

        if (!response.ok) {
            throw new Error(`HTTP status: ${response.status}`);
        }

        const data = await response.json();

        if(typeof data?.text !== 'string') {
            throw new Error('Expected a fact in the response.');
        }

        return data.text;
    }
    catch (error) {
        console.error('Could not load the message.', error);
    } 
}