function removeDuplication(array){
    let tempSet = new Set()
    for (let items of array){
        tempSet.add(items)
    }
    return array = Array.from(tempSet)
}

module.exports = {removeDuplication}