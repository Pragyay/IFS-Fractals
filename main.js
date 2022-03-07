let add_rule_btn = document.getElementById("add_rule"),
    remove_rule_btn = document.getElementById("remove_rule");

let rules_list = document.getElementById("rules_list");

let rule_number = 0;

add_rule_btn.addEventListener("click", function(){
        // alert("btn clicked");
        let rule = document.createElement("div");
        
        rule_number += 1;
        console.log(rule_number);

        rule.id = `div${rule_number}`;

        rule.innerHTML = `<h5>Rule ${rule_number}</h5>
        <p>Rotation: </p>
        <input id = "Rotation" type="range" min="0" max="100" step="" value="">
        <p>Scale x: </p>
        <input id = "sx" type="range" min="0" max="100" step="" value="">
        <p>Scale Y: </p>
        <input id = "sy" type="range" min="0" max="100" step="" value="">
        <p>Translate X: </p>
        <input id = "tx" type="range" min="0" max="100" step="" value="">
        <p>Translate Y: </p>
        <input id = "ty" type="range" min="0" max="100" step="" value="">
        <p>Weight: </p>
        <input id = "weight" type="range" min="0" max="1" step="" value="">`

        rule.classList.add("rule");
        
        rules_list.appendChild(rule);
});

remove_rule_btn.addEventListener("click", function(){
    
    if(rule_number > 0){
        let rule = document.querySelector(`#div${rule_number}`);
        rule.remove();
        rule_number -= 1;
        console.log(rule_number);
    }
});
