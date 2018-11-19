const gcd = function(a, b) {
	while (b) {
        a %= b;
        let tmp = a;
        a = b;
        b = tmp;
	}
	return a;
}

const lca = function(a, b){
    return (a / gcd(a, b)) * b;
}

let res = 1;
for(let i = 1; i <= 20; ++i)
    res = lca(res, i);

console.log(res);
