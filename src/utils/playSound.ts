export const playSound = (count = 1) => {
    for (let i = 0; i < count; i++) {
        const audio = new Audio('sound/alarm-alert.mp3');
        audio.play();
    }
};
