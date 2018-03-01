import Bubble from "./Bubble";
import {bubbleService} from "./bubble.service"

export const animateTrailMotion = (xPos, yPos, canvas, context) => {

    let globalArr = bubbleService.getBubbleArr();
    const randomAmountBubbles = 2;
    const maxBubbles = 100;

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
        // start requestAnimationFrame - store id in variable in order to stop loop.
        let animationId = requestAnimationFrame(animate);
        bubbleService.setAnimationID(animationId);
        globalArr.forEach(bubble => bubble.update());
    }
    // protect from multiple initialisations of requestAnimationFrame:
    if(!bubbleService.getAnimationId()) {
        animate();
    }
};