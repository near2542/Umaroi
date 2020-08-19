function sum(a,b)
{
    return a+b;
}

function divide(a,b)
{
    return a/b;
}


function calculate(a,b,operator)
{
    return operator(a,b);
}


console.log(calculate(1,2,sum))

console.log(calculate(4,2,divide))




///calculate a b function

// let a =a , let b = b
//function(a,b)


