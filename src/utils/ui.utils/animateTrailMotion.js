import Bubble from "./Bubble";
import {bubbleService} from "./bubble.service"

export const animateTrailMotion = (xPos, yPos, canvas, context) => {

    const randomAmountBubbles = 2;
    const maxBubbles = 100;
    let globalArr = bubbleService.get();

    // create array of random bubbles
    for (let i = 0; i < randomAmountBubbles; i++) {
        let randX = Math.floor((Math.random() * 20) + 1);
        let randY = Math.floor((Math.random() * 20) + 1);
        let bubble = new Bubble(xPos + randX * 10, yPos + randY * 10, randX, context);

        if(globalArr.length > maxBubbles) {
            globalArr.shift();
        }
        globalArr.push(bubble);
    }

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        let globalID = requestAnimationFrame(animate);
        bubbleService.setAnimationID(globalID);
            globalArr.forEach(bubble => bubble.update());
    }
    if(!bubbleService.getAnimationId()) {
        animate();
    }
};