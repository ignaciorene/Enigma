const abc=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const n=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const hasNumber = /\d/;
var rotorI=[11,0,12,1,19,7,2,17,13,3,6,22,18,14,4,23,25,5,9,16,24,8,21,15,10,20];
var rotorII=[8,13,5,4,14,23,12,17,9,0,18,11,1,3,2,24,16,6,15,22,10,20,25,21,7,19];
var rotorIII=[10,0,8,1,5,15,14,17,12,25,7,6,11,21,2,16,13,20,3,18,24,9,23,19,22,4];
var rotorIV=[2,19,4,3,20,14,17,10,23,12,22,25,9,1,8,15,6,11,0,16,13,24,5,21,7,18];
var rotorV=[14,0,20,23,1,5,24,22,17,10,8,7,15,19,11,9,21,12,25,4,16,2,18,13,3,6];
var rotorVI=[3,24,14,2,17,25,19,4,23,8,20,6,11,22,15,16,10,0,12,1,7,13,21,18,9,5];
var rotorVII=[2,18,5,10,15,11,8,20,14,4,7,24,22,21,6,17,13,3,19,25,1,12,16,9,0,23];
var rotorVII=[11,22,0,20,2,10,8,23,21,1,19,15,17,5,14,3,7,18,12,9,25,4,24,13,6,16];
const reflectorA=[4,10,8,25,0,17,13,22,2,20,1,12,11,6,21,23,18,5,16,24,9,14,7,15,19,3];
const reflectorB=[10,23,15,20,13,25,12,9,11,7,0,8,6,4,21,2,19,24,22,16,3,14,18,1,17,5];
var rotor1Count=0;
var rotor2Count=0;
var rotor3Count=0;

//message=document.getElementById("message").value;
//document.getElementById("result").innerHTML='<b style="text-weight:bold;font-size:1.5em;display:block;margin-bottom:0.25em;margin-top:0.25em;">SU MENSAJE ES:</b><br><p id="resultMessage">'+encryptedMessage+'</p>';

function createRotor(id,initialPosition,rotor) {
		//selecciono el rotor elegido por el usuario
		switch (id){
			case 1:
				rotor=rotorI;
				break;
			case 2:
				rotor=rotorII;
				break;
			case 3:
				rotor=rotorIII;
				break;
			case 4:
				rotor=rotorIV;
				break;
			case 5:
				rotor=rotorV;
				break;
			case 6:
				rotor=rotorVI;
				break;
			case 7:
				rotor=rotorVII;
				break;
			case 8:
				rotor=rotorVIII;
				break;
		}

		//lo muevo los lugares elegidos
		let position=initialPosition;
		let codeList=[];

		for(let i=0;i<rotor.length;i++){
			if (position>rotor.length-1) {
				position=0;
				codeList[i]=rotor[position];
				position++;
			}
			else{
				codeList[i]=rotor[position];
				position++;
			}
		}

		rotor=codeList;

		return rotor;
}

function moveRotor(rotor){
	let position=1;
	let codeList=[];
	let codeListInLetters=[];
	//corro el rotor un lugar
	for(let i=0;i<rotor.length;i++){
		if (position>rotor.length-1) {
			position=0;
			codeList[i]=rotor[position];
			position++;
		}
		else{
			codeList[i]=rotor[position];
			position++;
		}
	}
	rotor=codeList;

	return rotor;
}

class enigma{
	constructor(reflector,rotor1,rotor1InitialPosition,rotor2,rotor2InitialPosition,rotor3,rotor3InitialPosition){
		this.rotor1InitialPosition=rotor1InitialPosition;
		this.rotor2InitialPosition=rotor2InitialPosition;
		this.rotor3InitialPosition=rotor3InitialPosition;

		if (reflector==1) {
			this.reflector=reflectorA;
		}
		else{
			this.reflector=reflectorB;
		}

		this.rotor1=createRotor(rotor1,rotor1InitialPosition);
		this.rotor2=createRotor(rotor2,rotor2InitialPosition);
		this.rotor3=createRotor(rotor3,rotor3InitialPosition);
	}

	inputLetter(letter){

		//Giro los rotores
		rotor1Count++;

		this.rotor1=moveRotor(this.rotor1);

		if (rotor1Count%26==0) {
			rotor2Count++;
			this.rotor2=moveRotor(this.rotor2);
			console.log(this.rotor2);
		}
		if (rotor2Count%26==0 && rotor2Count!=0){
			rotor3Count++;
			this.rotor3=moveRotor(this.rotor3);
			console.log(this.rotor3);
		}

		//obtengo letra código		
		let res3=0;
		for(let i=0;i<this.rotor3.length;i++){
			if (this.reflector[this.rotor3[this.rotor2[this.rotor1[letter]]]]==this.rotor3[i]) {
				res3=i;
			}
		}
		console.log("2º res rotor3: "+res3);

		let res2=0;
		for(let i=0;i<this.rotor2.length;i++){
			if (res3==this.rotor2[i]) {
				res2=i;
			}
		}
		console.log("2º res rotor2: "+res2);

		let res1=0;
		for(let i=0;i<this.rotor1.length;i++){
			if (res2==this.rotor1[i]) {
				res1=i;
			}
		}
		console.log("res final: "+res1);
	}
}

function setup(){
	var reflec=parseInt(document.getElementById("reflec").value);
	var rot1=parseInt(document.getElementById("rot1").value);
	var rot1Initial=parseInt(document.getElementById("rot1Initial").value);
	var rot2=parseInt(document.getElementById("rot2").value);
	var rot2Initial=parseInt(document.getElementById("rot2Initial").value);
	var rot3=parseInt(document.getElementById("rot3").value);
	var rot3Initial=parseInt(document.getElementById("rot3Initial").value);

	var inputs = document.getElementsByClassName('button');
	for(var i = 0; i < inputs.length; i++) {
	    inputs[i].disabled = false;
	}

	var obj=new enigma(reflec,rot3,rot3Initial-1,rot2,rot2Initial-1,rot1,rot1Initial-1);
	console.log(obj);
	console.log(obj.rotor1);
	console.log(obj.rotor2);
	console.log(obj.rotor3);
	console.log(obj.reflector);

	document.getElementById("rotor__wheel1").innerHTML=abc[rot1Initial-1];
	document.getElementById("rotor__wheel2").innerHTML=abc[rot2Initial-1];
	document.getElementById("rotor__wheel3").innerHTML=abc[rot3Initial-1];
}