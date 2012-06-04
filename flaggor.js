var draw = startCanvas("maincanvas");

// Styr flaggorna med variabler
// Bredd - höjd
// Övre vänster hörn som utgångspunkt
// placering av "korsrutor"

// Lägg till en "isMoving" egenskap för varje flagga
// Lägg till en "direction" egenskap för varje flagga
// Testa att det inte blir error i konsollen
// Pusha till github

var f_width = 200, f_height = 100;
var xspace = 326;

var flags = [
   {
       x : 100,
       y : 50,
       bg: "blue",
       fg: "yellow",
       dir: -2,
       isMoving : false
   },
   {
       x : 100 + xspace,
       y : 50,
       bg: "red",
       fg: "white",
       dir: -2,
       isMoving : false
   },
   {
       x : 100 + xspace * 2,
       y : 50,
       bg: "white",
       fg: "blue",
       dir: -2,
       isMoving : false
       /*
           console.log("hit");
            flag1_dir = -flag1_dir;
            if (!moveFlag.isMoving) {
                moveFlag.isMoving = true;
                moveFlag(2);
            }
       */
   }
];

function drawFlag(x, y, bg_color, x_color) {
    draw.fillRect(x, y, f_width, f_height, bg_color);
    // Räkna ut korsets placering och bredd
    var middle = y + f_height/2;
    var bar_width = f_height/4;
    draw.fillRect(x + f_width * 0.3, y, bar_width, f_height, x_color);
    draw.fillRect(x, middle - bar_width/2, f_width, bar_width, x_color);
}
for ( var i = 0, antal = flags.length; i < antal; i += 1 ) {
   drawFlag(flags[i].x, flags[i].y, flags[i].bg, flags[i].fg);
}
// Gör om till loop
// Flaggstänger - hur ser matematiken ut relativt flaggan?

for ( var i = 0, antal = flags.length; i < antal; i +=1) {
   draw.fillRect(flags[i].x - 25, 40, flags[i].y - 25, 420, "white");
   draw.circle  (flags[i].x - 13, 30, flags[i].y - 30, "gold");
}

// Går flaggan upp eller ner - 1 = ner, -1 = upp
var flag1_dir = -2;

// Händelsen musklick (1)

draw.canvas().onclick = function (evt) {
    console.log("x: " + evt.pageX + "| y: " + evt.pageY);
    var realX = evt.pageX - draw.canvasX();
    var realY = evt.pageY - draw.canvasY();
    for ( var i = 0, antal = flags.length; i < antal; i += 1 ) {
        if ( flags[i].x <= realX &&
             flags[i].x + f_width >= realX &&
             flags[i].y <= realY &&
             flags[i].y + f_height >= realY
           ) {
            console.log("hit");
            flags[i].dir = -flags[i].dir;
            if (!flags[i].isMoving) {
                flags[i].isMoving = true;
                moveFlag(i);
            }
        }
    }
}

function moveFlag(which) {
    console.log("which: " + which);
    // Radera flaggans gamla läge
    draw.raw().clearRect(flags[which].x, flags[which].y, f_width, f_height);
    flags[which].y += flags[which].dir;
    // stanna flaggan
    if ( flags[which].y < 50 ) {
        flags[which].y = 50;
        flags[which].isMoving = false;
    }
    if ( flags[which].y > 350 ) {
        console.log(flags[which].y);
        flags[which].y = 350;
        flags[which].isMoving = false;
    }
    drawFlag(flags[which].x, flags[which].y, flags[which].bg, flags[which].fg);
    // Test om den inte är i botten
    if (flags[which].isMoving) {
        setTimeout(moveFlag, 40, which);
    }
}


// flagga (2)




