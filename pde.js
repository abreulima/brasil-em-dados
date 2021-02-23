let grids;
let bars = [];
let flags = [];
let rank = 0;

let year;
let smallYear;

let counter = 1980;
let target = 1981;

let atm = 0;

function preload() 
{ 
    novas.forEach(element => {
        flags[element.name] = loadImage('assets/flags/' + element.name + '.png');
    });
} 

function setup()
{
    createCanvas(1920, 1080);
    grids = new Grid(OFFSET);
    year = new Label(1930, displayWidth - 300, displayHeight - 150, 64);
    smallYear = new Label(1930, displayWidth - 400, displayHeight - 250, 32);

    novas.forEach(element => 
    {
        let bar = new Race(element["name"], rank, element, "1980");
        bars.push(bar);
        rank += 1;
    });

}

function draw()
{
    background('white');

    counter = lerp(counter, target, 0.01)
    if (target - counter < 0.10) target += 1;


    smallYear.content = counter;
    year.content = Math.floor(counter);

    for (let [index, val] of bars.entries()) 
    {
        //console.log('%d: %s', index, value.rank);
        //if (val.)
        val.move();
        val.display();
        val.rank = index;
        
        //val.current = "1980";
        val.current = String(Math.floor(counter));
        
        //var pos = novas.findIndex(item => item.name == bars[newIndex].name)
        //val.target = novas[pos]["1980"];
    }

    bars.sort(function (a, b) {
        var n = a.value - b.value;
        //console.log(n);
        if (n != 0) return n;
        //console.log("Ops");
        var s = (a.name).localeCompare(b.name);
        return s;
    });

    bars.reverse();

    grids.display();
    year.display();
    smallYear.display();

    if(Math.floor(counter) == 2018)
    {
        //noLoop();
    } 

}

function mousePressed() 
{
    noLoop();
}

function mouseReleased() 
{
    loop();
}