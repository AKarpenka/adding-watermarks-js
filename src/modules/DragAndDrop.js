import EditGallery from "../pages/editGallery/EditGallery";
import { previewFileAsImg } from '../components/previewFile/PreviewFile';
import { ShowSpinner, RemoveSpinner } from "../components/spinner/Spinner";

let dropArea = document.getElementById('drop-area'),
    fileElem = document.getElementById('fileElem'),
    maxCountOfPhoto = document.getElementById('maxCountOfPhoto'),
    form = document.getElementById('formAction'),
    gallery = document.getElementById('gallery'),
    nextBtn = document.getElementById('nextBtn'),
    app = document.querySelector('#app');

fileElem.addEventListener('change', handleFiles);
nextBtn.addEventListener('click', openNextPage);

let totalFiles = [];

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false);

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight() {
    dropArea.classList.add('highlight');
}

function unhighlight() {
    dropArea.classList.remove('highlight');
}

function handleDrop(e) {
    let dt = e.dataTransfer;
    let files = dt.files;

    handleFiles(files);
}

// uploading or updating files: 
// data.target - files from computer
// data = files - files from drag
// delete - do not get any files, only delete the existing one
function handleFiles(data) {
    let newFiles = [];
    if (data !== 'delete') {
        let files;
        if ('target' in data) {
            files = data.target?.files;
        } else {
            files = data;
        }

        files = [...files];
        files.forEach(file => {
            if (totalFiles.length < 9) {
                totalFiles.push(file);
                newFiles.push(file);
            } 
        });
    }

    //show/hide block for file selection and warning message
    if(totalFiles.length >= 9) {
        maxCountOfPhoto.style.display = "block";
        form.style.display = "none";
    } else {
        maxCountOfPhoto.style.display = "none";
        form.style.display = "block";
    }

    if(totalFiles.length > 0) {
        nextBtn.disabled = false;
    } else {
        nextBtn.disabled = true;
    }

    ShowSpinner();
    //update preview
    if (data !== 'delete') {
        newFiles.forEach(file => previewFileAsImg(file, gallery, handleDelete));
    } else {
        gallery.innerHTML = "";
        totalFiles.forEach(file => previewFileAsImg(file, gallery, handleDelete));
    }
    RemoveSpinner();
}

function handleDelete(e) {
    e.preventDefault();
    const id = e?.target?.parentNode?.parentNode?.parentNode?.childNodes[0]?.id;
    totalFiles.splice(totalFiles.findIndex(file => file.lastModified == id),1);
    handleFiles('delete');
}

function openNextPage() {
    app.innerHTML = "";
    app.appendChild(EditGallery(totalFiles));
}