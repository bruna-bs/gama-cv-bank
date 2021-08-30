const form = document.querySelector('form')
const inputCep = document.querySelector('input[name="CEP"]')
const inputSubmit = document.querySelector('button[type="submit"]')
const allCepFields = document.querySelectorAll('.cep')

function handleSubmit(boolean) {
    inputSubmit.style.borderColor = boolean  ? null : 'red'
    inputSubmit.disabled = !boolean
}

function handleCepFields(boolean) {
    allCepFields.forEach(item => {
        boolean 
            ? item.style.display = 'block'
            : item.style.display = 'none'
    })
    
    inputCep.style.borderColor = boolean ? null : 'red';
    inputSubmit.disabled = !boolean;
}

function searchCep(cep) {
    fetch(`https://cors-anywhere.herokuapp.com/http://viacep.com.br/ws/${cep}/json/`)
    .then(function(response) {
        const response = response.json();
        console.log('response 1:\n', response)
        return response
    })
    .then(data => {
        const CepArray = Object.entries(data)
        console.log('CepArray:\n', CepArray)
        CepArray.forEach(([key, value]) => {
            let input = document.querySelector(`input[name="${key}"]`)
            if (input) input.value = value;
        })
        
        handleCepFields(true)
        
    })
    .catch(err => {
        console.log('deu pau', new Error(err))
        inputCep.style.borderColor = 'red';
        handleCepFields(false)
    })
}

function validation(array) {
    const errors = []
    array.forEach(name => {
        let input = document.querySelector(`input[name="${name}"]`)
        if (!input) {
            errors.push(name)
            handleSubmit(false)
        }

        if(!Boolean(input.value)) { 
            // handleSubmit(false) //
            input.style.borderColor = 'red';
            errors.push(name)
            handleSubmit(false)
        }
        
        // console.log(`passou`)
        // console.log(input.value)
        handleSubmit(true)
    })
    
    const result = errors.length ? false : true
    if (!result) return result
    
    array.forEach(name => {
        let input = document.querySelector(`input[name="${name}"]`)
        input.style.borderColor = null;
    })
    
    return result
}

//Eventos
form.addEventListener('submit', function(event) {
    event.preventDefault();

    const validate = [
        "profissao",
        "nome",
        "aniversario",
        "CEP",
        "celular",
        "e-mail",
        "contato"
    ]

    if(!validation(validate)) {
        console.log('Não pasosu na validação')
        // handleSubmit(false)
        return false
    }

    console.log('Passou na validação')
    

})

inputCep.addEventListener('change', function(event) {
    searchCep(event.target.value)
})

/** 
 * @todo: validar:
 * CPF,
 *  Nome,
 *  Data Nascimento,
 *  Cep,
 *  Logradouro,
 *  Número,
 *  Bairro,
 *  Cidade,
 *  Email,
 *  Profissão
 * e Celular
 */