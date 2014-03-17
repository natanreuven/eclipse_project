
var CLICKED 	= "CLICKED";
var NOT_CLICKED = "NOT_CLICKED";
var NOT_VALID = "NOT_VALID";
var playerName = "default";
var score = 0 ;

var gBoard;

var gLevel = document.getElementById("level").value;
var LastNubmer  = 0 ;
var totalSeconds = 0 ;
var myInterval = 0  ; 
var EndNumber = 99999; 
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;



//$(function() { alert('hi') })

function newGame() {
	//console.log(document.getElementById("level").checked) ;
	gBoard = buildBoard(gLevel);
	shuffle_loop();
	printBoard();
	clearInterval(myInterval);
	myInterval = setInterval(function(){setTime()},1000);

}





function  buildBoard(level) {
	score = 0 ;
	LastNubmer  = 0 ;
	totalSeconds = 0 ; 
	var I=0,j=0;
	
	
	if (document.getElementById("level").checked == true)
	  {
		(I = 4 ,  J = 4 )
	  }
	else
	  {
		 (	I = 5 ,  J = 5)
	  }
	
	var board = initiateBoard(I, J);
	return board;
}


function initiateBoard(I, J) {

	// Create the Matrix
	var board = new Array(J);
	for (var i=0; i<board.length; i++) {
		board[i] = new Array(I);
	}
	
	
	var t = 0 ; 
	for (var i=0; i<board.length; i++) {
		for (var j=0; j<board[0].length; j++) {
			t = t+1; 
			var cell = {type: NOT_CLICKED, cellNumber:  t };
			board[i][j] = cell;
		}
		EndNumber = t ; 
	}
	return board;
}

function shuffle_loop() {
	for (var t=0; t<gBoard.length*gBoard.length; t++) {
		shuffle();
	}
}




function shuffle(){
	var x = Math.floor((Math.random()*(gBoard.length)));
	var y = Math.floor((Math.random()*(gBoard[0].length))) ; 
	var i = Math.floor((Math.random()*(gBoard.length)));
	var j = Math.floor((Math.random()*(gBoard[0].length))) ; 
	var next_cell = gBoard[x][y];
	var curr_cell = gBoard[i][j];
	//console.log (next_cell.cellNumber  ,curr_cell.cellNumber  ) ;
	 gBoard[x][y] = curr_cell ; 
	 gBoard[i][j] = next_cell ;
	//console.log (next_cell.cellNumber  ,curr_cell.cellNumber  ) ;
};

function printBoard() {
	var tblBoard = document.getElementById('tblBoard');
	var strHTML = ''; 
	for (var i=0; i<gBoard.length; i++) {
		strHTML += "<tr>";
		for (var j=0; j<gBoard[0].length; j++) {
			var currCell = gBoard[i][j];
			var cellClass;
			if (currCell.type == NOT_CLICKED ) {
				cellClass = "NOT_CLICKED";				
			} else if (currCell.type == CLICKED) {
				cellClass = "CLICKED";
			} else if (currCell.type == NOT_VALID) {
				cellClass = "NOT_VALID";
			}
			
			strHTML += "<th class='cell " + cellClass + "'  onclick='handleClick("+i+","+j+")' >";
			strHTML += + currCell.cellNumber +  "</th>";
		}
		"</tr>";
	}

	tblBoard.innerHTML = strHTML;
}



function handleClick(i, j) {
	
		if (gBoard[i][j].type == NOT_CLICKED) {
			if ((LastNubmer  !=0) && (LastNubmer+1 == gBoard[i][j].cellNumber)){
				console.log( "stam stam "  ) ;
				LastNubmer = gBoard[i][j].cellNumber;
				gBoard[i][j].type = CLICKED ;
			}
			if (LastNubmer == 0 && gBoard[i][j].cellNumber == 1 ){
				LastNubmer = gBoard[i][j].cellNumber;
				gBoard[i][j].type = CLICKED ;
			} 
			if (LastNubmer == EndNumber ){
				LastNubmer = gBoard[i][j].cellNumber;
				gBoard[i][j].type = CLICKED ;
				console.log( "totalSeconds" +  totalSeconds + "  you win " );
				
				if ( gLevel == 1) { score = 90 - totalSeconds } else { score = 100 - totalSeconds };
				if ( score < 0 ) { score = 1 } ;  
				alert ("your score is " +score 	 )
				console.log("score" +  score) ;
				 winGame();
												
				clearInterval(myInterval);
			}
			printBoard(); 
		}
	} 


function setTime()
{
    ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds%60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
}

function pad(val)   // set the time value to look align not matter what time is it 
{
    var valString = val + "";
    if(valString.length < 2)
    {
        return "0" + valString;
    }
    else
    {
        return valString;
    }
}

function winGame() {
			    $.ajax({                                   
			      url: 'php/insert.php',
			      dataType: 'json',             
			      data: {score : score , playerName: playerName 
			    	      }, 
			     
			      success: function(data)          //on recieve of reply
			      {
			    	console.log(data);
			    	return;
			      } 
			    });
			  ; 	

}


function selectResults() {
    $.ajax({                                   
      url: 'php/select10rows.php',
      dataType: 'html',             
      data: "",
     
      success: function(data)          //on recieve of reply
      {
    	console.log(data);
    	document.getElementById('scoreTable').innerHTML=data;
    	return;
      } 
    });
  ; 	

}


function setName() {
	 //$(#txt_name).val(); 
	 playerName = document.getElementById("txt_name").value;
	 console.log("playerName" + playerName ) ; 
}


function fisherYates(myArray) {
    var i = myArray.length, j, tempi, tempj;
    if (i === 0) return false;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        tempi = myArray[i];
        tempj = myArray[j];
        myArray[i] = tempj;
        myArray[j] = tempi;
    }
}


function checkLevel() {
	newGame();	
}


