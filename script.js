const row = document.getElementById('row');
const page = document.getElementById('pagination');
const url = 'https://hp-api.onrender.com/api/characters';

let current_page = 1;
const page_items = 40;

//fetch data from API
async function fetchData() {
    let responce= await fetch(url);
    let data = await responce.json().catch((error)=>console.log('Oops Error!!! : '+error));
       
            DisplayList(data, row, page_items, current_page);
            SetupPagination(data, page, page_items);
      
        
}

//displaying data 
function DisplayList(items, wrapper, rows_per_page, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page;
    let end = start + rows_per_page;
    let paginatedItems = items.slice(start, end);

    paginatedItems.map((data) => {
        wrapper.innerHTML += `
                            <div class="col-12 col-lg-3 col-md-4 col-xl-3 col-xxl-3" id="column">
                                <div class="card mt-2 text-center">
                                <div class="card-header bg-info-subtle text-center">
                                    <h3>${data['name']}</h3>
                                </div>
                                <div class="card-body">
                                    <div class="card-text">Actor : ${data.actor}</div>
                                    <div class="card-text">Species : ${data.species}</div>
                                    <div class="card-text">Eye Colour : ${data['eyeColour']}</div>
                                    <div class="card-text">Hair Colour : ${data['hairColour']}</div>
                                </div>
                            </div> `
    })
}

//creating pagination buttons
function SetupPagination(items, wrapper, rows_per_page) {
    wrapper.innerHTML = "";

    let page_count = Math.ceil(items.length / rows_per_page);
    for (let i = 1; i < page_count + 1; i++) {
        let btn = PaginationButton(i, items);
        wrapper.appendChild(btn);
    }
}

//function for pagination button
function PaginationButton(page, items) {
    let button = document.createElement('button');
    button.innerText = page;

    if (current_page == page) button.classList.add('active');

    button.addEventListener('click', function () {
        current_page = page;
        DisplayList(items, row, page_items, current_page);

        let current_btn = document.querySelector('button.active');
        current_btn.classList.remove('active');

        button.classList.add('active');
    });

    return button;
}



fetchData();