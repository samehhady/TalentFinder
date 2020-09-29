let B = [];
B[0] = "..X...";
B[1] = "......";
B[2] = "....X.";
B[3] = ".X....";
B[4] = "..X.X.";
B[5] = "...O..";

let validSteps = 0;


console.log(solution(B));


function solution( b )
{
    b = b.reverse();

    let start = b.find( ( line ) =>
    {
        return line.includes( 'O' );
    } );

    let startX = getJafarIndex( start );
    let startY = b.indexOf( start );

    let valid = isValidStep( b, startX, startY );

    return valid;
}

// Check if the step is valid or not and increment it.
function isValidStep( array, x, y )
{
    let stepsR = getSteps( array, x, y, 'right' );
    let stepsL = getSteps( array, x, y, 'left' );
    if( stepsR.length > 1 && stepsR[0] == "X" && stepsR[1] == "." )
    {
        validSteps++;
        return isValidStep( array, x + 2, y + 2 );
    }
    else if( stepsL.length > 1 && stepsL[0] == "X" && stepsL[1] == "." )
    {
        validSteps++;
        return isValidStep( array, x - 2, y + 2 );
    }

    return validSteps;
}

// Get Jafar x index in board.
function getJafarIndex( line )
{
    return line.indexOf( 'O' );
}

// Get steps based on direction.
function getSteps( array, x, y, direction )
{
    let steps = [];
    let increment = 0;
    let jafarIndex = x;
    for ( let i = y; i < array.length; i++ )
    {
        increment = direction == 'right' ? jafarIndex++ : jafarIndex--;
        if( array[i][increment] )
        {
            steps.push( array[i][increment] );
        }
    }
    steps.shift();
    return steps;
}
