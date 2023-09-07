import './EditGallery.css';
import PhotoSettings from '../../components/photoSettings/PhotoSettings';
import { previewFilesAsCanvas } from '../../components/previewFile/PreviewFile';

const EditGallery = (files, settings = {
    'text': "",
    'fontSize': 0,
    'transparency': 0,
    'position': 0
}) => {
    let editContainer = document.createElement('div');
    editContainer.classList.add('edit-container');

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

    let galleryContainer = document.createElement('div');
    galleryContainer.id = 'editGallery';
    files.forEach(file => previewFilesAsCanvas(file, galleryContainer, settings));

    editContainer.querySelector('#editHeader').append(backBtn, downloadFiles);
    editContainer.querySelector('#editContent').append(galleryContainer, PhotoSettings(files));

    editContainer.querySelector('#editHeader a').addEventListener('click', () => {
        location.reload();
    });

    return editContainer;
}


export default EditGallery;