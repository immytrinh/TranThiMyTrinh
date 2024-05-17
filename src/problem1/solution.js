// using loop
const sum_to_n_a = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// using formula
const sum_to_n_b = function(n) {
    return n * (n + 1) / 2;
};

// using recursion
const sum_to_n_c = function(n) {
    if (n === 1) {
        return 1;
    }
    return n + sum_to_n_c(n - 1);
};

// test in terminal
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter a number: ', (answer) => {
    const num = parseInt(answer);
    if (!isNaN(num)) {
        console.log('Sum using loop:', sum_to_n_a(num));
        console.log('Sum using formula:', sum_to_n_b(num));
        console.log('Sum using recursion:', sum_to_n_c(num));
    } else {
        console.log('Invalid input. Please enter a number.');
    }
    rl.close();
});