window.addEventListener('DOMContentLoaded', ()=>{
    const titles = Array.from(document.querySelectorAll('.title'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector(".announcer");

    let board = ["", "", "", "","", "","","",""];
    let currentPlayer = "X";
    let isGameActive = true;

    const PLAYERX_WON = "PLAYERX_WON";
    const PLAYERO_WON = "PLAYERO_WON";
    const TIE = "TIE"

    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    const handleResultValidation = ()=>{
        let roundWon = false;
        for(let i = 0; i <= 7; i++){
            const winCondition = winningConditions[i]
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if(a === "" || b === "" || c === ""){
                continue;
            }
             if(a === b && b === c){
             roundWon = true;
             break;
            }    
        }
        if(roundWon){
            announce(currentPlayer === "X" ? PLAYERO_WON : PLAYERX_WON);
            isGameActive = false;
            return;
        }
        if(!board.includes("")) announce(TIE)
    }
    const announce = (type)=>{
        switch(type){
            case PLAYERO_WON:
                announcer.innerHTML = 'Jugador <span class="playerX">X</span> gano!';
                break;
                case PLAYERX_WON:
                    announcer.innerHTML = 'Jugador <span class="playerO">O</span> gano!';
                    break;
                case TIE:
                    announcer.innerText = "Empate"

        }
        announcer.classList.remove("hide");

    }
    const isValidAction = (title)=>{
        return title.innerHTML !== "X" && title.innerHTML !== "O";
        }
    const updateBoard = (index)=>{
        board[index] = currentPlayer;
    }      
    const changePlayer = ()=>{
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
        }
    const userAction = (title, index)=>{
        if(isValidAction(title) && isGameActive){
            title.innerText = currentPlayer;
            title.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer()
        }
    }
    const resetBoard = ()=>{
        board = ["","","","","","","","",""];
        isGameActive = true;
        announcer.classList.add("hide")

        if(currentPlayer === "O"){
            changePlayer();
        }
        titles.forEach((title)=>{
         title.innerText = "";
         title.classList.remove("playerX");
         title.classList.remove("playerO")
        })

    }

    titles.forEach((title, index)=>{
        title.addEventListener("click", ()=> userAction(title, index))
    });
    resetButton.addEventListener("click", resetBoard);
})
