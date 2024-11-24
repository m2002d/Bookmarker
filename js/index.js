var siteNameInput = document.getElementById('siteName');
var siteURLInput = document.getElementById('siteURL');
var contentBody = document.getElementById('contentBody');


var siteList = [];

if(localStorage.getItem('bookmarkList') !== null){
    siteList = JSON.parse(localStorage.getItem('bookmarkList'));
    displaySiteList();
}

function addSite() {
    var siteObj = 
    {
        siteName: siteNameInput.value,
        siteURL: siteURLInput.value,
    };
    
    var urlPattern = /^(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&amp;=]*)?$/;
    if(siteNameInput.value !== '' && siteURLInput.value !== ''){ // check if user entered site name and URL
        if(siteList.length > 0)
        {
            if(urlPattern.test(siteObj.siteURL)){  // Test URL is valid or not
                for (let i = 0; i < siteList.length; i++) { 
                   
                    if(siteList[i].siteURL === siteObj.siteURL) // Check if already added or not
                    { 
                       alert('This URL 🔗 already exists.');
                       break;
                    }
                    else // if not add then add it
                    { 
                       siteList.push(siteObj);
                       localStorage.setItem('bookmarkList' , JSON.stringify(siteList));
                       displaySiteList();
                       clearForm();
                       break;
                    }
                }
            }else  // If URL is not valid
            {
               alert('It seems the URL you entered might not be valid. Please check it and try again. Make sure it starts with "http://" or "https://". 😊');
            }
        }
        else
        {   
            alert('Add first item');
            siteList.push(siteObj);
            localStorage.setItem('bookmarkList' , JSON.stringify(siteList));
            displaySiteList();
            clearForm();
        }
    }
    else{ // If Name and URL are not entered
        alert('Please enter a Site Name & Site URL 🧐');
    }
}

function displaySiteList() {
    var cartona = '';
    for (var i = 0; i < siteList.length ; i++){
        cartona += 
        `<tr>
            <th scope="row">${i+1}</th>
            <td class="text-capitalize">${siteList[i].siteName}</td>
            <td><a href="${siteList[i].siteURL}" target="_blank"><button type="button" class="btn btn-visit"><i class="fa-solid fa-eye pe-1"></i>Visit</button></a></td>
            <td><button type="button" class="btn btn-danger"  onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button> </td>
        </tr>`
    }
    contentBody.innerHTML = cartona;
}

function deleteSite(index){
    siteList.splice(index, 1);
    localStorage.setItem('bookmarkList', JSON.stringify(siteList));
    displaySiteList();
}

function clearForm(){
    siteNameInput.value = null;
    siteURLInput.value = null;
}
