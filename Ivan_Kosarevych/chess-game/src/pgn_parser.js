export default function parsePGNFile(filename) {
    return {
        players: {
            0: "Kasparov",
            1: "Karlsen",
        },
        moves: [
            { move: 'e4', move_number: 1},
            { move: 'e5'},
            { move: 'Nf3', move_number: 2},
            { move: 'Nc6'},
            { move: 'Bc4', move_number: 3},
            { move: 'Bc5', ravs: [{ moves: [{move_number: 3, move: "...Nf6", comment: "is the two knights"}]}]},
            { move: 'b4', move_number: 4},
            { move: 'Bxb4'},
            { move: 'c3', move_number: 5},
            { move: 'Ba5'},
            { move: 'd4', move_number: 6},
            { move: 'exd4'},
            { move: '0-0', move_number: 7},
            { move: 'Nge7', nags: ["$1"]},
            {move: "0-1"}
        ]
    }
}
