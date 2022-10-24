// const { Destination } = require("../models");
const KEY = "9F6mguTnJtDRAlfzGfzrDcZN_rRWYq3-Y9f6-obW80Y";

// Start app
loadImgs();
addEventListeners();

// Functions
function loadImgs() {
    const containers = document.querySelectorAll(".containers");
    containers.forEach((obj) => {
        loadImg(obj);
    });
};

function loadImg(obj) { // obj should be the parent ".container" node
    const searchKey = obj.children[1].children[0].children[0].textContent; // #destination.textContent

    const url = `https://api.unsplash.com/photos/random?query=${searchKey}&per_page=50&page=1&client_id=${KEY}`;
    //const url = "";

    unsplashAPICall(url).then(data => {
        let img_result = data.urls.thumb;
        let image_element = document.createElement('img');
        
        image_element.src = img_result;

        obj.children[0].appendChild(image_element);
    });

    // inner functions
    async function unsplashAPICall(url) {
        const request = await fetch(url);
        const data = await request.json();
        return data;
    };
};

function addEventListeners() {
    activateEditButtons();
    activateRemoveButtons();

    // document.querySelectorAll('.btn-remove').forEach(button => {
    //     button.addEventListener('click', removeEntry(button));
    // });
};

function activateEditButtons() { // obj is expected to be .container
    const editBtns = document.querySelectorAll(".btn-edit");
    const buttonClassPrefix = "btn-edit-"
    let property;

    editBtns.forEach(button => {
        if (button.classList.contains(buttonClassPrefix + "destination")) {
            property = "destination";
        } else if (button.classList.contains(buttonClassPrefix + "location")) {
            property = "location";
        } else { // description
            property = "description";
        };
        button.addEventListener('click', (e) => editContents(e.target, property), false)
    });
};

// edit post
function editContents(obj, property) { // obj is expected to be .btn-edit
    console.log('hey')
    // const declaration
    const obj_container = obj.parentNode.parentNode.parentNode; 
    const obj_id = obj_container.dataset.db_id; // this doesn't work with IE versions earlier than IE 11. Would need to change to account for that
    const updatedContent = prompt("Enter desired update");

    obj.previousElementSibling.textContent = updatedContent;
    
    /* once user clicks outside of input textbox do the below */
    // $.ajax({ // check this call for bugs as needed. JS doesnt autofill for .ajax but does for other functions starting with .ajax
    //     method: "PUT",
    //     url: `/api/destination/update/${obj_id}`,
    //     data: { property: updatedContent },
    // }).done(() => {
    //     console.log(`${obj_id} has been edited.`)
    // });
        
    if (property === "destination") {
        loadImg(obj_container);
    };
};

function activateRemoveButtons() { // obj is expected to be .container
    const removeBtns = document.querySelectorAll(".btn-remove");
    
    removeBtns.forEach(button => {
        button.addEventListener('click', removeEntry(button));
    });
};

function removeEntry(obj) { // obj is expected to be .btn-remove node
    const parent_node = obj.parentNode.parentNode;

    // $.ajax({
    //     url: `/api/destination/delete/${parent_node.dataset.db_id}`,
    //     type: 'DELETE',
    // }).done(() => {
    //     () => console.log(`${parent_node.dataset.db_id} deleted from database.`);
    // });

    parent_node.remove();
};

// vvv CAN MOST LIKELY BE DELETED vvv

// function displayPost(postObj) {
//     // declare variables
//     const post = JSON.parse(postObj);
//     const postsDiv = document.querySelector("#posts-content");
//     const containersDiv = createDiv();
//     const imageSectionDiv = createDiv();
//     const imageInfo = createDiv();
//     const titleDiv = document.createElement("h1");
//     const locationDiv = document.createElement("h3");
//     const contentPara = document.createElement("p");
//     const buttonsDiv = createDiv();
//     const editBtn = document.createElement("button");
//     const removeBtn = document.createElement("button");

//     // add class
//     containersDiv.classList.add("containers");
//     imageSectionDiv.classList.add("image-section");
//     imageInfo.classList.add("image-info");
//     buttonsDiv.classList.add("img-btns");
//     editBtn.classList.add("btn-edit");
//     removeBtn.classList.add("btn-remove");
            
//     // change textContent
//     titleDiv.textContent = post.title;
//     locationDiv.textContent = post.dest_location;
//     contentPara.textContent = post.description;
//     editBtn.textContent = "Edit";
//     removeBtn.textContent = "Remove";

//     // add id
//     containersDiv.id = "container-" + post.post_id;

//     // appendChild
//     buttonsDiv.appendChild(editBtn);
//     buttonsDiv.appendChild(removeBtn);
//     imageInfo.appendChild(titleDiv);
//     imageInfo.appendChild(locationDiv);
//     imageInfo.appendChild(contentPara);
//     imageInfo.appendChild(buttonsDiv);
//     containersDiv.appendChild(imageSectionDiv);
//     containersDiv.appendChild(imageInfo);
//     postsDiv.appendChild(containersDiv);

//     // add eventListener
//     // editBtn.addEventListener('click', (e) => editContents(e.target))
//     removeBtn.addEventListener('click', (e) => removeEntry(e.target))

//     // function calls
//     loadImg(imageSectionDiv, post.title, true);
// }

// Helper Functions
// function createDiv() {
//     return document.createElement("div");
// }