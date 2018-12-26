const BLOCK_AND_ELEMENT_DELIMITER = '__'
const ELEMENT_AND_MODIFIER_SEPARATOR = '_'

export default blockName => elementOrModifiersArray => {
  elementOrModifiersArray = Array.isArray(elementOrModifiersArray)
    ? elementOrModifiersArray
    : [elementOrModifiersArray]

  return elementOrModifiersArray
    .map(elementOrModifiers => {
      if (!elementOrModifiers) return blockName

      const name =
        blockName +
        (elementOrModifiers.element
          ? BLOCK_AND_ELEMENT_DELIMITER + elementOrModifiers.element
          : '')

      const modifiers = Object.keys(elementOrModifiers)
        .filter(modifier => modifier !== 'element')
        .filter(modifier => elementOrModifiers[modifier] !== false)

      const res = [name].concat(
        modifiers.map(
          modifier =>
            name +
            ELEMENT_AND_MODIFIER_SEPARATOR +
            modifier +
            (elementOrModifiers[modifier] !== true
              ? ELEMENT_AND_MODIFIER_SEPARATOR + elementOrModifiers[modifier]
              : '')
        )
      )
      return res.join(' ')
    })
    .join(' ')
}
