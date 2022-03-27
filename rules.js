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
    for(let i = 0; i < 3; i++){
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

    for(let i=1;i<=3;i++){

        // get all input sliders by ID
        let angle = (document.getElementById(`a${i}`).value),
            sx = (document.getElementById(`b${i}`).value),
            sy = (document.getElementById(`c${i}`).value),
            tx = (document.getElementById(`d${i}`).value),
            ty = (document.getElementById(`e${i}`).value),
            weight = (document.getElementById(`weight${i}`).value);
        
        // add values of all input sliders to corresponding parameters of the rule
        let rule = {
            A: +(Math.cos(angle)*sx).toFixed(2),
            B: +(Math.sin(angle)*sy).toFixed(2),
            C: +(-Math.sin(angle)*sx).toFixed(2),
            D: +(Math.cos(angle)*sy).toFixed(2),
            E: parseFloat(tx),
            F: parseFloat(ty),
            W: parseFloat(weight)
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
    context.clearRect(-width/2, -height, width, height);

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
    }else{
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
