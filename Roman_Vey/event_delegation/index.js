const setup = () => {
    // console.log(duplicate([1, 2, 3, 4, 5]))
    let containerElem = document.querySelector("#container")
    let unsubscribe = delegate(containerElem, "click", "button", function (e) {
        console.log(this)
        alert(e.target.innerText)
    })

    setTimeout(()=>{
        alert("Listener removed")
        unsubscribe()
    }, 1000000)
}

const delegate = (container, eventName, selector, func) => {
    let listenerFunction = (e) => {
        if (e.target.matches(selector)){
            func.call(e.target, e)
        }
    }
    container.addEventListener(eventName, listenerFunction)
    return () => container.removeEventListener(eventName, listenerFunction);
}


const duplicate = (nums) =>  [...nums, ...nums]
 

setup()


// const mult = (arr1) => {
//     const a = sum (arr1)
//     return (arr2) =>  a * sum(arr2)
// };
// ,
// const a = [1,2,3];
// const b = [4,5,6];
// const c = [7,8,9];

// multWithA =mult (a) 

// multWithA(a)
// multWithA(b)
// multWithA(c)