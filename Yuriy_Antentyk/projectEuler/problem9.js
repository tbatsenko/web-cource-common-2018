let ans;

for (let a = 1; a <= 1000 && !ans; ++a)
    for(let b = a + 1, c = 1000 - a - b; b <= 1000 && b < c && !ans; ++b, --c)
        if(a * a + b * b == c * c)
            ans = a * b * c;

console.log(ans);