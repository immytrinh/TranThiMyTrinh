import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from './solution';

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