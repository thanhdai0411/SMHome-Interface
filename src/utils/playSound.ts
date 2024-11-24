export const playSound = (count = 1) => {
    const audio = new Audio('sound/alarm-alert.mp3');
    audio.play();
};
