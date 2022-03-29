// function that draws the fractals
function iterate(){
    for(let j=0; j<300; j++){
        // choose a rule
        let rule = getRule(rules);
        
        // use the rule parameters to get X and Y coordinates
        let x1 = x * rule.A + y * rule.B + rule.E,
            y1 = x * rule.C + y * rule.D + rule.F;
        
        x = x1;
        y = y1;

        // console.log(`x = ${x}, y = ${y}`);
        plot(x, y);
    }

    if(paused){
        return;
    }
    requestAnimationFrame(iterate);
}

// choosing a rule based on specified weight
function getRule(rules){
    let rand = Math.random();
    for(let i = 0; i < rule_number; i++){
        let rule = rules[i];
        if(rand < rule.W){
            return rule;
        }
        rand -= rule.W;
    }
}

// plot a rectangle at position (x,y)
function plot(x, y){
    context.fillStyle = "white";
    context.fillRect(x * 600, -y * 600, 1, 1);
}

// initializes rules array
function init(rules){

    for(let i = 1; i <= rule_number; i++){

        // get all input sliders by ID
        let a = document.getElementById(`a${i}`),
            b = document.getElementById(`b${i}`),
            c = document.getElementById(`c${i}`),
            d = document.getElementById(`d${i}`),
            e = document.getElementById(`e${i}`),
            f = document.getElementById(`f${i}`),
            weight = document.getElementById(`weight${i}`);
        
        // add values of all input sliders to corresponding parameters of the rule
        let rule = {
            A: parseFloat(a.value),
            B: parseFloat(b.value),
            C: parseFloat(c.value),
            D: parseFloat(d.value),
            E: parseFloat(e.value),
            F: parseFloat(f.value),
            W: parseFloat(weight.value)
        };

        // display values in textviews above the sliders
        let div = document.getElementById(`div${i}`);

        let a_para = div.getElementsByTagName("p")[0],
            b_para = div.getElementsByTagName('p')[1],
            c_para = div.getElementsByTagName('p')[2],
            d_para = div.getElementsByTagName('p')[3],
            e_para = div.getElementsByTagName('p')[4],
            f_para = div.getElementsByTagName('p')[5],
            weight_para = div.getElementsByTagName('p')[6];

        a_para.innerHTML = `A: ${rule.A}`;
        b_para.innerHTML = `B: ${rule.B}`;
        c_para.innerHTML = `C: ${rule.C}`;
        d_para.innerHTML = `D: ${rule.D}`;
        e_para.innerHTML = `E: ${rule.E}`;
        f_para.innerHTML = `F: ${rule.F}`;
        weight_para.innerHTML = `Weight: ${rule.W}`;
        
        // append rule to rules[] array
        rules[i-1] = rule;
    }
    console.log(rules);
}

// update text field and canvas when user changes value
function updateValue(ele, value){
    // get id of element that called updateValue() function
    let id = ele.id;
    
    let obj = document.getElementById(`${id}`);

    // little string manipulation to display parameter name in textview
    let parameter = id.slice(0,-1);
    parameter = parameter.charAt(0).toUpperCase() + parameter.slice(1);

    // update textview as user changes input
    obj.previousElementSibling.innerHTML = `${parameter}: ${value}`;

    //clear canvas
    context.clearRect(-width/2, -height, width, height);

    // clear rules array
    rules = [];

    // choose new X and Y values randomly
    x = Math.random();
    y = Math.random();

    // reinitialize rules array
    init(rules); 
    
    if(paused){
        paused = false;
        pauseBtn.innerHTML = "Pause";
    }
    // iterate();
}

// update parameters and canvas when apply button is clicked
let pauseBtn = document.getElementById("pauseBtn");
pauseBtn.addEventListener('click', function(){
    paused = !paused;
    if(!paused){
        iterate();
        pauseBtn.innerHTML = "Pause";
    }else{
        pauseBtn.innerHTML = "Start";
    }
}); 

let add_rule_btn = document.getElementById("add_rule"),
    remove_rule_btn = document.getElementById("remove_rule");

let rules_list_div = document.getElementById("rules_list");

let rule_number = 1;

add_rule_btn.addEventListener("click", function(){
        // alert("btn clicked");
        let rule = document.createElement("div");

        rule_number += 1;
        // console.log(rule_number);

        rule.innerHTML = `<div id="div${rule_number}" class="rule">
        <h5>Rule ${rule_number}</h5>
        <p>A </p>
        <input id = "a${rule_number}" type="range" min="-1" max="1" step=".01" value="0" oninput="updateValue(this, this.value)">
        <p>B </p>
        <input id = "b${rule_number}" type="range" min="-1" max="1" step=".01" value="0" oninput="updateValue(this, this.value)">
        <p>C </p>
        <input id = "c${rule_number}" type="range" min="-1" max="1" step=".01" value="0" oninput="updateValue(this, this.value)">
        <p>D </p>
        <input id = "d${rule_number}" type="range" min="-1" max="1" step=".01" value="0.2" oninput="updateValue(this, this.value)">
        <p>E </p>
        <input id = "e${rule_number}" type="range" min="-1" max="1" step=".01" value="0" oninput="updateValue(this, this.value)">
        <p>F </p>
        <input id = "f${rule_number}" type="range" min="-1" max="1" step=".01" value="0.01" oninput="updateValue(this, this.value)">
        <p>Weight </p>
        <input id = "weight${rule_number}" type="range" min="0" max="1" step=".01" value="0.01" oninput="updateValue(this, this.value)">
    </div>`

        rules_list_div.appendChild(rule);

        // rules.push(rule);
        rules = [];
        init(rules);
        // console.log(rules);  
});

remove_rule_btn.addEventListener("click", function(){

    if(rule_number > 0){
        let rule = document.querySelector(`#div${rule_number}`);
        rule.remove();
        rule_number -= 1;
        rules.pop();
        console.log(rules);
        // console.log(rule_number);
    }
});

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    rules = [],
    paused = false;

context.translate(width/2, height);

init(rules);

let x = Math.random(),
    y = Math.random();

iterate();
