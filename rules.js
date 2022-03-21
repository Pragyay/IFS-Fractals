function iterate(){
    for(let j=0; j<100; j++){
        let rand = Math.random();
        let rule;
        for(let i = 0; i < 4; i++){
            let r = rules[i];
            // console.log(r.W);
            if(rand < r.W){
                rule = r;
                break;
            }else{  
                rand -= r.W;
            }
        }
        // console.log(`${j}th iteration`);
        let x1 = x * rule.A + y * rule.B + rule.E,
            y1 = x * rule.C + y * rule.D + rule.F;
        // console.log(`in iterate()${i}`);
        x = x1;
        y = y1;

        // console.log(`x = ${x}, y = ${y}`);
        plot(x, y);
    }
    requestAnimationFrame(iterate);
}

// function getRule(rules){
//     let rand = Math.random();
//     for(let i = 0; i < 4; i++){
//         let rule = rules[i];
//         console.log(rule);
//         if(rand < rule.W){
//             return rule;
//         }
//         // console.log("getRule() done");
//         rand -= rule.W;
//     }
// }

function plot(x, y){
    context.fillStyle = "black";
    context.fillRect(x * 60, -y * 60, 1, 1);
}

function init(rules){

    for(let i=1;i<=4;i++){
        let a = document.getElementById(`a${i}`),
            b = document.getElementById(`b${i}`),
            c = document.getElementById(`c${i}`),
            d = document.getElementById(`d${i}`),
            e = document.getElementById(`e${i}`),
            f = document.getElementById(`f${i}`),
            weight = document.getElementById(`weight${i}`);
        
        // console.log("added parameters");

        let rule = {
            A: parseFloat(a.value),
            B: parseFloat(b.value),
            C: parseFloat(c.value),
            D: parseFloat(d.value),
            E: parseFloat(e.value),
            F: parseFloat(f.value),
            W: parseFloat(weight.value)
        };

        // console.log(rule);  
    
        rules[i-1] = rule;
    }
    console.log(rules);
}

let canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    rules = [];

context.translate(width/2, height);
init(rules);
// console.log("breaks after init()");

let x = Math.random(),
    y = Math.random();

iterate();
// console.log("breaks after iterate()");

let applyBtn = document.getElementById("apply");
applyBtn.addEventListener('click', function(){
    console.log("apply btn clicked");
    context.clearRect(-width/2, -height, width, height);
    rules = [];

    x = Math.random();
    y = Math.random();

    init(rules); 
    // console.log("breaks after init()");
    
    
    iterate();
    // console.log("breaks after iterate()");
    
}); 