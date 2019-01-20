var dataObject, i, j, x = ''
dataObject = {
  'teams': [

    {
      'name': 'Chelsea',
      'games': 4,
      'madeMoments': 2,
      'goalsAmount': 3,
      'goalsInOur': 12,
      'wins': 3,
      'draw': 1,
      'loses': 0,
      'score': 12,
      'goals': [{
        'x1': 50,
        'y1': 312,
        'x2': 150,
        'y2': 200,
      }, {
        'x1': 49,
        'y1': 265,
        'x2': 80,
        'y2': 320,
      }],
    },{
      'name': 'ManCity',
      'games': 4,
      'madeMoments': 2,
      'goalsAmount': 3,
      'goalsInOur': 1,
      'wins': 4,
      'draw': 0,
      'loses': 0,
      'score': 12,
      'goals': [{
        'x1': 45,
        'y1': 300,
        'x2': 200,
        'y2': 100,
      }, {
        'x1': 49,
        'y1': 250,
        'x2': 210,
        'y2': 410,
      }, {
        'x1': 47,
        'y1': 270,
        'x2': 320,
        'y2': 320,
      }],
    }],
}

let allTeams = document.getElementById("teams");

var n = 1;
let container;

dataObject["teams"].forEach(function(team) {
  container = document.createElement('div');
  container.className = "container-for-one-team one-team";

  var allGoals = team["goals"]

  console.log(allGoals)

  container.onclick = function() {
    clearGoalLine();
    allGoals.forEach(function(i) {
      console.log(i)
      drawALine(
        i["x1"],
        i["y1"],
        i["x2"],
        i["y2"]);

    })
  };

  let number = document.createElement('div');
  number.className = "number";
  number.innerHTML = n;
  container.appendChild(number);

  let name = document.createElement('div');
  name.className = "name";
  name.innerHTML = team["name"];
  container.appendChild(name);

  let games = document.createElement('div');
  games.className = "games";
  games.innerHTML = team["games"]
  container.appendChild(games);

  let moments = document.createElement('div');
  moments.className = "moments";
  moments.innerHTML = team["madeMoments"]
  container.appendChild(moments);

  let goals = document.createElement('div');
  goals.className = "goals";
  goals.innerHTML = team["goalsAmount"]
  container.appendChild(goals);

  let goalsInOur = document.createElement('div');
  goalsInOur.className = "goalsInOur";
  goalsInOur.innerHTML = team["goalsInOur"]
  container.appendChild(goalsInOur);

  let wins = document.createElement('div');
  wins.className = "wins";
  wins.innerHTML = team["wins"]
  container.appendChild(wins);

  let draw = document.createElement('div');
  draw.className = "draws";
  draw.innerHTML = team["draw"]
  container.appendChild(draw);

  let loses = document.createElement('div');
  loses.className = "loses";
  loses.innerHTML = team["loses"]
  container.appendChild(loses);

  let score = document.createElement('div');
  score.className = "score";
  score.innerHTML = team["score"]
  container.appendChild(score);

  allTeams.appendChild(container);

  n = n + 1;
})



