import './EditGallery.css';
import { previewFile } from '../../components/previewFile/PreviewFile';
import PhotoSettings from '../../components/photoSettings/PhotoSettings';

const EditGallery = (files) => {
    let editContainer = document.createElement('div');
    editContainer.classList.add('edit-container');

    let galleryContainer = document.createElement('div');
    galleryContainer.id = 'editGallery';
    files.forEach(file => previewFile(file, galleryContainer, false, true, null, null));

    editContainer.innerHTML = `
        <div class="edit-header"> 
            <a> < Назад </a>
            <button>Скачать файлы</button>
        </div>
        <div id="editContent">
        </div>
    `;

    editContainer.querySelector('#editContent').append(galleryContainer, PhotoSettings());

    return editContainer;
}


export default EditGallery;