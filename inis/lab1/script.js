let numberOfFilms;

while (isNaN(numberOfFilms) || numberOfFilms<1)
{
    numberOfFilms = prompt("Сколько фильмов вы посмотрели?");
}


const personalMovieDB= {
    count: numberOfFilms,
    movies: {
    },
}


for (let i = 0; i < 2; i++)
{
    let question;
    let answer;

    while (question == null || question == '' || answer == '' || answer <=0 || answer == null || answer >10 || question.length > 50 )
    {
        question = prompt("Один из последних просмотренных фильмов?");
        answer = prompt("Оцените этот фильм");

    }

    personalMovieDB["movies"][question] = answer;
}







console.log(personalMovieDB)