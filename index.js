let op;//opcion elegida en la caja de texto
let numeros=[128,192, 224,240, 248, 252, 254, 255];
let arreglo=[];

/*Objetos de la clase */
let objA={
    Clase: "A",
    Mred: "255.0.0.0",
    Prefix: 8,
    PosMsub: 1,
    MsubRed: [255,0,0,0],
    host: 0,
    subred:0,
};

let objB={
    Clase: "B",
    Mred: "255.255.0.0",
    Prefix: 16,
    PosMsub: 2,
    MsubRed: [255,255,0,0],
    host: 0,
    subred:0,
};

let objC={
    Clase: "C",
    Mred: "255.255.255.0",
    Prefix: 24,
    PosMsub: 3,
    MsubRed: [255,255,255,0],
    host: 0,
    subred:0,
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
    document.getElementById("ol").innerHTML="";
    document.getElementById("ol1").innerHTML="";
    dirIP=document.getElementById("dir");
    let TipoClase=clase(dirIP.value);
    let saltoIP;
    //obtener salto
    saltoIP=salto(TipoClase);
    console.log(`salto ${saltoIP}`);

    generaListas(TipoClase, saltoIP, dirIP.value);

/*
    if(TipoClase.Clase==="A"){
        claseA(TipoClase, saltoIP, dirIP.value);
    }
    else if(TipoClase.Clase==="B"){
        claseB(TipoClase, saltoIP, dirIP.value);
    }
    else{
        claseB(TipoClase, saltoIP, dirIP.value);
    }
    */
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
    //guardamos la subred en el objeto
    objetoClase.subred=subRed;
    //Mascara de subred
    objetoClase=Object.assign(objetoClase,MascaraSubred(objetoClase,subRed));
    let vari=objetoClase["MsubRed"].toString();
    document.getElementById("msub").innerHTML=`M.Subred: ${vari}`;
    //fin mascara de subred;

    return objetoClase;
}


function claseA(obj){

}

function generaListas(obj, salto, dir){
   arreglo=[];
    let salto2=0, cont=0;
    let indice;
    let aux=dir.split('.');
    arreglo=aux;
    let s=(Math.pow(2,obj.subred)-2)

    let div=parseInt(obj.subred/8);
    //let indice=obj.PosMsub+div;
    console.log(`el div ${div}`);
    
    if(div==0){
        indice=obj.PosMsub;
        let contador=0;
        console.log(`sub red ${Math.pow(2,obj.subred)-2}`)
        for(x=0;x<s;x++){
            arreglo[indice]=contador;

            document.getElementById("ol").innerHTML+=`
            <li><a href="#" onclick="hostCalc('${arreglo.toString()}', ${obj.host})">${arreglo.toString()}<a></li>
            `;
            contador=contador+salto;
            if(contador>=255){
                break;
            }
        }

    }
    else{
        indice=obj.PosMsub+div;
        let contador=0;
        let contador2=0;
        let indice2=indice-1;
        for(x=0;x<s;x++){
            arreglo[indice]=contador;
            document.getElementById("ol").innerHTML+=`
            <li><a href="#" onclick="hostCalc('${arreglo.toString()}', ${obj.host})">${arreglo.toString()}<a></li>
            `;
            contador=contador+salto;
            if(contador>=254){
                contador2+=1
                arreglo[indice2]=contador2;
                contador=0;
            }
            if(contador2>=255){
                contador2=0;
                indice2-=1;
            }
        }
    }


    /*
    for(x=0;x<(Math.pow(2,obj.subred)-2);x++){
        salto2=salto+salto2;
        if(salto2>256){
            salto2=0;
            cont++;
            
        }
        //se aenxan las subredes
        document.getElementById("ol").innerHTML+=`
        <li><a href="#" onclick="hostCalc(arr, ${obj.host})">192.1.168.1.65<a></li>
        `;
    }*/
    
  
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
   // console.log("hola");
   console.log(`${arr}`); 

   arr=arr.split(',');
   
   document.getElementById("ol1").innerHTML="";
    for(x=0;x<val;x++){
        arr[3]=x;
        document.getElementById("ol1").innerHTML+=`<li> ${arr.toString()} </li>`
        ;
    }
}

function salto(obj){
    let menor=obj.MsubRed[obj.PosMsub];
   // console.log(`menor ${menor}`);

    for(x=obj.PosMsub;x<4;x++){
        if(obj.MsubRed[x]<menor){
            menor=obj.MsubRed[x];
        }
       // console.log(`x ${x}`)
    }

    return 255-menor;
}