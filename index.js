const selectBrands = document.getElementById('select-brands');
const modelBrands = document.getElementById('select-models');
const name1 = document.getElementById('name');
const image1 = document.getElementById('image');
const storage1 = document.getElementById('storage');
const releasedate1 = document.getElementById('release-date');
const dimension1 = document.getElementById('dimension');
const brand1 = document.getElementById('brand');




const getBrands = async function () {
    try {
        const response = await fetch('https://phone-specs-api.azharimm.dev/brands', {
            method: 'GET',
        });

        const datos = await response.json(); //para convertir en objeto JavaScript
        const brands = datos.data;
        console.log(datos);
        console.log("Esto es" + brands);

        let brandOptions = ''; //construyo la lista de opciones del select
        for (let i = 0; i < brands.length; i++) {
            brandOptions += `<option value="${brands[i].brand_slug}">${brands[i].brand_name}</option>`;
            console.log(brandOptions);
        }

        selectBrands.innerHTML = brandOptions;

    } catch (error) {
        console.error('Error:', error);
    }
}

// // //Ahora hago el código para cuando cambia el valor del brand -- es un change el evento

selectBrands.addEventListener('change', async function (event) {
    const brandSlug = event.target.value;
    console.log(brandSlug);
    updateModels(brandSlug);

});

const updateModels = async function (brandSlug) {
    try {
        console.log("Ha elegido: "+brandSlug);
        const response = await fetch(`https://phone-specs-api.azharimm.dev/brands/${brandSlug}`, {
        method: 'GET',});

        console.log(response);
        const datos = await response.json();
        const brands = datos.data.phones;

        console.log(datos);
        console.log("Esto es" + brands);
        let optionsModel = ''; //construyo la lista de opciones del select
        
        for (let i = 0; i < brands.length; i++) {
            optionsModel += `<option value="${brands[i].slug}">${brands[i].phone_name}</option>`;
            console.log(optionsModel);
        }

        modelBrands.innerHTML = optionsModel;

        console.log("Esto es: " + optionsModel);

    } catch (error) {
        console.error('Error:', error);
    }
};


modelBrands.addEventListener('change', async function (event) {
    const slug = event.target.value;
    console.log(slug);
    informacionGeneral(slug);

});

//La función que actualiza la página web. 


const informacionGeneral = async function (slug) {
    try {
        console.log("Ha elegido: "+slug);
        const response = await fetch(`https://phone-specs-api.azharimm.dev/${slug}`, {
        method: 'GET',});

        console.log(response);
        const datos = await response.json();
        console.log(datos);

        const brand = datos.data.brand;
        console.log("Esto es: " + brand);
        //Hacer algo para show y hide pannel
        brand1.innerHTML=brand;

        const phone_name = datos.data.phone_name;
        console.log("Esto es: " + phone_name);
        name1.innerHTML=phone_name;

        
        const release_date = datos.data.release_date;
        console.log("Esto es: " + release_date);
        releasedate1.innerHTML=release_date;

        
        const storage = datos.data.storage;
        console.log("Esto es: " + storage);
        storage1.innerHTML=storage;

        const dimension = datos.data.dimension;
        console.log("Esto es: " + dimension);
        dimension1.innerHTML=dimension;

        const imagen = datos.data.phone_images[0];
        console.log("Esto es: " + imagen);
        //image1.src=imagen;


        console.log(datos.data.phone_images.length)
        
        if (datos.data.phone_images.length===0)
        {
            image1.src="https://t3.ftcdn.net/jpg/03/34/83/22/360_F_334832255_IMxvzYRygjd20VlSaIAFZrQWjozQH6BQ.jpg"; 
        }else{
            image1.src=imagen;
        }        
        
    } catch (error) {
        console.error('Error:', error);
    }
};





getBrands();


