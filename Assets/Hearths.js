#pragma strict

var cardname = "Enter";
var cards = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
var numcards = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var savenum = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var savedeck = new Array (30);
var cardindex = 0;
var savedindex = 0;
function Start () {
}

function Update () {

}

function OnGUI(){
GUI.matrix = Matrix4x4.TRS(Vector3.zero,Quaternion.identity,new Vector3(Screen.width/960f,Screen.height/600f,1f));
GUI.skin.box.wordWrap = true;
GUI.skin.box.fontSize = 22;
GUI.skin.textField.fontSize = 22;
//////////////FIRST STACK
for(var i = 0; i < 15; i++){


GUI.Box ( Rect (170 ,gety(i), 60, 30), "" + numcards[i] );

if (UnityEngine.GUI.Button ( Rect (20, gety(i) , 150, 30), getcardname(i) ) ){
   numcards[i]--;
   if(numcards[i] < 0){numcards[i] = 0;}
    }
}
////////////////////////////////////////////////////
//SECOND STACK
for(var j = 0; j < (cardindex - 15); j++){

GUI.Box ( Rect (230, gety(j) , 60, 30), "" + numcards[15+j]);

if (UnityEngine.GUI.Button ( Rect (290, gety(j), 150, 30), getcardname(15+j)) ){
    numcards[j+15]--;
    if(numcards[j+15] < 0){numcards[j+15] = 0;}
    }
}

//////////////////////////////////////////////


//UNDO
if (GUI.Button ( Rect (100,500, 130, 30), "Remove Last Entry")){ 
if(cardindex > 0){
removecard(cardindex - 1);
}
}

//ENTER CARD NAME
cardname = GUI.TextField (Rect (20,530, 180,30), cardname);
//ENTER CARD
if (GUI.Button ( Rect (200,530, 30, 30), "+")){ 
		if(cardname.Length > 2){
		if(howmanyleft() < 30){
			addcard(cardname);
			}
		}
    }
    

//////////SAVE /LOAD 
if (GUI.Button ( Rect (260,490, 100, 30), "Save Deck")){ 
 savedindex = cardindex;
 for(var h = 0; h < cardindex; h++){
 savedeck[h] = cards[h];
savenum[h] = numcards[h];
}
  }
if (GUI.Button ( Rect (260,520, 100, 30), "Load Deck")){ 
 cardindex = savedindex;
 for(var k = 0; k < savedindex; k++){
 cards[k] = savedeck[k];
numcards[k] = savenum[k];
}
 }


if (GUI.Button ( Rect (260,550, 100, 30), "New Deck")){  
for(var v = cardindex; v >= 0; v--){
removecard(v); }
}
//reset



//CARDS LEFT
 var cardsleft = howmanyleft();
GUI.Label ( Rect (20,480, 160, 30), " Cards Left ");
GUI.Box ( Rect (20,500, 60, 30), "" + cardsleft);

}



function gety( i: int) {

var p = 30 + (30 * i);
return p;
}




//ADDS A CARD INTO YOUR DECK
function addcard(s){
		Debug.Log("made it to add card");
if(cards.length <= 30){

		
	for(var i = 0; i < cardindex; i++){
		if( s == cards[i] && numcards[i] < 2){
			numcards[i]++;
			//  cardindex++;
			return;
		}		
	}
	 cards[cardindex] = s;
	 numcards[cardindex] = 1;
	 cardindex++;
	 }
}


//GETS NAME OF CARD FOR BUTTON
function getcardname(i : int){

if (cardindex < i){return " ";}
else{return "" + cards[i];}
}


//COUNTS HOW MANY CARDS ARE IN YOUR DECK
function howmanyleft(){
var x = 0;
for(var i = 0; i < cards.length; i++){
 x = x + numcards[i];
}
return x;
}

//REMOVES LAST ENTRY FROM LIST
function removecard(i){

numcards[i] = 0;
cards[i] = "";
cardindex = cardindex - 1;
if(cardindex < 0 ){cardindex = 0;}

}



