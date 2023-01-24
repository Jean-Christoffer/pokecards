function calculateCalories(carbs,protein,fat){
    let a = 4 * carbs
    let b = 4 * protein
    let c = 9 * fat
    return [a, b, c].reduce((a,b)=>{
        return a+b
    },1)
} 

console.log(calculateCalories(1,1,1))