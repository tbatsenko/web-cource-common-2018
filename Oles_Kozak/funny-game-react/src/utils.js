export function shuffle(a) {
  const array = [...a]

  let j, x, i
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = array[i]
    array[i] = array[j]
    array[j] = x
  }
  return array
}

export const doubleElements = a =>
  a.reduce((acc, el) => {
    acc.push(el, el)
    return acc
  }, [])

export const formatTime = totalSeconds => {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds - minutes * 60
  return `${minutes}:${seconds}`
}
