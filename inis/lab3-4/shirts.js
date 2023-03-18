const shirts = [{
    "name": "Beep Boop",
    "description": "Once upon a time, a mighty guide guarded the intersection of Forbes and Morewood, and would dutifully direct distracted college students when it was safe to cross the street. Its voice was soothing, strong, and steady. Its name was beep boop.",
    "price": "$19.99",
    "colors": {
        "white": {
            "front": "shirt_images/beepboop-white-front.png",
            "back": "shirt_images/beepboop-white-back.png"
        },
        "blue": {
            "front": "shirt_images/beepboop-blue-front.png",
            "back": "shirt_images/beepboop-blue-back.png"
        },
        "pink": {
            "front": "shirt_images/beepboop-pink-front.png",
            "back": "shirt_images/beepboop-pink-back.png"
        },
        "red": {
            "front": "shirt_images/beepboop-red-front.png",
            "back": "shirt_images/beepboop-red-back.png"
        }
    },
    "default": {
        "front": "shirt_images/default-m-front.png",
        "back": "shirt_images/default-m-back.png"
    }
},
    {
        "name": "Car",
        "description": "As you move in to campus, one of the first memories so many students have is driving up to their dorm, unloading their bags, and moving in. How do they arrive to campus? By car, of course!",
        "price": "$10.99",
        "colors": {
            "white": {
                "front": "shirt_images/car-white-front.png",
                "back": "shirt_images/car-white-back.png"
            },
            "blue": {
                "front": "shirt_images/car-blue-front.png",
                "back": "shirt_images/car-blue-back.png"
            },
            "green": {
                "front": "shirt_images/car-green-front.png",
                "back": "shirt_images/car-green-back.png"
            },
            "yellow": {
                "front": "shirt_images/car-yellow-front.png",
                "back": "shirt_images/car-yellow-back.png"
            },
            "red": {
                "front": "shirt_images/car-red-front.png",
                "back": "shirt_images/car-red-back.png"
            }
        },
        "default": {
            "front": "shirt_images/default-w-front.png",
            "back": "shirt_images/default-w-back.png"
        }
    },
    {
        "name": "Forever Plaid",
        "price": "$13.99",
        "description": "Proudly wear your tartan plaid as a patch on your front shirt pocket. And on the back, ask the important question that all CMU students should know the answer to: got plaid?",
        "colors": {
            "white": {
                "front": "shirt_images/plaid-white-front.png",
                "back": "shirt_images/plaid-white-back.png"
            },
            "pink": {
                "front": "shirt_images/plaid-pink-front.png",
                "back": "shirt_images/plaid-pink-back.png"
            }
        },
        "default": {
            "front": "shirt_images/default-w-front.png",
            "back": "shirt_images/default-w-back.png"
        }
    },
    {
        "name": "BSUIR",
        "description": "BSUIR mission is to train engineers and scientists capable of generating and implementing innovative ideas, creating competitive high technology products in the spheres of computer science and electronics.",
        "price": "$6.99",
        "colors": {
            "white": {
                "front": "shirt_images/bsuir-white-front.png",
                "back": "shirt_images/bsuir-white-back.png"
            }
        },
        "default": {
            "front": "shirt_images/default-m-front.png",
            "back": "shirt_images/default-m-back.png"
        },

    }];




var out = '';
for (key in shirts)
{

    out += '<div class = "single-shirt">';
    out +='<img src="'+shirts[key].colors.white.front+'">';
    out += '<h4>' + shirts[key].name + '</h4>';
    out += '<p id = "count">'+ 'Availiable ' + Object.keys(shirts[key].colors).length + ' colors' +'</p>';
    out += '<button class="quick_view" id="' + shirts[key].name + '">Quick View</button>';
    out += '<button class="see_page" id="' + shirts[key].name  + '">See Page</button>';
    out +='</div>';

}

document.getElementById('out').innerHTML = out;



var modal = document.getElementById('myModal');    // переменная для работы с модальным окном
var modal2 = document.getElementById('myModal2');
var button_quick_view = document.querySelectorAll('button.quick_view');  // переменная для работы с quick_view
var button_see_page = document.querySelectorAll('button.see_page');



for(var i = 0; i<button_see_page.length; i++) {
 button_see_page[i].addEventListener('click', function (e)
    {

    localStorage.clear();

        let a = (e.target.getAttribute('id'));   // берем айди выбранного элемента по кнопке
        let object = shirts.find(obj => obj.name === a);

        let name = object.name;
        let price = object.price + '<br>';



        localStorage.setItem('name', name);
        localStorage.setItem('price',price);




       var dict = object.colors;
        let count = 0;
        for (var prop in dict) {
            count = count +1;

            localStorage.setItem(count,prop);
            localStorage.setItem(prop+'_front',dict[prop]['front']);
            localStorage.setItem(prop+'_back',dict[prop]['back']);

        }



        location = 'details.html';
    })
}







for(var i=0; i<button_quick_view.length; i++){
    button_quick_view[i].addEventListener('click', function(e)
    {
        let quick_out = '';
        modal.style.display = "block";
        let a = (e.target.getAttribute('id'));   // берем айди выбранного элемента по кнопке
        let object = shirts.find(obj => obj.name === a);
        let name = object.name;
        let price = object.price;
        let default_front = object.colors.white.front;
        let default_back = object.colors.white.back;

        quick_out += '<img src="'+default_front+'">';
        quick_out += '<img src="'+default_back+'">'+ '<br>';
        quick_out += '<h3>'+name+'</h3>' + '<br>';
        quick_out += price;
        document.getElementById('quick_out').innerHTML = quick_out;

    })
}













window.onclick = function(event)
{
    if(event.target == modal)
    {
        modal.style.display = "none";
    }

    if(event.target == modal2)
    {
        modal2.style.display = "none";
    }
}

