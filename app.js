const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8
let playerGo = 'black'
playerDisplay.textContent = 'black'

const startPieces =  [
    rook, knight, bishop, queen, king, bishop, knight, rook,
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    '', '', '', '', '', '', '', '',
    pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn,
    rook, knight, bishop, queen, king, bishop, knight, rook,
]

function createBoard() {
    startPieces.forEach((startPiece, i) => {
        const squre =document.createElement('div')
        squre.classList.add('square')
        squre.innerHTML = startPiece
        squre.firstChild?.setAttribute('draggable', true)
        squre.setAttribute('squre-id', i)
        //squre.classList.add('beige')
        const row = Math.floor( 63 - i / 8) + 1
        if (row % 2 === 0) {
            squre.classList.add(i % 2 === 0 ? "beige" : "brown") 
        }else {
            squre.classList.add(i % 2 === 0 ? "brown" : "beige") 
        }

        if (i <= 5) {
            squre.firstChild.firstChild.classList.add('black')
        }

        if (i >= 45) {
            squre.firstChild.firstChild.classList.add('white')

        }
        gameBoard.append(squre)
    })
}
 createBoard()

 const allSquares = document.querySelectorAll(".square")
 
 allSquares.forEach(square => {
    square.addEventListener('dragstart', dragStart)
    square.addEventListener('dragover', dragOver)
    square.addEventListener('drop', dragDrop)

 }) 

 let startPositionId
 let draggedElement

 function dragstart (e) {
    startPositionId = e.target.parentNode.getAttribute('squre-id')
    draggedElement= e.target
 }

 function dragOver(e) {
    //e.preventDefault()
    console.log(e.target)
 }

  function dragDrop(e) {
    e.stopPropagation()

    const correctGo = draggedElement.firstChild.classList.contains(playerGo)
    const taken = e.target.classList.contains('piece')
    const valid = checkIfValid(e.target)
    const opponentGo = playerGo === 'white' ? 'black' : 'white'
    //console.log('opponentGo', opponentGo)
    const takenByOpponent = e.target.firstChild?.classList.contains(opponentGo)
    
    if (correctGo) {
        //must chech this first
         if (takenByOpponent && valid) {
             e.target.parentNode.append(draggedElement)
              e.target.remove() 
             changePlayer()
              return
        }   
        
        //then check this

        if (taken && !takenByOpponent) {
            infoDisplay.textContent = "you cannot go here!"
            setTimeout(() => infoDisplay.textContent = "", 2000) 
            return
        }
        if (valid) {
            e.target.append(draggedElement)
            changePlayer()
            return
        }
    }

 }

 function checkIfValid(target) {
    const targetId = Number(target.getAttribute('square-id')) || Number(target.parentNode.getAttribute('square-id'))
    const startId = Number(startPositionId)
    const piece = draggedElement.id
    console.log('targetId',targetId)
    console.log('startId', startId)
    console.log('piece', piece)

    switch(piece) {
        case 'pawn' : 
            const starterRow = [8,9,10,11,12,13,14,15]
            if (
                starterRow.includes(startId) && startId + width * 2 === targetId ||
                startId + width === targetId || 
                startId + width - 1 === targetId && document.querySelector('[square-id="${startId + width - 1 }"]').firstChild ||
                startId + width + 1 === targetId && document.querySelector('[square-id="${startId + width +  1 }"]').firstChild
                ) {
                    return true
            }
            break;
            case 'knight' :
                if (
                    startId + width * 2 +1 === targetId ||
                    startId + width * 2 -1 === targetId ||
                    startId + width - 2 === targetId ||
                    startId + width + 2 === targetId ||
                    startId - width * 2 +1 === targetId ||
                    startId - width * 2 -1 === targetId ||
                    startId - width - 2 === targetId ||
                    startId - width + 2 === targetId  
                ) {
                    return true
                }
                break;
                case 'bishop':
                    if(
                        startId + width + 1 === targetId ||
                        startId + width * 2 + 2 && !document.querySelector('[square-id="${startId + width + 1}"]').firstChild ||
                        startId + width * 3 + 3 && !document.querySelector('[square-id="${startId + width + 1}"]').firstChild && startId + width * 2 + 2 && !document.querySelector('[square-id="${startId + width * 2 + 2}"]').firstChild ||                        ||
                        startId + width * 4 + 4
                        startId + width * 5 + 5
                        startId + width * 6 + 6
                        startId + width * 7 + 7
                    )
    }

 }

 function changePlayer() {
    if (playerGo === "black") {
        playerGo = "white"
        playerDisplay.textContent ='white'
    }else {
        playerGo = "black"
        playerDisplay.textContent ='black'

    }
 }

 function reverseIds() {
   const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) =>
          square.setAttribute('square-id', (width * width - 1) - i))     
 }

 function revertIds() {
    const allSquares = document.querySelectorAll(".square")
    allSquares.forEach((square, i) => square.setAttribute('square-id', i)) 

 }