import './Spinner.css';

export function ShowSpinner() {
    let app = document.querySelector('#app');

    let spinner = document.createElement('div');
    spinner.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
    spinner.id = 'spinner';

    app.appendChild(spinner);
}

export function RemoveSpinner() {
    let app = document.querySelector('#app');
    app.removeChild(app.querySelector('#spinner'));
}