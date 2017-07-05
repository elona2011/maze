let table = `<table>${getArea('40*30')}</table>`
let area = document.createRange().createContextualFragment(table)
document.body.appendChild(area)
setStep()

function setStep(target = [0, 0]) {
    writeNum([0, 0], 3)
}

function getAllPositionForStep(target = [0, 0], step) {

}

function writeNum([x, y], num) {
    let td = document.querySelector(`tr:nth-child(${x+1})>td:nth-child(${y+1})`)
    td.textContent = num
}

function getArea(range) {
    let [x, y] = range.split('*')
    let td = '',
        tr = ''
    for (let i = 0; i < x; i++) {
        td += `<td width="20" height="20"></td>`
    }
    for (let i = 0; i < y; i++) {
        tr += `<tr>${td}</tr>`
    }
    return tr
}