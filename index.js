let op;

function opciones(c){
    op=c;
    if(op==1){
        document.getElementById("opcion").style=`
        clear: none;
        position: relative;
        left: 120px;
        top: -80px;
        
        `;
    }
    else if(op==2){
        document.getElementById("opcion").style=`
        clear: none;
        position: relative;
        left: 120px;
        top:-45px;
        
        `;
    }
    else{
        document.getElementById("opcion").style=`
        clear: none;
        position: relative;
        left: 120px;
        top:-8px;
        
        `;
    }
}


function main(){
    //declaraciones
    let dirIP;
    
    dirIP=document.getElementById("dir");
    clase(dirIP.value);
    if(op==1){
        claseA();
    }
    else if(op==2){
        claseB();
    }
    else{
        claseC();
    }

} 


//funcion que analiza la clase de la subred
function clase(IP){
    let analisis; //valor de red
    let arr; //arreglo que va resultando
    let host;
    let bits

    analisis=IP.slice(0,IP.indexOf('.'));
    //arr=IP.slice(IP.indexOf('.'));
    //console.log(`${analisis}`);
    if(analisis<=127){
        document.getElementById("class").innerHTML="Clase: A";
        document.getElementById("red").innerHTML="M.RED: 255.0.0.0";
    }
    else if(analisis>127 && analisis<=191){
        document.getElementById("class").innerHTML="Clase: B";
        document.getElementById("red").innerHTML="M.RED: 255.255.0.0";
    }
    else{
        document.getElementById("class").innerHTML="Clase: C";
        document.getElementById("red").innerHTML="M.RED: 255.255.255.0";
    }   
    

    host=document.getElementById("opcion");


    /*Hacer comun a cada sub clase */
    for(x=1;x<14;x++){
        if((Math.pow(2, x))-2>host.value){
            
            bits=(Math.pow(2, x))-2;
            document.getElementById("host").innerHTML=`Host: ${bits}`;
            
            hasBinario();

            let prefijo=32-x;
            //document.getElementById("sub").innerHTML=`Subredes: ${prefijo}`;
            document.getElementById("msub").innerHTML=`M.RED: 255.255.255.${bits+2}`;
            let numSub=Math.pow(2, 16-x);
            document.getElementById("sub").innerHTML=`Subredes: ${numSub}`;
            break;
        }
    }

    /*
    192.0.0.128
    192.0.1.0
    192.0.1.128
    for(x=0;x<500;x++){
        document.getElementById("ol").innerHTML+=`
        <li></li>
        `;
    }*/
}

function hasBinario(){
    let arr=["255","255","255","00000000"]
    arr1=arr.slice(0,3);
    for(x=0; x<5; x++){
        arr1[x]='1';
    }
    console.log(`${arr1}`)
    arr[3]=parseInt(arr1, 10);
    console.log(`${arr.toString()}`);
}


function claseA(){

}

function claseB(){
    
}

function claseC(){
    console.log("hola");
}