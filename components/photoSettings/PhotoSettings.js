import './PhotoSettings.css';
import { previewFilesAsCanvas } from '../previewFile/PreviewFile';

const PhotoSettings = (files) => {
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

        let form = document.createElement('form');

        let addTextInput = document.createElement('input');
        addTextInput.type = "text";
        addTextInput.id = "textValue";
        addTextInput.placeholder = "Ваш текст";

        let fontSize = document.createElement('select');
        for(let i = 10; i <= 42; i += 2) {
            createSelect(i, fontSize, 'pt');
        }

        let transparency = document.createElement('select');
        for(let i = 10; i <= 100; i += 10) {
            createSelect(i, transparency, '%');
        }

        let position = document.createElement('select');
        const positionOptions = [
            'Сверху слева',
            'Сверху посередине',
            'Сверху справа',
            'Посередине слева',
            'Посередине',
            'Посередине справа',
            'Снизу слева',
            'Снизу посередине',
            'Снизу справа'
        ];
        positionOptions.forEach(el => {
            createSelect(el, position);
        });

        let submitBtn = document.createElement('input');
        submitBtn.type = 'submit';
        submitBtn.value = 'Применить';

        form.append(
            createDivSetting('Текст', addTextInput), 
            createDivSetting('Размер шрифта', fontSize), 
            createDivSetting('Прозрачность', transparency), 
            createDivSetting('Позиция', position), 
            submitBtn
        );
        editMenu.append(backToBtn, form);

        editMenu.querySelector('a').addEventListener('click', () => {
            editMenu.innerHTML = "";
            createMainBtns();
        });

        editMenu.querySelector('form').addEventListener('submit', handleSubmit);


        function createDivSetting(text, el) {
            let div = document.createElement('div');
            div.classList.add('setting');

            let lable = document.createElement('p');
            lable.innerText = text;

            div.append(lable, el);
            return div;
        }

        function createSelect(value, el, unit = '') {
            let option = document.createElement('option');
            option.value = value;
            option.innerText = `${value}${unit}`;
            el.appendChild(option);
        }

        function handleSubmit(e) {
            e.preventDefault();
            let obj = {
                'text': e?.target[0]?.value || "Ваш текст",
                'fontSize': e?.target[1]?.value,
                'transparency': e?.target[2]?.value,
                'position': e?.target[3]?.value
            }

            let galleryContainer = document.querySelector('#editGallery');
            galleryContainer.innerHTML = "";
            files.forEach(file => previewFilesAsCanvas(file, galleryContainer, obj));
        }
    }

    return editMenu;
}




export default PhotoSettings;