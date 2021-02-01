let op;//opcion elegida en la caja de texto
let numeros=[128,192, 224,240, 248, 252, 254, 255];

/*Objetos de la clase */
let objA={
    Clase: "A",
    Mred: "255.0.0.0",
    Prefix: 8,
    PosMsub: 1,
    MsubRed: [255,0,0,0],
    host: 0
};

let objB={
    Clase: "B",
    Mred: "255.255.0.0",
    Prefix: 16,
    PosMsub: 2,
    MsubRed: [255,255,0,0],
    host: 0,
};

let objC={
    Clase: "C",
    Mred: "255.255.255.0",
    Prefix: 24,
    PosMsub: 3,
    MsubRed: [255,255,255,0],
    host: 0,
};

/*Funcion que le da la posicion a la caja de texto */
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
    console.log(`Valor de op: ${op}`);
}


function main(){
    //declaraciones
    let dirIP;
    
    dirIP=document.getElementById("dir");
    let TipoClase=clase(dirIP.value);
    
    if(TipoClase.Clase==="A"){
        claseA(TipoClase);
    }
    else if(TipoClase.Clase==="B"){
        claseB(TipoClase);
    }
    else{
        claseC(TipoClase);
    }
    
} 


//funcion que analiza la clase de la subred
function clase(IP){
    let analisis; //valor de red
    let arr; //arreglo que va resultando
    let host, prefijo, subRed;
    let bits;
    let objetoClase={};
    analisis=IP.slice(0,IP.indexOf('.'));
    //arr=IP.slice(IP.indexOf('.'));
    //console.log(`${analisis}`);

    if(analisis<=127){
        objetoClase=Object.assign(objetoClase,objA);
        document.getElementById("class").innerHTML="Clase: A";
        document.getElementById("red").innerHTML=`M.Red: ${objA["Mred"]}`
    }
    else if(analisis>127 && analisis<=191){
        objetoClase=Object.assign(objetoClase,objB);
        document.getElementById("class").innerHTML="Clase: B";
        document.getElementById("red").innerHTML=`M.Red: ${objB["Mred"]}`;
    }
    else{
        objetoClase=Object.assign(objetoClase,objC);
        document.getElementById("class").innerHTML="Clase: C";
        document.getElementById("red").innerHTML=`M.Red: ${objC["Mred"]}`;
    }   
    

    if(op!=3){
        let subred1;
        let valorCaja=document.getElementById("opcion");
        for(x=1;x<20;x++){
            if((Math.pow(2, x))-2>valorCaja.value){
                //console.log("valor x"+x)
                bits=(Math.pow(2, x))-2;
                if(op==1){//host
                    
                    //guardamos el host
                    objetoClase.host=bits;
                    document.getElementById("host").innerHTML=`Host: ${bits}`;
                    prefijo=32-x;
                    //subred
                    subRed=32-x-objetoClase["Prefix"]
                    //console.log(`${subred}`);
                    bits=(Math.pow(2, subRed))-2;
                    document.getElementById("sub").innerHTML=`Subredes: ${bits}`;
                    break;
                }
                else{//redes
                    subRed=x
                    prefijo=x+objetoClase["Prefix"];
                    document.getElementById("sub").innerHTML=`Subredes: ${bits}`;;
                    host=32-prefijo;
                    //guardamos el host
                   
                    bits=(Math.pow(2, host))-2;
                    objetoClase.host=bits;
                    document.getElementById("host").innerHTML=`Host: ${bits}`;
                    break;
                }
            }
        }
    }


    //Se calcula Subred y host a partir del prefijo
    else{
        //host
        prefijo=document.getElementById("opcion");
        host=32-prefijo.value;
        //guardamos el host
        
        host=Math.pow(2,host)-2;
        objetoClase.host=host;
        document.getElementById("host").innerHTML=`Host: ${host}`;

        //Subredes
        subRed=prefijo.value-objetoClase["Prefix"];
        let subRed1=Math.pow(2,subRed)-2;
        document.getElementById("sub").innerHTML=`Subredes: ${subRed1}`;
    }

    
    //Mascara de subred
    objetoClase=Object.assign(objetoClase,MascaraSubred(objetoClase,subRed));
    let vari=objetoClase["MsubRed"].toString();
    document.getElementById("msub").innerHTML=`M.Subred: ${vari}`;
    //fin mascara de subred;

    return objetoClase;
}


/*
function hasBinario(){
    let arr=["255","255","255","00000000"]
    arr1=arr.slice(0,3);
    for(x=0; x<5; x++){
        arr1[x]='1';
    }
    console.log(`${arr1}`)
    arr[3]=parseInt(arr1, 10);
    console.log(`${arr.toString()}`);
}*/

function claseA(obj){

}

function claseB(obj){
    


    arr=[255,255,85,0];
    //se aenxan las subredes
    for(x=0;x<obj.host;x++){
        document.getElementById("ol").innerHTML+=`
        <li><a href="#" onclick="hostCalc(arr, ${obj.host})">192.1.168.1.65<a></li>
        `;
    }
}

function claseC(obj){

}


function MascaraSubred(obj, numBits){
    //console.log(`${numBits}`)
    div=parseInt(numBits/8);
    res=numBits%8;
    console.log("aver"+div+" res"+res)

    let x;
    //For que pone los unos
    for(x=0;x<div;x++){
        obj["MsubRed"][obj.PosMsub+x]=numeros[7];
        //console.log(`Entro aqui`);
        //console.log(` holi: ${obj["MsubRed"]["PosMsub"+x]}`)
    }
    obj["MsubRed"][obj.PosMsub+x]=numeros[res-1];
    //console.log(` holi2: ${obj["MsubRed"]["PosMsub"+x]}`)

    return obj;
}

function hostCalc(arr, val){
    console.log("hola");
    document.getElementById("ol1").innerHTML="";
    for(x=0;x<val;x++){
        arr[3]=x;
        document.getElementById("ol1").innerHTML+=`<li> ${arr.toString()} </li>`
        ;
    }
}