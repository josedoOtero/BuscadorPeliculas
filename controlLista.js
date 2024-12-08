const contenedorPelis = document.querySelector("#contenedor_tarjetas");
let mode;
const listaGenerosBuscados = [];

/*BUSCAR POR TITULOS en la lista funcion*/

function findTitle(titulo){
    for(const peli of pelis){
        if(titulo === peli.Title){
            return peli
        }
    }

    return null;
}

/*Filtrado de peliculas*/
formulario.buscar.addEventListener("click", () => {
    mode = "";
    if (formulario.titulo.checked) mode += "title ";
    if (formulario.director.checked) mode += "director ";
    if (formulario.actor.checked) mode += "actors ";
    if(!formulario.actor.checked && !formulario.director.checked && !formulario.titulo.checked) mode = "title director actors";

    /* Lista de generos en busqueda*/
    listaGenerosBuscados.length = 0;

    for(const genero of listaGeneros.querySelectorAll("input[type='checkbox']")){
        if(genero.checked){
            listaGenerosBuscados.push(genero.value);
        }
    }

    if(listaGenerosBuscados.length === 0){
        for(const genero of listaGeneros.querySelectorAll("input[type='checkbox']")){
            listaGenerosBuscados.push(genero.value);
        }
    }
    console.log(listaGenerosBuscados);

    contenedorPelis.innerHTML = "";

    for (const peli of pelis) {
        let mostrar = false;


        if ((mode.includes("title") && peli.Title.toLowerCase().includes(formulario.texto_busqueda.value.toLowerCase())) ||
            (mode.includes("director") && peli.Director.toLowerCase().includes(formulario.texto_busqueda.value.toLowerCase())) ||
            (mode.includes("actors") && peli.Actors.toLowerCase().includes(formulario.texto_busqueda.value.toLowerCase()))) {
            mostrar = true;
        }

        if (mostrar && formulario.pais.value && !peli.Country.includes(formulario.pais.value)) {
            mostrar = false;
        }

        const anoInicio = parseInt(formulario.ano_inicio.value) || 0;
        const anoFin = parseInt(formulario.ano_fin.value) || new Date().getFullYear();
        const anoPeli = parseInt(peli.Year);

        if (mostrar && (isNaN(anoPeli) || anoPeli < anoInicio || anoPeli > anoFin)) {
            mostrar = false;
        }

        if (listaGenerosBuscados.every((genero) => !peli.Genre.includes(genero))) {
            mostrar = false;
        }

        /*Mostrar pelis ya despues de haver filtrado*/

        if (mostrar) {
            const listaGeneros = peli.Genre ? peli.Genre.split(", ") : [];
            const nuevaTarjeta = document.createElement("div");
            nuevaTarjeta.classList.add("tarjeta");

            nuevaTarjeta.innerHTML = `
                <h3 class="mx-auto w-100 m-4">${peli.Title}</h3>
                <img src="${peli.Images?.[0] || 'placeholder.jpg'}" alt="${peli.Title}" class="mx-auto m-4 p-1 bg-dark rounded-3 shadow-lg w-25">
                <p class="bg-warning p-2 m-4 mx-auto rounded-3" style="width: 300px; text-align: center;">
                    ${listaGeneros[0] || '   '} | ${listaGeneros[1] || '   '} | ${listaGeneros[2] || '   '}
                </p>
            `;

            nuevaTarjeta.classList.add(
                "d-flex",
                "flex-column",
                "justify-content-center",
                "align-content-center",
                "align-items-center",
                "bg-info",
                "p-4",
                "m-4",

            );

            /*Control de boton detalles*/
            const detalles = document.createElement("button");
            detalles.textContent = "Detalles";

            detalles.addEventListener("click", (e) => {

                const tarjeta = e.target.parentElement;
                const paginaDetalle = document.createElement("div");


                paginaDetalle.innerHTML = `
                <input type="number" id="nota" class="form-control w-50 mx-auto my-3" value="${findTitle(tarjeta.querySelector("h3").textContent).imdbRating}">
                <button id="update" class="btn btn-warning w-50 mx-auto my-3 d-block">Actualizar</button>
    `;

                const existingDetail = tarjeta.querySelector("div");
                if (existingDetail) {
                    existingDetail.remove();
                }

                let texto = JSON.stringify(findTitle(tarjeta.querySelector("h3").textContent));
                texto = texto.replace(/\n/g, "<br>");
                paginaDetalle.innerHTML += texto;

                paginaDetalle.classList.add(
                    "bg-white",
                    "p-4",
                    "m-4",
                    "rounded-2",
                    "border",
                    "border-dark",
                    );

                tarjeta.appendChild(paginaDetalle);

                paginaDetalle.querySelector("#update").addEventListener("click", () => {
                    let notaNueva = paginaDetalle.querySelector("#nota").value;

                    if(notaNueva > 0 && notaNueva <= 10){
                        const peli = findTitle(tarjeta.querySelector("h3").textContent);
                        peli.imdbRating = notaNueva;
                    }
                });
            });

            nuevaTarjeta.appendChild(detalles);
            contenedorPelis.appendChild(nuevaTarjeta);
        }
    }
});