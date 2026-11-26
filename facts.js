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

const funFactPanel = document.createElement('section');
funFactPanel.classList.add('panel');
funFact.appendChild(funFactPanel);

const funFactHeading = document.createElement('h2');
funFactHeading.textContent = 'Fun Facts!';
funFactPanel.appendChild(funFactHeading);

const funFactItem = document.createElement('p');
funFactItem.textContent = await loadRandomFact();
funFactPanel.appendChild(funFactItem);

const funFactExpansion = document.createElement('p');
funFactExpansion.textContent = 'Source: https://www.djtech.net/humor/shorty_useless_facts.htm';
funFactPanel.appendChild(funFactExpansion);

try {
    const funFactDisplayMode = localStorage.getItem('hw5-fun-fact-mode');
    if (funFactDisplayMode === 'compact') {
        funFact.setAttribute('compact', '');
    }
    else {
        funFact.removeAttribute('compact');
    }
}
catch (error) {
    console.log('Could not retrieve fun fact display preference from localStorage:', error);
    funFact.setAttribute('compact', '');
}

const toggle = document.getElementById('toggle');

toggle.addEventListener('click', () => {
    funFact.toggleAttribute('compact');

    try {
        if (funFact.hasAttribute('compact')) {
            localStorage.setItem('hw5-fun-fact-mode', 'compact');
        }
        else {
            localStorage.setItem('hw5-fun-fact-mode', 'expanded');
        }
    }
    catch (error) {
        console.log('Could not save fun fact compact/expanded preference to localStorage:', error);
    }
});

const funFactStatus = document.createElement('p');
funFactStatus.setAttribute('role', 'status');
funFactStatus.style.fontStyle = 'italic';
funFactPanel.appendChild(funFactStatus);

const funFactControl = document.createElement('button');
funFactControl.textContent = 'Tell me a fun fact';
funFactPanel.appendChild(funFactControl);

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