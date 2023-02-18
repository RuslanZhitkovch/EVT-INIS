
function output(object) {
     if(object[3] == false)
     {

         let table = document.createElement('table');
         document.body.append(table);
         let rowHeader = table.insertRow();
         for (let prop in object[0])
         {
             let cell = rowHeader.insertCell();
             cell.innerText = prop;
             console.log(prop);

         }


         for (let i = 0; i < object.length; i++)
         {
             let row = table.insertRow();
             for (let prop in object[i])
             {
                 let cell = row.insertCell();
                 cell.innerText = object[i][prop];
             }
         }


     }


}







const peronalMovieDB = [

    {
    name: "Пираммида",
    score: 7,
    },

    {
        name: "Брат",
        score: "10",
    },

    {
       name: "Брат2",
       score: "10",

    },
    privat = false,
]




output(peronalMovieDB);



