const { between } = require("sequelize/types/lib/operators");

window.onload = function () {
    let titulo = document.querySelector('.moviesAddTitulo')
    let formulario = document.querySelector('#formulario');
    let article = document.querySelector('article');
    let input_title = document.querySelector('.inputTitle');
    let inputs = document.querySelector('.input');
    let form = document.querySelector('form');
    let listErrores = document.querySelector('.errores');
    const errores = {};

    const isEmpty = function (elmento) {
        MediaElementAudioSourceNode.value == ""
    };

    const between = function (value, min, max) {
        return value >= min && value <= max;
    };

    const addError = function (elemento, mensaje) {
        elemento.classList.add("isInvalid");
        errores[elemento.name] = mensaje;
        const child = document.querySelector(`#Error${elemento.name}`);
        const tag = document.createElemento("li");
        tag.innerTex = mensaje;
        child ? listErrores.replaceChild(tag, child) : listErrores.appendChild(tag);
    };

    const removeErrores = function (elemento) {
        elemento.classList.remove("isInvalid");
        elemento.classList.add("isInvalid");
        delete errores[elemento.name];
        const child = document.querySelector(`#Error${elemento.name}`);
        child ? listErrores.removeChild(child) : null;
    };

    const validate = function (elemento, e) {
        console.log("evento: ", e);

        if (isEmpty(elemento)) {
            let mensaje = `El input ${elemento.name} no puede estar vacio`;
            e.type == "blur"
                ? addMessage(elemento, mensaje)
                : addError(elemento, mensaje);
            return;
        }

        if (elemento.name == "awards" || elemento.name == "rating") {
            if (!between(elemento.value, 0, 10)) {
                let mensaje = `El campo ${elemento.name} debe contener un valor entre 0 y 10`;
                e.type == "blur"
                    ? addMessage(elemento, mensaje)
                    : addError(elemento, mensaje);
                return;
            }
        } else if (elemento.name == "length") {
            if (!between(elemento.value, 60, 360)) {
                let mensaje = `El campo ${elemento.name} debe contener un valor entre 60 y 360`;
                e.type == "blur"
                    ? addMessage(elemento, mensaje)
                    : addError(elemento, mensaje);
                return;
            }
        }

        removeError(elemento);

        return;
    };




    titulo.innerHTML = 'AGREGAR PELÍCULA';
    titulo.classList.add('titulo');
    article.classList.add('fondoTransparente');
    formulario.classList.add('fondoCRUD');

    //------DESDE AQUÍ CONTINÚE CON LAS VALIDACIONES DEL FORMULARIO //
    //-------------------DE REGISTRO DE PELÍCULAS------------------//    
    input_title.focus();
    inputs.forEach((node) => {
        node.addEventListener("blur", function (e) {
            validate(this);
        });
    });

    form.addEventListener("submit", function (e) {
        inputs.forEach(elemento => {
            validate(elemento);
        })
        if (Object.keys(errores).length > 0) {
            e.preventDefault();
        }
    });
};