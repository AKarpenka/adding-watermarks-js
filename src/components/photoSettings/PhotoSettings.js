import './PhotoSettings.css';
import { previewFilesAsCanvas } from '../previewFile/PreviewFile';

const logoGallery = [
    '/logo-1.png',
    '/logo-2.png',
    '/logo-3.png',
    '/logo-4.png',
    '/logo-5.png',
    '/logo-6.png',
    '/logo-7.png',
    '/logo-8.png'
]

const PhotoSettings = (files) => {
    let app = document.querySelector('#app');

    let editMenu = document.createElement('div');
    editMenu.id = 'editMenu';

    let addTextBtn = document.createElement('input');
    addTextBtn.type = "button";
    addTextBtn.id = "addTextBtn"
    addTextBtn.value = "Добавить текст";

    let addLogoBtn = document.createElement('input');
    addLogoBtn.type = "button";
    addLogoBtn.id = "addLogoBtn";
    addLogoBtn.value = "Добавить логотип";

    createMainBtns();

    function createMainBtns() {
        editMenu.appendChild(addTextBtn);
        editMenu.innerHTML += '<p>или</p>';
        editMenu.appendChild(addLogoBtn);

        editMenu.querySelector('#addTextBtn').addEventListener('click', onClickAddTextBtn);
        editMenu.querySelector('#addLogoBtn').addEventListener('click', onClickAddLogoBtn);
    }

    function onClickAddTextBtn() {
        let addTextInput = document.createElement('input');
        addTextInput.type = "text";
        addTextInput.id = "textValue";
        addTextInput.placeholder = "Ваш текст";

        createSettings('textWattermark', addTextInput);
    }

    function onClickAddLogoBtn() {
        editMenu.innerHTML = "";

        let backToBtn = document.createElement('a');
        backToBtn.innerText = "< Назад";

        let addLogoFromGallery = document.createElement('input');
        addLogoFromGallery.type = "button";
        addLogoFromGallery.id = "addLogoFromGallery";
        addLogoFromGallery.value = "Выбрать из галереи";
    
        let inputFile = document.createElement('label');
        inputFile.classList.add('input-file');

        let addLogoFromFiles = document.createElement('input');
        addLogoFromFiles.type = "file";
        addLogoFromFiles.accept="image/*";

        let fileBtnName = document.createElement('span');
        fileBtnName.innerText = 'Выбрать из файлов';

        inputFile.append(addLogoFromFiles, fileBtnName);

        editMenu.append(backToBtn, addLogoFromGallery, inputFile);

        editMenu.querySelector('a').addEventListener('click', () => {
            editMenu.innerHTML = "";
            createMainBtns();
        });

        editMenu.querySelector('#addLogoFromGallery').addEventListener('click', createLogoGallery);
        addLogoFromFiles.addEventListener('change', (e) => {
            let reader = new FileReader();
            reader.readAsDataURL(e.target?.files[0]);
            reader.onloadend = function() {
                let img = document.createElement('img');
                img.src = reader.result;

                createSettings('logoWattermark', img);
            }
            
        })
    }

    function createSettings(mode, wattermarkType) {
        editMenu.innerHTML = "";

        let backToBtn = document.createElement('a');
        backToBtn.innerText = "< Назад";

        let form = document.createElement('form');

        let logoSize = document.createElement('select');
        if (mode==='textWattermark') {        
            for(let i = 10; i <= 42; i += 2) {
                createSelect(i, logoSize, 'pt');
            }
        } else if (mode === 'logoWattermark') {
            for(let i = 10; i <= 300; i += 10) {
                createSelect(i, logoSize, 'px');
            }
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

        if(mode === 'textWattermark') {
            form.append(createDivSetting('Текст', wattermarkType));
        } else if (mode === 'logoWattermark') {
            form.append(createDivSetting('Выбранный логотип', wattermarkType));
        }
        
        form.append(    
            createDivSetting('Размер', logoSize),
            createDivSetting('Прозрачность', transparency), 
            createDivSetting('Позиция', position), 
            submitBtn
        );

        editMenu.append(backToBtn, form);

        editMenu.querySelector('a').addEventListener('click', () => {
            editMenu.innerHTML = "";
            createMainBtns();
        });

        editMenu.querySelector('form').addEventListener('submit', (e) => {
            handleSubmit(e, mode, wattermarkType);
        });


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

        function handleSubmit(e, mode, logo) {
            e.preventDefault();

            let obj = {};
            if (mode === 'textWattermark'){
                obj = {
                    'text': e?.target[0]?.value || "Ваш текст",
                    'fontSize': e?.target[1]?.value,
                    'transparency': e?.target[2]?.value,
                    'position': e?.target[3]?.value
                }
            } else if (mode === 'logoWattermark') {
                obj = {
                    logo,
                    'size': e?.target[0]?.value,
                    'transparency': e?.target[1]?.value,
                    'position': e?.target[2]?.value
                }
            }

            let galleryContainer = document.querySelector('#editGallery');
            galleryContainer.innerHTML = "";
            files.forEach(file => previewFilesAsCanvas(file, galleryContainer, obj, mode));
        }

    }

    
    function createLogoGallery() {
        let div = document.createElement('div');
        div.classList.add('logo-outer-container')

        let logoGalleryContainer = document.createElement('div');
        logoGalleryContainer.id ='logoContainer';

        let closeBtn = document.createElement('a');
        closeBtn.innerText = 'x';

        logoGallery.forEach(src => {
            let imgDiv = document.createElement('div');
            imgDiv.classList.add('logo-btn')
            let img = document.createElement('img');
            img.src = src;
            img.height = '70';

            imgDiv.appendChild(img);
            logoGalleryContainer.appendChild(imgDiv);
        });

        closeBtn.addEventListener('click', () => {
            app.removeChild(div);
        });

        logoGalleryContainer.addEventListener('click', (e) => {
            createSettings('logoWattermark', e?.target);
            app.removeChild(div);
        });

        div.append(logoGalleryContainer, closeBtn);
        app.appendChild(div);
    }

    return editMenu;
}


export default PhotoSettings;