var order ;
var n;
var arr;

function readNum(){
    c = document.getElementById("numOfVar");
    init(c.value)
    const clear = document.getElementById("divCoeff")
    // console.log(clear)
    if(clear != null )
    {
        console.log("clear")
        clear.remove()
    }
    
    console.log("order = "+ order)
    console.log("n = " + n)
    drawFields()
}

function init(num){
    order = 1 + parseInt(num)
    n = Math.floor((order+1)/2)
    arr = new Array(order)
    for(var i = 0 ; i < order ; i++)
        arr[i] = new Array(n).fill(0.0);
}

function drawFields(){
    // div for all coefficients and their button
    var divForAll = document.createElement("div");
    divForAll.className = "divCoeff"
    divForAll.id = "divCoeff"
    // add fields
    for(var i = 0 ; i < order ; i++)
    {
        // add lable for each degree
        var lb = document.createElement("label");
        lb.innerHTML = "s^"+(order-1-i);
        var coef = document.createElement("input")
        // add input field for each degree
        coef.className = "coeff"
        coef.id = "s"+(order-1-i)
        divForAll.appendChild(coef)
        divForAll.appendChild(lb)
        
    }
    // add the button
    var but = document.createElement("button")
    but.innerHTML = "Solve"
    but.className = "ok"
    but.onclick = solve
    divForAll.appendChild(but)
    // add all for the existing div
    var c = document.getElementById("all")
    c.appendChild(divForAll)
}

function solve(){
    fillArray(arr);
    // // -1   -> zero at i
    // // num  -> unstable right root = num
    // // 0    -> stable
    var ans = document.createElement("label");
    ans.className = "ans"
    var n = calc()
    console.log(arr)
    if(n === 0)
    {
        ans.innerHTML = "System is stable"
    }
    else if(n > 0)
    {
        ans.innerHTML = "System is unstable and the number of unstable roots = " + n
    }
    else if(n === -1)
    {
        swap()
        calc()
    }
    var c = document.getElementById("divCoeff")
    c.appendChild(ans)
    
}

function fillArray(array){
    for(var i = 0 ; i < 2 ; i++)
    {
        for(var j = 0 ; j < n ; j++)
        {
            var input = document.getElementById("s"+(order-(i+2*j)-1))
            if(input === null)
                array[i][j] = 0.0;
            else
            {
                array[i][j] = parseFloat(input.value)
            }   
        }
    }
}

function calc(){
    for(var i = 2 ; i < order ; i++)
    {
        for(var j = 0 ; j < n ; j++)
        {
            
            var temp = arr[i-1][0]*arr[i-2][j+1] - arr[i-2][0]*arr[i-1][j+1]
            console.log("i= " + i + " j= " + j + " temp= "+temp)
            if(Number.isNaN(temp))
                arr[i][j] = 0;
            else
                arr[i][j] = temp/arr[i-1][0]
            var c = checkZero(i)
            if(c === 1){
                return -1;
            }
            else if(c > 1){
                useDerivative(i)
            }
        }
    }
    return checkSign()
}

function swap(){
    for(var i = 0; i < n/2 ; i++)
    {
        var temp = arr[0][i]
        arr[0][i] = arr[0][n-i-1]
        arr[0][n-i-1] = temp
    }
    var tn = n;
    if(n%2 === 1)
        tn--;
    for(i = 0 ; i < tn ; i++)
    {
        temp = arr[1][i]
        arr[1][i] = arr[1][tn-i-1]
        arr[1][tn-i-1] = temp
    }
}

function useDerivative(i){
    var start = order-i
    for(var j = 0 ; j < n ; j++){
        if(arr[i-1][j] !== 0)
        {
            arr[i][j] = arr[i-1][j]*start
            start = Math.max(start-2, 0)
        }
    }
}

function checkZero(i){
    var ans = 0
    if(arr[i][0] === 0)
    {
        ans = 1
        for(var j = 1 ; j < n ; j++)
        {
            if(arr[i][j] ===0)
                ans++
        }
    }
    return ans
}

function checkSign(){
    var ans = 0
    var prev = arr[0][0];
    var cur;
    for(var i = 1 ; i < order ;i++){
        cur = arr[i][0]
        if((prev > 0) !== (cur > 0))
            ans++
        prev = arr[i][0]
    }
    return ans
}
