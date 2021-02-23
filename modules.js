class Bar
{
    constructor(name, x, y, growth, growthRate, rank, max, image) 
    {
        this._name = name;
        this._x = x;
        this._y = y;
        this._growth = 0;
        this._growthRate = growthRate;
        this._color = "lightgreen";
        this._rank = rank;
        this._max = max;
        this._ylerp = 0;
        this._image = image;
    }

    move()
    {
        //this._growth += this._growthRate;
        //this._growth = min(this._max, this._growth);
        this._growth = lerp(this._growth , this._max, 0.05);
        this._ylerp = lerp(this._ylerp, 50 + this._rank * 60, 0.1);
    }

    display()
    {
        fill(this.barColor(this._name));
        noStroke();  
        rect(this._x, this._ylerp, this._growth, 50);
        fill("black"); 
        text(this._name, this._x + this._growth - textWidth(this._name) - 10, this._ylerp + 25 + 5);
        image(this._image, this._x - 90, this._ylerp, 70, 50);


        text( this._max / 40, this._x + this._growth - textWidth(this._name) + 25, this._ylerp + 25 + 5);


    }

    barColor(name)
    {
        if      (name == "AC") return color(250, 229, 136);  // 1  Acre
        else if (name == "AL") return color(255, 214, 165);  // 2  Alagoas
        else if (name == "AP") return color(242, 226, 186);   // 3  Amapa
        else if (name == "AM") return color(220, 242, 253);    // 4  Amazonas
        else if (name == "BA") return color(189, 224, 254); // 5  Bahia
        else if (name == "CE") return color(255, 196, 214);  // 6  Ceara
        else if (name == "DF") return color(178, 247, 239); // 7  Distrito Federal
        else if (name == "ES") return color(188, 244, 245);  // 8  Espirito Santo
        else if (name == "GO") return color(222, 192, 241); // 9  Goias
        else if (name == "MA") return color(211, 250, 199);  // 10  Maranhao

        else if (name == "MT") return color(223, 255, 214); // 11 Mato Grosso
        else if (name == "MS") return color(213, 242, 232);  // 12 Mato Grosso do Sul
        else if (name == "MG") return color(249, 189, 200); // 13 Minas Gerais
        else if (name == "PA") return color(249, 229, 216); // 14 Para
        else if (name == "PB") return color(207, 255, 229);  // 15 Paraiba
        else if (name == "PR") return color(255, 215, 186); // 16 Parana
        else if (name == "PE") return color(197, 222, 221);  // 17 Pernambuco
        else if (name == "PI") return color(178, 214, 184);    // 18 Piaui
        else if (name == "RJ") return color(255, 181, 167); // 19 Rio de Janeiro
        else if (name == "RN") return color(205, 193, 255);  // 20 Rio Grande do Norte

        else if (name == "RS") return color(217, 242, 180);  // 21 Rio Grande do Sul
        else if (name == "RO") return color(205, 229, 215); // 22 Rondonia
        else if (name == "RR") return color(186, 242, 187);    // 23 Roraima
        else if (name == "SC") return color(212, 224, 155); // 24 Santa Catarina
        else if (name == "SP") return color(243, 179, 145); // 25 Sao Paulo
        else if (name == "SE") return color(246, 212, 186); // 26 Sergipe
        else if (name == "TO") return color(235, 185, 223); // 27 Tocantinas

        else return color(121, 132, 120);
    }

    get growth()
    {
        return this._growth;
    }

    get name()
    {
        return this._name;
    }

    set rank(newRank)
    {
        this._rank = newRank;
    }

    set max(newMax)
    {
        this._max = newMax;
    }

}

class Label
{
    constructor(content, x, y, size)
    {
        this._content = content;
        this._x = x;
        this._y = y;
        this._size = size;
    }

    display()
    {
        fill('black');
        noStroke();
        textSize(this._size);
        text(this._content, this._x, this._y); 
    }

    set content(newContent)
    {
        this._content = newContent;
    }

}

class Grid
    {
        constructor(offset)
        {
            this._offset = offset;
        }

        display()
        {
            stroke(1);
            line(0, this._offset, displayWidth, this._offset);
            line(0, displayHeight -  this._offset, displayWidth, displayHeight -  this._offset);
            line(this._offset, 0, this._offset, displayHeight);
            line(displayWidth - this._offset, 0, displayWidth - this._offset, displayHeight);
        }
        
    }

class Race
{
    constructor(name, rank, data, current)
    {
        this._name = name;
        this._rank = rank;
        this._value = 0;
        this._target = data[current];

        this._data = data;
        this._current = current;
        this._ylerp = 0;

        this._increase = 0;

        this._final = 0;

        this._atm = 0;

    }

    set target(newTarget)
    {
        this._target = newTarget;
    }

    set current(newCurrent)
    {
        this._current = newCurrent;
        this._target = this._data[this._current] * 20;
        this._final = this._data[this._current];

    }

    set rank(newRank)
    {
        this._rank = newRank;
    }

    get target()
    {
        return this._target;
    }

    get name()
    {
        return this._name;
    }

    get value()
    {
        return this._value;
    }

    move()
    {

        this._value = lerp(this._value, this._target, 0.01);

        //this._value = this._value + 0.1;
        this._increase = lerp(this._increase, this._final, 0.01);
        this._ylerp = lerp(this._ylerp, OFFSET + (60 * this._rank), 0.05);
    }

    display()
    {

        noStroke();
        fill(this.barColor(this._name));
        // rect(x, y, w, h, [tl], [tr], [br], [bl])
        //rect(OFFSET, OFFSET + (60 * this._rank), 300 * 0.25, 210 * 0.25);
        //rect(OFFSET, this._ylerp, 300 * 0.25, 210 * 0.25);

        // Barra
        rect(OFFSET + 90, this._ylerp, this._value, 210 * 0.25);

        // text(str, x, y, x2, y2)
        fill('black');
        textSize(22);
        text(this._increase.toFixed(2), this._value + 50,  this._ylerp + 30);

        // text(str, x, y, x2, y2)
        fill('black');
        textSize(22);
        text(this._name, OFFSET + 90 + this._value + 10,  this._ylerp + 35);

        // text(this._name, OFFSET + this._target, this._ylerp + 25 + 5);

        // text("Hi", OFFSET + 90 + this._value, this._ylerp)

        // flag
        image(flags[this._name], OFFSET, this._ylerp, 300 * 0.25, 210 * 0.25);


    }

    barColor(name)
    {
        if      (name == "AC") return color(250, 229, 136);  // 1  Acre
        else if (name == "AL") return color(255, 214, 165);  // 2  Alagoas
        else if (name == "AP") return color(242, 226, 186);   // 3  Amapa
        else if (name == "AM") return color(220, 242, 253);    // 4  Amazonas
        else if (name == "BA") return color(189, 224, 254); // 5  Bahia
        else if (name == "CE") return color(255, 196, 214);  // 6  Ceara
        else if (name == "DF") return color(178, 247, 239); // 7  Distrito Federal
        else if (name == "ES") return color(188, 244, 245);  // 8  Espirito Santo
        else if (name == "GO") return color(222, 192, 241); // 9  Goias
        else if (name == "MA") return color(211, 250, 199);  // 10  Maranhao

        else if (name == "MT") return color(223, 255, 214); // 11 Mato Grosso
        else if (name == "MS") return color(213, 242, 232);  // 12 Mato Grosso do Sul
        else if (name == "MG") return color(249, 189, 200); // 13 Minas Gerais
        else if (name == "PA") return color(249, 229, 216); // 14 Para
        else if (name == "PB") return color(207, 255, 229);  // 15 Paraiba
        else if (name == "PR") return color(255, 215, 186); // 16 Parana
        else if (name == "PE") return color(197, 222, 221);  // 17 Pernambuco
        else if (name == "PI") return color(178, 214, 184);    // 18 Piaui
        else if (name == "RJ") return color(255, 181, 167); // 19 Rio de Janeiro
        else if (name == "RN") return color(205, 193, 255);  // 20 Rio Grande do Norte

        else if (name == "RS") return color(217, 242, 180);  // 21 Rio Grande do Sul
        else if (name == "RO") return color(205, 229, 215); // 22 Rondonia
        else if (name == "RR") return color(186, 242, 187);    // 23 Roraima
        else if (name == "SC") return color(212, 224, 155); // 24 Santa Catarina
        else if (name == "SP") return color(243, 179, 145); // 25 Sao Paulo
        else if (name == "SE") return color(246, 212, 186); // 26 Sergipe
        else if (name == "TO") return color(235, 185, 223); // 27 Tocantinas

        else return color(121, 132, 120);
    }

}