const gameBoard = document.querySelector("#gameboard")
const playerDisplay = document.querySelector("#player")
const infoDisplay = document.querySelector("#info-display")
const width = 8

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
        gameBoard.append(squre)
    })
}
 createBoard()