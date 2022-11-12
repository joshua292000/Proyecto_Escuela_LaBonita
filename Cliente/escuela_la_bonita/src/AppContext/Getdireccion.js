

export class PaisService {

    getPais() {
        return fetch("Paises.json",{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
        .then(res => res.json())
        .then(d => d.data);
    }
}

export class ProvinciaService {

    getProvincia() {
        return fetch("Provincias.json",{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
        .then(res => res.json())
        .then(d => d.data);
    }
}

export class CantonService {

    getCanton() {
        return fetch("Cantones.json",{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
        .then(res => res.json())
        .then(d => d.data);
    }
}
export class DistritoService {

    getDistrito() {
        return fetch("Distrito.json",{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
        .then(res => res.json())
        .then(d => d.data);
    }
}