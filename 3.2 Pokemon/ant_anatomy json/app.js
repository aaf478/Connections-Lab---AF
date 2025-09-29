window.addEventListener('load', function () {
    console.log('The page has loaded.');



    fetch('http://api.open-notify.org/astros.json')
        .then(response => response.json())
        .then(data => {
            // do something else with the data
            console.log(data.number);

            // let infoContainer = document.getElementById('info_containter');
            // let ant_parts = data.parts[0]
            // console.log(ant_parts)
            // infoContainer.innerText= ant_part
        })
.catch(error => {
    console.log("Error!!! :" + error);
})
})

//rewriting anonymous function - fat arrow syntax

// function(a) {
//     return a+10;
// }

// // 1. Remove the word function, replace with arrow  =>
//   (a) => {
//     return a+10;
//   }

//   //2. Remove the brackets if there is only one argument 
// a => return a+10;
  
// //3. Remove "return" if that's the only thing happening in the function
// a => a+10; 
