const bemToString = (blockName) => {
    return (elementOrModifiers) =>{
        const name = blockName + (elementOrModifiers.element? "__" + elementOrModifiers.element : "")

        let modifiers = Object.keys(elementOrModifiers)
        modifiers = modifiers.filter(modifier => modifier != "element")
        modifiers = modifiers.filter(modifier => elementOrModifiers[modifier] !== false)

        const res = [name].concat(
            modifiers.map(
                modifier => 
                    name + "_" + modifier + 
                        (elementOrModifiers[modifier] !== true ? "_" + elementOrModifiers[modifier]: "")
            )
        )
        return res.join(" ")
    }
}

const b = bemToString("field")
