let result = 0;
// Need to calculate 3,6...999 + 5,10...995 - 15,30...990, this is arichmetic progressions
result += (5 + 995) * (995 / 5) / 2;
result += (3 + 999) * (999 / 3) / 2;
result -= (15 + 990) * (990 / 15) / 2;
console.log(result);