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
funFactStatus.setAttribute('role', 'status');
funFactStatus.style.fontStyle = 'italic';
funFact.appendChild(funFactStatus);

const funFactControl = document.createElement('button');
funFactControl.textContent = 'Tell me a fun fact';
funFact.appendChild(funFactControl);

funFactControl.addEventListener('click', async () => {
    funFactControl.setAttribute('disabled', 'disabled');
    funFactStatus.textContent = 'Loading fun fact...';
    await new Promise(requestAnimationFrame);

    try {
        const fact = await loadRandomFact();
        if (!fact) {
            throw new Error('Could not retrieve fact.');
        }

        funFactItem.textContent = fact;
        funFactStatus.textContent = 'Fun fact loaded.';
    }
    catch (error) {
        funFactStatus.textContent = 'Oops! We couldn\'t a fun enough fact, please try again.';
    }
    finally {
        funFactControl.removeAttribute('disabled');
    }
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
        return null;
    } 
}