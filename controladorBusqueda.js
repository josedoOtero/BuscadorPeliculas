const formulario = document.forms["busqueda"];
const listaGeneros = document.querySelector("#contenedor_generos");
const ano = new Date();

/*Cargar Paises*/

for(let pais of countries){
    const nuevoOption = document.createElement("option");
    nuevoOption.value = pais;
    nuevoOption.textContent = pais;

    formulario.pais.appendChild(nuevoOption);
}

/*Cargar Generos*/

for(let genero of genders){
    const nuevoChecBox = document.createElement("input");
    nuevoChecBox.setAttribute("type", "checkbox");
    nuevoChecBox.value = genero;

    listaGeneros.appendChild(nuevoChecBox);
    listaGeneros.innerHTML += `${genero} `;
}



/*Cargar anos Inicio*/

for(let anoVar = 2001; anoVar <= ano.getFullYear(); anoVar++){
    nuevoSelect = document.createElement("option");
    nuevoSelect.value = anoVar;
    nuevoSelect.textContent = anoVar;

    formulario.ano_inicio.appendChild(nuevoSelect);
}

/*Cargar anos Fin*/

formulario.ano_inicio.addEventListener("change", ()=>{
    for(let anoVar = formulario.ano_inicio.value; anoVar <= ano.getFullYear(); anoVar++){
        nuevoSelect = document.createElement("option");
        nuevoSelect.value = anoVar;
        nuevoSelect.textContent = anoVar;

        formulario.ano_fin.appendChild(nuevoSelect);
    }
});

/*Marcado de los ChecBox*/

listaGeneros.addEventListener("click", (e) => {
    if (e.target.type === "checkbox" && e.target.value === "todos") {
        for (let genero of listaGeneros.querySelectorAll("input[type='checkbox']")) {
            genero.checked = true;
        }
    }else if(e.target.type === "checkbox"){
        listaGeneros.querySelector("input[type='checkbox']").checked = false;
    }
});
