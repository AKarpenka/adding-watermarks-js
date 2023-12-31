import './EditGallery.css';
import PhotoSettings from '../../components/photoSettings/PhotoSettings';
import { previewFilesAsCanvas } from '../../components/previewFile/PreviewFile';
import { ShowSpinner, RemoveSpinner } from '../../components/spinner/Spinner';

const EditGallery = (files, settings = {
    'text': "",
    'fontSize': 0,
    'transparency': 0,
    'position': 0
}) => {
    let editContainer = document.createElement('div');

    editContainer.innerHTML = `
        <div id="editHeaderContainer">
            <div id="editHeader"></div>
        </div>    
        <div id="editContentContainer">
            <div id="editContent"></div>
        </div>

    `;

    let backBtn = document.createElement('a');
    backBtn.innerText = "< Back";

    let downloadFiles = document.createElement('button');
    downloadFiles.id = "downloadFiles"
    downloadFiles.innerText = "Download files";

    ShowSpinner();
    let galleryContainer = document.createElement('div');
    galleryContainer.id = 'editGallery';
    files.forEach(file => previewFilesAsCanvas(file, galleryContainer, settings, 'textWattermark'));
    RemoveSpinner();
    
    editContainer.querySelector('#editHeader').append(backBtn, downloadFiles);
    editContainer.querySelector('#editContent').append(galleryContainer, PhotoSettings(files));

    editContainer.querySelector('#editHeader a').addEventListener('click', () => {
        location.reload();
    });

    editContainer.querySelector('#downloadFiles').addEventListener('click', () => {
        let filesForDownload = document.querySelectorAll('.img-container>img');
        filesForDownload.forEach((file, i) => {
            downloadImage(file?.currentSrc, `img-${i+1}`)
                .then(() => {
                    console.log('The image has been downloaded');
                })
                .catch(err => {
                    console.log('Error downloading image: ', err);
                });
        });
        
    });

    async function downloadImage(
        imageSrc,
        nameOfDownload = 'my-image.png',
    ) {
        const response = await fetch(imageSrc);
        const blobImage = await response.blob();
        const href = URL.createObjectURL(blobImage);
      
        const anchorElement = document.createElement('a');
        anchorElement.href = href;
        anchorElement.download = nameOfDownload;
      
        document.body.appendChild(anchorElement);
        anchorElement.click();
      
        document.body.removeChild(anchorElement);
        window.URL.revokeObjectURL(href);
      }

    return editContainer;
}


export default EditGallery;