var siteNameInput = document.getElementById('siteNameInput');
var siteURLInput = document.getElementById('siteURLInput');
var contentBody = document.getElementById('contentBody');


var siteList = [];
// Check If LocalStorage isNotEmpty
if (localStorage.getItem('bookmarkList') !== null) {
    siteList = JSON.parse(localStorage.getItem('bookmarkList'));
    displaySiteList();
}
// Add Bookmark Function
function addSite() {
    var siteObj =
    {
        siteName: siteNameInput.value,
        siteURL: siteURLInput.value,
    };

    if ( validation(siteNameInput) && validation(siteURLInput) ) {
        // Check URL Is Added Already Or Not 
        var isUrlExists = siteList.some(site => site.siteURL === siteURLInput.value);
        if(isUrlExists) {
            alert(`This URL "${siteURLInput.value}" 🔗 already added.`);
            return;
        }
        siteList.push(siteObj);
        localStorage.setItem('bookmarkList', JSON.stringify(siteList));
        displaySiteList();
        clearForm();
    }
}
// Validation Function
function validation(ele) {
    var Regex = {
        siteNameInput: /^[a-zA-Z_]{3,12}$/gi,
        siteURLInput: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/g,
    }

    if (Regex[ele.id].test(ele.value)) {
        ele.classList.add('is-valid');
        ele.classList.remove('is-invalid');
        ele.nextElementSibling.classList.replace('d-block', 'd-none');
        return true;
    }
    else {
        ele.classList.remove('is-valid');
        ele.classList.add('is-invalid');
        ele.nextElementSibling.classList.replace('d-none', 'd-block');
        return false;
    }

}
// Display Function
function displaySiteList() {
    var cartona = '';
    for (var i = 0; i < siteList.length; i++) {
        cartona +=
            `<tr>
            <th scope="row">${i + 1}</th>
            <td>${siteList[i].siteName}</td>
            <td><a href="${siteList[i].siteURL}" target="_blank"><button type="button" class="btn btn-visit"><i class="fa-solid fa-eye pe-1"></i>Visit</button></a></td>
            <td><button type="button" class="btn btn-danger"  onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button> </td>
        </tr>`
    }
    contentBody.innerHTML = cartona;
}
// Delete Function
function deleteSite(index) {
    siteList.splice(index, 1);
    localStorage.setItem('bookmarkList', JSON.stringify(siteList));
    displaySiteList();
}
// Clear Input Field After Added
function clearForm() {
    siteNameInput.value = null;
    siteURLInput.value = null;
}
