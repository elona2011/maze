let obstacle = {},
    used = {},
    mousedown = false,
    width = 40,
    height = 30

let table = `<table>${getArea(width+'*'+height)}</table>`
let area = document.createRange().createContextualFragment(table)
document.body.appendChild(area)
document.querySelector('table').addEventListener('click', e => {
    if (e.target.matches('td')) {
        obstacle[e.target.dataset.x + ',' + e.target.dataset.y] = 1
        e.target.classList.add('obstacle')
    }
})
window.addEventListener('mousedown', e => {
    mousedown = true
}, false)
window.addEventListener('mouseup', e => {
    mousedown = false
}, false)
document.querySelector('table').addEventListener('mousemove', e => {
    if (mousedown) {
        obstacle[e.target.dataset.x + ',' + e.target.dataset.y] = 1
        e.target.classList.add('obstacle')
    }
}, false)
document.querySelector('button').addEventListener('click', e => {
    used[0 + ',' + 0] = 1
    writeNum([0, 0], 0)
    let now = [],
        step = 0

    now.push([0, 0])
    while (now.length) {
        let r = now.shift()
        setStep({
            x: r[0],
            y: r[1],
            step: r[2],
            now
        })
    }
}, false)

function setStep({
    x = 0,
    y = 0,
    step = 0,
    now
}) {
    for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1 + Math.abs(i - x); j <= y + 1 - Math.abs(i - x); j++) {
            if (isValid(i, j)) {
                now.push([i, j, step + 1])
                used[i + ',' + j] = 1
                writeNum([i, j], step + 1)
            }
        }
    }
}

function isValid(x, y) {
    if (x < 0 || y < 0 || x > width - 1 || y > height - 1) return false

    if (x + ',' + y in obstacle) return false
    if (x + ',' + y in used) return false

    return true
}

function writeNum([x, y], num) {
    let td = document.querySelector(`tr:nth-child(${y+1})>td:nth-child(${x+1})`)
    td.textContent = num
}

function getArea(range) {
    let [x, y] = range.split('*')
    let tr = ''
    for (let i = 0; i < y; i++) {
        let td = ''
        for (let j = 0; j < x; j++) {
            td += `<td width="20" height="20" data-x="${j}" data-y="${i}"></td>`
        }
        tr += `<tr>${td}</tr>`
    }
    return tr
}