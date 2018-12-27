import { csvParse } from 'd3'

export default async () => {
    const response = await fetch("/holidays.csv")
    const dataText = await response.text()
    return csvParse(dataText, ({day, month, name}) => {
        return {
            date: Number(day),
            month: Number(month) - 1,
            name: name
        }
    })
}
