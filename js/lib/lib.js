export const pickRandomArrayItem = (array) => {
    const range = array.length;
    
    return array[Math.floor(Math.random() * range)];
}