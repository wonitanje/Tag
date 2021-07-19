const boardSize = 4
const cellsAmount = Math.pow(boardSize, 2)

const board = document.querySelector('#board')
for (let i = 0; i < cellsAmount; i++) {
  const cell = document.createElement('div')
  cell.style.width = `calc(${100 / boardSize}% - 4px)`
  cell.style.height = `calc(${100 / boardSize}% - 4px)`
  cell.classList.add('item')
  board.append(cell)
}
board.lastChild.classList.add('empty')

function Start() {
  const cells = document.querySelectorAll('.item')
  const shuffle = GetShuffle(cellsAmount)
  for (let i = 0; i < cellsAmount; i++) {
    if (shuffle[i] > 0) {
      cells[i].textContent = shuffle[i]
      cells[i].classList.remove('empty')
    } else cells[i].classList.add('empty')
  }
}

const items = [...document.querySelectorAll('.item')]
const notification = document.querySelector('#notification')
const reset = document.querySelector('#reset')

items.forEach(item =>
  item.addEventListener('click', e => {
    const empty = document.querySelector('.item.empty')
    const targetIdx = items.indexOf(e.target)
    const emptyIdx = items.indexOf(empty)
    const avaibleCells = [emptyIdx - 1, emptyIdx + 1, emptyIdx - boardSize, emptyIdx + boardSize]
    if (!avaibleCells.includes(targetIdx)) return notification.textContent = 'Ход невозможен'
    notification.textContent = 'Пятнашки'

    items[emptyIdx].textContent = items[targetIdx].textContent
    items[emptyIdx].classList.remove('empty')
    items[targetIdx].textContent = ''
    items[targetIdx].classList.add('empty')

    if (VictoryState()) notification.textContent = 'Победа'
  })
)

function GetShuffle(size) {
  const invertions = cells => cells.reduce((invertions, cell, idx) => invertions + cells.slice(idx).filter(el => cell > el).length, 0)
  const isVictory = cells => cells.join('') == [...cells].sort((a, b) => a - b).join('')

  do {
    var cells = [...Array(size).keys()].slice(1).sort(() => Math.random() - 0.5)
  } while (isVictory(cells) || invertions(cells) % 2 != 0)
  cells.push(0)
  return cells
}

function VictoryState() {
  const finish = [...document.querySelectorAll('.item')].map(item => +item.textContent || cellsAmount).sort((a, b) => a - b)
  const state = items.map(item => +item.textContent || cellsAmount)
  return state.join('') == finish.join('')
}