fetch('./products.json')
.then(resp => resp.json())
.then(data=>{

    //elementi del dom
    const productWrapper = document.querySelector('#productWrapper');
    const categoriesFilterWrapper = document.querySelector('#categoriesFilterWrapper');
    const searchInput = document.querySelector('#searchInput');
    const minInputFilter = document.querySelector('#minInputFilter')
    const maxInputFilter = document.querySelector('#maxInputFilter')
    const orderInputs = document.querySelectorAll('.order-input');
    
    //funzioni
    function showProducts(products){
        productWrapper.innerHTML = '' 

        products.forEach(product => {
            let card = document.createElement('div');
            card.classList.add('col-12', 'col-sm-6', 'col-lg-4' , 'my-3')
            card.innerHTML = `
            <div class="card-header bg-car2 d-flex img-fluid p-0 ">
            </div>
            <div class="div-slides">
                <p>${product.type}</p>
                <a class="text-decoration-none text-black"href="./shop.html"><h5>${product.name}</h5></a>
                <h5 class="span-point fw-bold">${product.price}</h5>
            </div>
            `

            productWrapper.appendChild(card)

        });
    }

    function globalFilter(){
      
        let filteredByCategory = filterByCategory(data);

        let filteredBySearch = filterBySearch(filteredByCategory);

        let filteredByPrice = filterByPrice(filteredBySearch);

        let ordered = orderProducts(filteredByPrice);
        
        showProducts(ordered);
        
    }

    function filterByCategory(array) {
        //trovo la catergoria selezionata
        let categoriesFilter = document.querySelectorAll('.category-filter');
        categoriesFilter = Array.from(categoriesFilter);
        let selectedCategory = categoriesFilter.find(el => el.checked == true).id;
       
        if(selectedCategory == 'all'){
            return array;

        }

        let filtered = array.filter(el => el.type == selectedCategory )
       
        return filtered;
    }

    function filterBySearch(array) {
        let searched = searchInput.value.toLowerCase();
        let filtered = array.filter(product =>{
            if(product.name.toLowerCase().includes(searched)){
            return true
            }
        })
        return filtered;
        
    }
    
    function filterByPrice(array){
        let min = Number(minInputFilter.value);
        let max = Number(maxInputFilter.value);

        let prices = array.map(el => Number(el.price)).sort((a,b) => a - b);
              
        
        let productMin = Math.floor(prices[0]);
        let productMax = Math.ceil(prices[prices.length-1]);

        if(!min){
            min = productMin
        }

        if(!max){
            max = productMax
        }
        let filtered = array.filter(product => {
            if(Number(product.price) > min && Number(product.price) < max){
                return true
            }
        })
        return filtered;
    }

    function orderProducts(array){
        let selectedOrder = Array.from(orderInputs).find(el => el.checked == true).value;
        
        switch (selectedOrder) {
            case 'fromOld':
                return array.sort((a,b) => a.price - b.price);
            
            case 'fromNew':
               return array.sort((a,b) => b.price - a.price);

            case 'alphaAsc':
                return array.sort(function(a,b) {
                    let nameA = a.name.toUpperCase();
                    let nameB = b.name.toUpperCase();
                    if ( nameA < nameB){
                        return-1;
                    }
                    if ( nameA > nameB ){
                        return 1;
                    }
                });
            
            case 'alphaDec':
                return array.sort(function(a,b) {
                    let nameA = a.name.toUpperCase();
                    let nameB = b.name.toUpperCase();
                    if ( nameA > nameB){
                        return-1;
                    }
                    if ( nameA < nameB ){
                        return 1
                    }
                })
            
            default:
                break;
        }

    }
  

    function populateCategoriesFilter(){
        /* let categories = data.map(product =>{
            return product.type
        })

        let uniqueCategories = [];
        categories.forEach(category => {
            if(!uniqueCategories.includes(category)){
                uniqueCategories.push(category)
            }
        })
         */
        let categories = data.map(product =>{
            return product.type
        })
        
        let uniqueCategories = new Set(categories);
    
        uniqueCategories.forEach(category => {
            let div = document.createElement('div');
    
            div.classList.add('form-check');
    
            div.innerHTML = `
                <input class="form-check-input category-filter" type="radio" name="categoryFilter" id="${category}">
                <label class="form-check-label" for="${category}">
                    ${category}
                </label>
            `
    
            categoriesFilterWrapper.appendChild(div)
        })
    } 

    function attachFilterCategoryEvent(){
        let categoriesFilter = document.querySelectorAll('.category-filter');
        categoriesFilter.forEach(input => {
            input.addEventListener('input' , () =>{
              globalFilter();
            })
        })
    }

    //EVENTI
    searchInput.addEventListener('input' , () =>{
        searchInput.value = searchInput.value.trim();
        globalFilter();
    })

    minInputFilter.addEventListener('input' , ()=> {
        globalFilter();
    })
    maxInputFilter.addEventListener('input' , ()=> {
        globalFilter();
    })

    orderInputs.forEach(input =>{
        input.addEventListener('input' , () => {
            globalFilter();
        })
    })




    //INIZIALIZZAZIONE
    showProducts(data)
    populateCategoriesFilter()
    attachFilterCategoryEvent()
    

})
