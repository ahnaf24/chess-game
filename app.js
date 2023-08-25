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
    console.log(e.target)
    const taken = e.target.classList.contains('peice')

    // e.target.parentNode.append(draggedElement)
    // e.target.remove()
   // e.target.append(draggedElement)
   changePlayer()
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
    document.querySelectorAll(".square")
 }