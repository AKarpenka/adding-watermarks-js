import './BtnBlue.css';

const BtnBlue = (value, id, disable) => {
    return (`
        <button id=${id} role="button" disabled=${disable} >${value}</button>
    `)
}

export default BtnBlue;
