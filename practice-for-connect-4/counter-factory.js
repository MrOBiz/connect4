function Counter(start = 0){
    let count = start;
    const increase = () => {count++;};
    const getCount = () => count;
    return {increase, getCount};
}

const c = Counter();
c.increase();
console.log(c.getCount());

const fromTen = Counter(10);
fromTen.increase();
console.log(fromTen.getCount());