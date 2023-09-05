import './BtnBlue.css';

const BtnBlue = (value, id, disable, onClickHandlee) => {
    return (`
        <button id=${id} role="button" disabled=${disable} onclick="console.log('work')" >${value}</button>
    `)
}

export default BtnBlue;
