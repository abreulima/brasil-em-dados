let barA;
let barB;

let i = 0;
let k = 0;

let ano = 1980;
let target = 1981;

let newIndex = 0;

let bars = []

let flags = [];

let next = false;

function preload() 
{ 
    taxas.forEach((taxa) => {
        if (taxa["período"] == 2017)
        {
            flags[k] = loadImage('assets/flags/' + taxa["nome"] + '.png');
            k += 1;
        }
    });
} 

function setup()
{
    createCanvas(1920, 1080);
    frameRate(30);


    anoLabel = new Label("", 500, 500);
    truncLabel = new Label("", 500, 550);

    
    taxas.forEach((taxa) => {
        if (taxa["período"] == 2017)
        {
            bars[i] = new Bar(taxa["nome"], 150, 50 + 60*i, 0, (Math.random() * 10) + 1, i, taxa["valor"], flags[i]);
            i += 1;
        }
    });


}

function draw()
{

    background('white');

    for(var i = 0; i < 27; i++)
    {
        bars[i].display();
        bars[i].move();

        var index = bars.findIndex(item => item.name == bars[i].name)
        bars[i].rank = index;

        console.log(bars[i].name, bars[i].growth)
    }
  
    ano = lerp(ano, target, 0.03)

    if (target - ano < 0.1)
    {
        target += 1;
        next = true;
    }

    taxas.forEach((taxa) => {
        if (taxa["período"] == Math.trunc(ano) && next)
        {

            
            var pos = bars.findIndex(item => item.name == bars[newIndex].name)
            newIndex += 1;
            bars[pos].max = taxa['valor'];

            if (newIndex > 26)
            {
                newIndex = 0;
            }

            next = false;


        }
    });

    anoLabel.display();
    anoLabel.content = ano;

    truncLabel.display();
    truncLabel.content = Math.trunc(ano);

    bars.sort(function (a, b) {
        var n = a.growth - b.growth;

        if (n !== 0)
        {
            return n;
        }

        return (a.name).localeCompare(b.name)

    });

    bars.reverse();

    year.content = "Hi";
    
}

function mousePressed() 
{
    noLoop();
}

function mouseReleased() 
{
    loop();
}