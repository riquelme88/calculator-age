let inputs = document.querySelectorAll('.inputs input')
let yearText = document.querySelectorAll('.result-age div')
let p = document.querySelectorAll('label p')

let date = new Date()
function bissexto (ano){
    if(ano % 4 == 0 && ano % 100 != 0 || ano % 400 == 0){
        return 1
    }else{
        return 0 
    }
}

function validDate(d,m,a){

    if(d < 1 || d > 31){
        inputs[0].style.border = '1px solid red'
        p[0].innerHTML = 'Must be a valid day'
        inputs.forEach(item =>{
            itemId = item.id
            if(item.value == ''){
                item.style.border = '1px solid red'
                p.forEach(data=>{
                    let dataset = data.dataset.base
                    if(itemId == dataset){
                        data.innerHTML = 'The fields is required'
                    }
                })
            }
        })
        return 0
    }
    if( m < 1 || m > 12){
        inputs[1].style.border = '1px solid red'
        p[1].innerHTML = 'Must be a valid Month'
        inputs.forEach(item =>{
            itemId = item.id
            if(item.value == ''){
                item.style.border = '1px solid red'
                p.forEach(data=>{
                    let dataset = data.dataset.base
                    if(itemId == dataset){
                        data.innerHTML = 'The fields is required'
                    }
                })
            }
        })
        return 0
    }
    if(a < 0){
        inputs[2].style.border = '1px solid red'
        console.log('ola')
        return 0
    }
     if(d == 31 && (m == 4 || m == 6 || m == 9 || m == 11)){
        inputs[0].style.border = '1px solid red'
        p[0].innerHTML = 'Must be a valid day'
        return 0
    }
     if(m == 2 && d > 29){
        inputs[0].style.border = '1px solid red'
        p[0].innerHTML = 'Must be a valid day'
        return 0
    }
     if(m == 2 && d == 29 && bissexto(a) == 0){
        inputs[0].style.border = '1px solid red'
        p[0].innerHTML = 'Must be a valid day'
        return 0
    }else{
        return 1
    }

}

function nameDays (m,a){
    if(m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12){
        return 31
    }else if(m == 4 || m == 6 || m == 9 || m == 11){
        return 30
    }else if(m == 2 && bissexto(a) == 1 ){
        return 29
    }
     if(m == 2 && bissexto(a) == 0){
        return 28
    }
}

function calculatorAge(dn,mn,an,qtdYear,qtdMonth,qtdDay){
    let da; //dia atual
    let ma; // mes atual
    let aa // ano atual
    qtdMonth = 0 // quantidade de Mês
    qtdYear = 0 // quantidade Ano  
    qtdDay = 0 //quantidade de Dias


    da = date.getDate()
    ma = date.getMonth() + 1
    aa = date.getFullYear()
    

    while(mn < ma - 1 || an < aa){
        mn++
        qtdMonth ++ 
        if(qtdMonth == 12){
            qtdMonth = 0
            qtdYear ++;
        }
        if(mn >= 12){ // 
            an++
            mn = 0
        }
        
    }
    if(an > aa){
        p[2].innerHTML = 'Must be in the past'
        inputs[2].style.border = '1px solid red'
        return 0 
    }else{
        p[2].innerHTML = ''
    }
    if(an == aa && mn > ma){
        inputs[1].style.border = '1px solid red'
        p[1].innerHTML = 'Must be a valid Month'
        return 0
    }else{
        p[1].innerHTML = ''
    }
     if(an == aa && mn == ma && dn > da){
        inputs[0].style.border = '1px solid red'
        p[0].innerHTML = 'Must be a valid day'
        return 0 
        
    }else{
        p[0].innerHTML = ''
    }
    
    
    //Ajustes para o ultimo mês
    if(mn == ma){
        qtdMonth = 0
        qtdDay = da - dn
    }else if(dn == da){
        qtdMonth++
        qtdDay = 0
    }else if(dn < da){
        qtdMonth++
        qtdDay  = da - dn
    }else{
        qtdDay = nameDays(ma - 1, aa) + da - dn     
    }


    document.querySelector('.years h2').innerHTML = `<h2>${qtdYear}</h2>`;
    document.querySelector('.months h2').innerHTML = `<h2>${qtdMonth}</h2>`
    document.querySelector('.days h2').innerHTML = `<h2>${qtdDay}</h2>`
}



document.querySelector('.arrow').addEventListener('click', function(){
    d = inputs[0].value
    m = inputs[1].value
    a = inputs[2].value

    

    if(calculatorAge() == 0){
        document.querySelector('.years h2').innerHTML = `<h2>--</h2>`;
        document.querySelector('.months h2').innerHTML = `<h2>--</h2>`
        document.querySelector('.days h2').innerHTML = `<h2>--</h2>`
    }


    if(validDate(d,m,a) == 1){
        calculatorAge(d,m,a)
        inputs.forEach(item =>{
            item.style.border = ''
        })
    }else{
        document.querySelector('.years h2').innerHTML = `<h2>--</h2>`;
        document.querySelector('.months h2').innerHTML = `<h2>--</h2>`
        document.querySelector('.days h2').innerHTML = `<h2>--</h2>`
    }

})



