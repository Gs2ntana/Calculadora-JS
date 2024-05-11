let total = 0;
let buffer = "0"; /* armazem temporário*/
let operadorPrevio; /* armazenar o operador matemático previamente digitado pelo usuário */

const tela = document.querySelector('.tela'); /* Armazena o que aparece na tela */

function buttonClick(value){
    if(isNaN(value)){
        handleSymbol(value); /* : Se o valor não for um número, passa como argumento */
    }else{
        handleNumber(value); /* lida com a manipulação de números digitados pelo usuário. */
    }
    tela.innerText = buffer; /* atualiza a exibição na tela com os números ou operadores que foram digitados pelo usuário. */
}

function handleSymbol(symbol){
    switch(symbol){
        case 'C':
            buffer = '0';
            total = 0
            break;
        case '=':
            if(operadorPrevio === null){
                return
            }
            flushOperation(parseInt(buffer));
            operadorPrevio = null;
            buffer= total;
            break;
        case '←':
            if(buffer.length === 1){
                buffer = '0';
            }else{
                buffer = buffer.substring(0, buffer.length - 1)
            }
            break;
        case '+':        
        case '−':        
        case '×':        
        case '÷':    
            handleMath(symbol);
            break;    
    }
}

function handleMath(symbol){
    if(buffer === '0'){
        return;
    }

    const intBuffer = parseInt(buffer);

    if(total === 0){
        total = intBuffer;
    }else{
        flushOperation(intBuffer);
    }
    operadorPrevio = symbol;
    buffer = '0';
}

function flushOperation(intBuffer){
    if(operadorPrevio === '+'){
        total += intBuffer;
    }else if(operadorPrevio === '−'){
        total -= intBuffer;
    }else if(operadorPrevio === '×'){
        total *= intBuffer;
    }else if(operadorPrevio === '÷'){
        total /= intBuffer;
    }
}

function handleNumber(numberString){
    if(buffer === '0'){
        buffer = numberString;
    }else{
        buffer += numberString;
    }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();