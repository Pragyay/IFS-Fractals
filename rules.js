// function that draws the fractals
function iterate(){
    console.log("iterate called");
    
    for(let j=0; j<200; j++){
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
        cancelAnimationFrame(id);
        return;
    }
    let id = requestAnimationFrame(iterate);
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
    context.fillRect(x * 60, -y * 60 - 100, 1, 1);
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
        iterate();
    }
}

// function to add a rule with default values
function addRule(){
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
    <input id = "e${rule_number}" type="range" min="-2" max="2" step=".01" value="0" oninput="updateValue(this, this.value)">
    <p>F </p>
    <input id = "f${rule_number}" type="range" min="-2" max="2" step=".01" value="0.01" oninput="updateValue(this, this.value)">
    <p>Weight </p>
    <input id = "weight${rule_number}" type="range" min="0" max="1" step=".01" value="0.01" oninput="updateValue(this, this.value)">
    </div>`

    rules_list_div.appendChild(rule);

    // rules.push(rule);
    rules = [];
    init(rules);
    // console.log(rules);  
    
}

// function to add a rule with pre-defined values of specified fractal
function addRuleWithValues(fractal){
    let rule = document.createElement("div");

    rule_number += 1;
    // console.log(rule_number);

    rule.innerHTML = `<div id="div${rule_number}" class="rule">
    <h5>Rule ${rule_number}</h5>
    <p>A </p>
    <input id = "a${rule_number}" type="range" min="-1" max="1" step=".01" value="${fractal.a}" oninput="updateValue(this, this.value)">
    <p>B </p>
    <input id = "b${rule_number}" type="range" min="-1" max="1" step=".01" value="${fractal.b}" oninput="updateValue(this, this.value)">
    <p>C </p>
    <input id = "c${rule_number}" type="range" min="-1" max="1" step=".01" value="${fractal.c}" oninput="updateValue(this, this.value)">
    <p>D </p>
    <input id = "d${rule_number}" type="range" min="-1" max="1" step=".01" value="${fractal.d}" oninput="updateValue(this, this.value)">
    <p>E </p>
    <input id = "e${rule_number}" type="range" min="-2" max="2" step=".01" value="${fractal.e}" oninput="updateValue(this, this.value)">
    <p>F </p>
    <input id = "f${rule_number}" type="range" min="-2" max="2" step=".01" value="${fractal.f}" oninput="updateValue(this, this.value)">
    <p>Weight </p>
    <input id = "weight${rule_number}" type="range" min="0" max="1" step=".01" value="${fractal.weight}" oninput="updateValue(this, this.value)">
    </div>`

    rules_list_div.appendChild(rule);

}

//  if(paused){
//     unpause, call iterate() and update html of pauseBtn accordingly
// } else{
//     pause and update html of pauseBtn accordingly
// }
function pauseUnpause(){
    paused = !paused;
    if(!paused){
        iterate();
        pauseBtn.innerHTML = "Pause";
    }else{
        pauseBtn.innerHTML = "Start";
    }
}

// update parameters and canvas when apply button is clicked
let pauseBtn = document.getElementById("pauseBtn");
pauseBtn.addEventListener('click', function(){
    pauseUnpause();
}); 

let add_rule_btn = document.getElementById("add_rule"),
    remove_rule_btn = document.getElementById("remove_rule");

let rules_list_div = document.getElementById("rules_list");

let rule_number = 4;

// add a rule
add_rule_btn.addEventListener("click", function(){
        // alert("btn clicked");
        addRule();
});

// remove a rule
remove_rule_btn.addEventListener("click", function(){

    if(rule_number > 0){
        // paused = true;
        let rule = document.querySelector(`#div${rule_number}`);
        rule.remove();
        rule_number -= 1;
        rules.pop();
        // pauseUnpause();
        console.log(rules);
        // console.log(rule_number);
    }
});

// called when user selects a fractal from dropdown
// - clears all <divs> inside rules_list <div>
// - clears rules[] array
// - clears canvas
// - then calls addRuleWithValues(fractal_name)

function updateParameters(){
    paused = true;
    // get the fractal that is selected
    let option = document.getElementById("fractal");
    let selected_fractal = option.options[option.selectedIndex].value;

    // clear rules <div> inside rules_list <div>
    while(rules_list_div.firstChild){
            rules_list_div.removeChild(rules_list_div.lastChild);
    }
    // reset rule_number to 0
    rule_number = 0;    

    // clear rules array
    rules = [];

    // clear canvas
    context.clearRect(-width/2, -height, width, height);

    if(selected_fractal === "Barnsley Fern"){
        // console.log("updated parameters 1");
        for(let i=0;i<4;i++){
            addRuleWithValues(BarnsleyFern[i]);
        }
        init(rules);
    }
    else if(selected_fractal === "Vortex"){
        // console.log("updated parameters 2");
        for(let i=0;i<2;i++){
            addRuleWithValues(Vortex[i]);
        }
        init(rules);
    }
    else if(selected_fractal === "IFS Dragon"){
        // console.log("updated parameters 2");
        for(let i=0;i<2;i++){
            addRuleWithValues(IFSDragon[i]);
        }
        init(rules);
    }
    else if(selected_fractal === "Maple Leaf"){
        // console.log("updated parameters 2");
        for(let i=0;i<4;i++){
            addRuleWithValues(MapleLeaf[i]);
        }
        init(rules);
    }
    pauseUnpause();
}

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
