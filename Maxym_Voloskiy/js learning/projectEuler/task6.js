// Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

(function task6(n) {
   var sq_sum = 0;
   var sum_sq = 0;
   var i = 0;

   while (i <= n) {
       sq_sum += Math.pow(i, 2);
       sum_sq += i;
       i++;
   }

   var hence = Math.pow(sum_sq, 2) - sq_sum;

   console.log(hence);
   return hence;

}(100));