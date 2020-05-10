export default data = function generateData(s){
    var data = [];
    for(let i=0; i<s; i++) {
        data.push(Math.floor(Math.random() * 130) + 100);
    }
    return data;
}