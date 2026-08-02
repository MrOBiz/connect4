//COUNTER FACTORY
function Counter(start = 0){
    let count = start;
    const increaseCount = () => {count++;};
    const getCount = () => count;
    return {increase, getCount};
}

const c = Counter();
c.increase();
console.log(c.getCount());

const fromTen = Counter(10);
fromTen.increase();
console.log(fromTen.getCount());

/* console.log(count); doesn't work, it's private because of closure */

//ROW OF 5 COUNTERS
function CounterArray(){
    const row = new Array();

    const add = (start) => {row.push(Counter(start));};
    const list = () => row.map((s) => s.getCount()); 
    return { add, list};
}


let rowOne = new CounterArray();
rowOne.add(13);
rowOne.add(3);
rowOne.add(7);
console.log(rowOne.list());