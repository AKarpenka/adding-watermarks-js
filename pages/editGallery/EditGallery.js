import './EditGallery.css';
import { previewFilesAsCanvas } from '../../components/previewFile/PreviewFile';
import PhotoSettings from '../../components/photoSettings/PhotoSettings';

const EditGallery = (files) => {
    let editContainer = document.createElement('div');
    editContainer.classList.add('edit-container');

    let galleryContainer = document.createElement('div');
    galleryContainer.id = 'editGallery';
    files.forEach(file => previewFilesAsCanvas(file, galleryContainer));

    editContainer.innerHTML = `
        <div id="editHeader"> 
        </div>
        <div id="editContent">
        </div>
    `;

    let backBtn = document.createElement('a');
    backBtn.innerText = "< Назад";

    let downloadFiles = document.createElement('button');
    downloadFiles.innerText = "Скачать файлы";

    editContainer.querySelector('#editHeader').append(backBtn, downloadFiles);
    editContainer.querySelector('#editContent').append(galleryContainer, PhotoSettings());

    editContainer.querySelector('#editHeader a').addEventListener('click', () => {
        location.reload();
    });

    return editContainer;
}


export default EditGallery;