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
        plot(x, y, rule.Color);
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
function plot(x, y, color){
    context.fillStyle = color;
    context.fillRect(x * 800, -y * 800, 1, 1);
}

function pauseUnpause(){
    paused = !paused;
    if(!paused){
        iterate();
        pauseBtn.innerHTML = "Pause";
    }else{
        pauseBtn.innerHTML = "Start";
    }
}

// initializes rules array
function init(rules){

    for(let i=1;i <= rule_number;i++){

        // get all input sliders by ID
        let angle = (document.querySelector(`#a${i}`).value),
            sx = (document.querySelector(`#b${i}`).value),
            sy = (document.querySelector(`#c${i}`).value),
            tx = (document.querySelector(`#d${i}`).value),
            ty = (document.querySelector(`#e${i}`).value),
            weight = (document.querySelector(`#weight${i}`).value),
            color = document.querySelector(`#color${i}`).value;
        
        // add values of all input sliders to corresponding parameters of the rule
        let rule = {
            A: +(Math.cos(angle)*sx).toFixed(2),
            B: +(Math.sin(angle)*sy).toFixed(2),
            C: +(-Math.sin(angle)*sx).toFixed(2),
            D: +(Math.cos(angle)*sy).toFixed(2),
            E: parseFloat(tx),
            F: parseFloat(ty),
            W: parseFloat(weight),
            Color: color
        };

        // display values in textviews above the sliders
        let div = document.getElementById(`div${i}`);

        let a_para = div.getElementsByTagName("p")[0],
            b_para = div.getElementsByTagName('p')[1],
            c_para = div.getElementsByTagName('p')[2],
            d_para = div.getElementsByTagName('p')[3],
            e_para = div.getElementsByTagName('p')[4],
            weight_para = div.getElementsByTagName('p')[5];

        a_para.innerHTML = `Rotation: ${angle}`;
        b_para.innerHTML = `ScaleX: ${sx}`;
        c_para.innerHTML = `ScaleY: ${sy}`;
        d_para.innerHTML = `TranslateX: ${tx}`;
        e_para.innerHTML = `TranslateY: ${ty}`;
        weight_para.innerHTML = `Weight: ${weight}`;
        
        // append rule to rules[] array
        rules[i-1] = rule;
    }
    console.log(rules);
}

// update text field and canvas when user changes value
function updateValue(ele, value){
    // get id of element that called updateValue() function
    let id = ele.id;
    let class_name = ele.className;
    
    let obj = document.getElementById(`${id}`);

    // little string manipulation to display parameter name in textview
    let parameter = obj.previousElementSibling.textContent.split(':')[0];

    // update textview as user changes input
    obj.previousElementSibling.innerHTML = `${parameter}: ${value}`;

    //clear canvas
    context.clearRect(-width/4, -height, width, height);

    // clear rules array
    rules = [];

    // choose new X and Y values randomly
    if(class_name === "rotate"){
        let angle = parseFloat(obj.value);

        x1 = Math.cos(angle)*x + Math.sin(angle)*y;
        y1 = -Math.sin(angle)*x + Math.cos(angle)*y;

        x = x1;
        y = y1;

    }else if(class_name === "scale"){
        let sx = parseFloat(obj.value),
            sy = parseFloat(obj.value);

        x = sx*x;
        y = sy*y;
    }else if(class_name === "translate"){
        let tx = parseFloat(obj.value),
            ty = parseFloat(obj.value);

        x = x + tx;
        y = y + ty;
    }

    // reinitialize rules array
    init(rules); 
    
    if(paused){
        paused = false;
        pauseBtn.innerHTML = "Pause";
        iterate();
    }
}

// update parameters and canvas when apply button is clicked
let pauseBtn = document.getElementById("pauseBtn");
pauseBtn.addEventListener('click', function(){
    pauseUnpause();
}); 

let add_rule_btn = document.getElementById("add_rule"),
    remove_rule_btn = document.getElementById("remove_rule"),
    reset_btn = document.getElementById("resetBtn");

let rules_list_div = document.getElementById("rules_list");

let rule_number = 3;

add_rule_btn.addEventListener("click", function(){
        // alert("btn clicked");
        let rule = document.createElement("div");
        
        rule_number += 1;
        // console.log(rule_number);

        rule.innerHTML = `<div id="div${rule_number}" class="rule">
        <h5>Rule ${rule_number}</h5>
        <p>Rotate </p>
        <input id = "a${rule_number}" class="rotate" type="range" min="0" max="6.28" step=".04" value="0" oninput="updateValue(this, this.value)">
        <p>ScaleX </p>
        <input id = "b${rule_number}" class="scale" type="range" min="0" max="1" step=".01" value="0.5" oninput="updateValue(this, this.value)">
        <p>ScaleY </p>
        <input id = "c${rule_number}" class="scale" type="range" min="0" max="1" step=".01" value="0.5" oninput="updateValue(this, this.value)">
        <p>TranslateX </p>
        <input id = "d${rule_number}" class="translate" type="range" min="0" max="1" step=".01" value="0.25" oninput="updateValue(this, this.value)">
        <p>TranslateY </p>
        <input id = "e${rule_number}" class="translate" type="range" min="0" max="1" step=".01" value="0.35" oninput="updateValue(this, this.value)">
        <p>Weight </p>
        <input id = "weight${rule_number}" type="range" min="0" max="1" step=".01" value="0.35 " oninput="updateValue(this, this.value)">
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

reset_btn.addEventListener("click", function(){
    updateParameters(); 
 });

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
    <p>Weight </p>
    <input id = "weight${rule_number}" type="range" min="0" max="1" step=".01" value="${fractal.weight}" oninput="updateValue(this, this.value)">
    <p>Color</p>
    <input id = "color${rule_number}" type="color" value="${fractal.color}" oninput="updateValue(this, this.value)">
    </div>`

    rules_list_div.appendChild(rule);

}

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
    context.clearRect(-width/4  , -height, width, height);

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
    else if(selected_fractal === "Sierpinski Triangle"){
        // console.log("updated parameters 2");
        for(let i=0;i<3;i++){
            addRuleWithValues(SierpinskiTriangle[i]);
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

context.translate(width/4, height);

init(rules);

let x = Math.random(),
    y = Math.random();

iterate();
