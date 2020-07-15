export const pickRandomArrayItem = (array) => {
  const range = array.length;

  return array[Math.floor(Math.random() * range)];
};

export const easeInQuad = (t) => {
  return t * t;
};

export const runAtIntervals = ({
  callbackInterval,
  intervals,
  intervalAzmiuth,
}) => {
  return new Promise((resolve) => {
    let rolls = 0;
    let intervalMultiplier = 0.1;
    let interval = 100;

    const roll = () => {
      intervalMultiplier = intervalMultiplier + easeInQuad(intervalMultiplier);
      interval = intervalMultiplier * intervalAzmiuth;
      rolls += 1;

      setTimeout(() => {
        callbackInterval();

        if (rolls !== intervals) {
          roll();
        } else {
          resolve();
        }
      }, interval);
    };

    roll();
  });
};
