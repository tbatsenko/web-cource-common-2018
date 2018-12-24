export const bem = (blockName) => {
    return (elementOrModifiersArray) =>{
        elementOrModifiersArray = Array.isArray(elementOrModifiersArray)? elementOrModifiersArray: [elementOrModifiersArray]

        return elementOrModifiersArray.map(
            (elementOrModifiers) => {
                if(!elementOrModifiers)
                    return blockName
        
                const name = blockName + (elementOrModifiers.element? "__" + elementOrModifiers.element : "")

                let modifiers = Object.keys(elementOrModifiers)
                modifiers = modifiers.filter(modifier => modifier !== "element")
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
        ).join(" ")
    }
}

export const todoListBem = bem("todoList")
export const calendarBem = bem("calendar")
export const appBem = bem("app")

export default bem