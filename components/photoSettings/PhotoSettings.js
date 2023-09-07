import './PhotoSettings.css';


const PhotoSettings = () => {
    let editMenu = document.createElement('div');
    editMenu.id = 'editMenu';

    let addTextBtn = document.createElement('input');
    addTextBtn.type = "button";
    addTextBtn.id = "addTextBtn"
    addTextBtn.value = "Добавить текст";

    let addLogoBtn = document.createElement('input');
    addLogoBtn.type = "button";
    addLogoBtn.value = "Добавить логотип";

    createMainBtns();

    function createMainBtns() {
        editMenu.appendChild(addTextBtn);
        editMenu.innerHTML += '<p>или</p>';
        editMenu.appendChild(addLogoBtn);

        editMenu.querySelector('#addTextBtn').addEventListener('click', onClickAddTextBtn);
    }

    function onClickAddTextBtn() {
        editMenu.innerHTML = "";

        let backToBtn = document.createElement('a');
        backToBtn.innerText = "< Назад";

        // let form = document.createElement('form');
        // form.id =

        let addTextInput = document.createElement('input');
        addTextInput.type = "text";
        editMenu.append(backToBtn, addTextInput);

        editMenu.querySelector('a').addEventListener('click', () => {
            editMenu.innerHTML = "";
            createMainBtns();
        })
    }


    //функция со свойствами, передать выше в форму с кнопкой отправить 


    return editMenu;
}




export default PhotoSettings;