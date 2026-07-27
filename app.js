let boxes=document.querySelectorAll('.box');
let resetBtn=document.querySelector('#reset-btn');
let newBtn=document.querySelector('#new-btn');
let msgContainer=document.querySelector('.msg-container');
let msg=document.querySelector('#msg');
let turnO= true      //this can be of either 'X' or 'O' so make initially start with 'O' turn
//need to detremine the all the winning combinations
//so we need to create a 2d array to store the winning combinations
const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6] 
]

//reset button functionality
const resetGame=()=>{
    //immediately change the button variable
    turnO=true;
    enableBoxes();
    //after game done need to hide the msg container
    msgContainer.classList.add('hide');
}
//addind event to the every box
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
  
        if(turnO){      //player 1
            box.innerText="O";
            box.style.color="blue";
            turnO=false;
        }
        else{           //player 2
            box.innerText="X";
            box.style.color="red";
            turnO=true; 
        }
        //if a box is clicked then no modifications be done in that box so we need to disable the box after clicking
        box.disabled=true;
        //tracking the winner after every click
        checkWinner();
    });
})


//whenever the winner is found then disable all the boxes
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

//after that we have to enable again all the boxes for all the boxes
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        //box need to make empty
        box.innerText="";
    }
}


const showWinner=(winner)=>{
    let color = winner === "O" ? "blue" : "red";
    msg.innerHTML = `Congratulations, Winner is <span style="color:${color};">${winner}</span>`;
    //intially the msg container is hidden so now we need to remove it to display the message
    msgContainer.classList.remove('hide');
    disableBoxes();
}

const checkWinner=()=>{
    for(pattern of winPatterns){
        //every pattern is combination of winning game so we need to 3 individual boxes
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        //if any combination of box is empty then it cant be the winner,so check the condition when all 3 boxes are filled
        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
              

                //when winner is found then we need to display the message
                showWinner(pos1);
            }
        }
    }
}

resetBtn.addEventListener('click',resetGame);
newBtn.addEventListener('click',resetGame);   