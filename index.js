const UnionFind = require('union-find')
const _ = require('lodash');

/**
 * 
 * @param {number[][]} arr
 * @returns {number[]}
 */
function magic(arr) {
    const unionFind = new UnionFind(0)
    const cellIndexToID = new Map()
    arr.forEach((row, rowIndex, matrix) => {
        row.forEach((cell, columnIndex) => {
            if (cell === 1) {
                const cellIndex = (arr.length * rowIndex) + columnIndex
                cellIndexToID.set(cellIndex, unionFind.makeSet())
                if (columnIndex !== 0 && matrix[rowIndex][columnIndex - 1] === 1) {
                    const leftNeighborIndex = cellIndex - 1
                    unionFind.link(cellIndexToID.get(cellIndex), cellIndexToID.get(leftNeighborIndex))
                }
                if (rowIndex !== 0 && matrix[rowIndex - 1][columnIndex] === 1) {
                    const upperNeighborIndex = cellIndex - arr.length
                    unionFind.link(cellIndexToID.get(cellIndex), cellIndexToID.get(upperNeighborIndex))
                }
            }
        })
    })

    const lemonIDToLen = new Map()
    unionFind.roots.forEach((lemonOfPartition) => {
        lemonIDToLen.has(lemonOfPartition) ? lemonIDToLen.set(lemonOfPartition, lemonIDToLen.get(lemonOfPartition) + 1) : lemonIDToLen.set(lemonOfPartition, 1)
    })

    const unorderedRes = []
    lemonIDToLen.forEach(lemonLen => unorderedRes.push(lemonLen))
    return _.sortBy(unorderedRes)
}

let arr = [
    [1, 0, 0, 1],
    [0, 0, 1, 0],
    [1, 0, 1, 0],
    [1, 0, 1, 0]
]

arr = [
    [0, 0, 0, 1, 0, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1, 1, 0, 1],
    [1, 1, 1, 0, 0, 0, 0, 0]
]

arr = [
    [0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
    [0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0]
]

const a = magic(arr)
console.log(a)