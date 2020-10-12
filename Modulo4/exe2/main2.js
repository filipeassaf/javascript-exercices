var createUl = document.createElement('ul');
var containerApp = document.querySelector('#app');
var containerList = document.querySelector('#list');

function adicionar() {

    var inputText = document.querySelector('#app input');
    renderRepo(inputText.value);
    inputText.value = '';

}     

function renderRepo(userRepo){    

    loading();

    axios.get('https://api.github.com/users/'+userRepo+'/repos')
    .then(function(response) {

        createUl.innerHTML = '';
    
        for (var i = 0; i < response.data.length; i++) {
    
            var createLi = document.createElement('li');
            var textElement = document.createTextNode(response.data[i].name);
            createLi.appendChild(textElement);
            createUl.appendChild(createLi);
    
        }     
    
        containerList.appendChild(createUl);

        loading(false);
    
    })
    .catch(function(error) {
        //console.warn(error);

        loading(false);
        repoError();

        setTimeout(function(){
            repoError(false);
        },500);          

    });   

}

function loading(p_verifica = true){

    if (p_verifica === true){

        var createSpam1 = document.createElement('spam');
        var textElement1 = document.createTextNode('Carregando...');
        createSpam1.setAttribute('id','loading');
        createSpam1.appendChild(textElement1);
        containerApp.appendChild(createSpam1);

    } else {
        document.getElementById('loading').remove();
    }

}

function repoError(p_verifica = true){

    if (p_verifica === true){

        var createSpam2 = document.createElement('spam');
        var textElement2 = document.createTextNode('Repositório não encontrado!');
        createSpam2.setAttribute('id','repoerror');
        createSpam2.appendChild(textElement2);
        containerApp.appendChild(createSpam2);

    } else {
        document.getElementById('repoerror').remove();
    }

}
