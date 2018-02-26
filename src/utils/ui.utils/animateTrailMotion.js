export const animateTrailMotion = (xPos, yPos) => {

    const canvas = document.querySelector("#myCanvas");
    const context = canvas.getContext("2d");
    let alpha = 0.4;
    function update() {

        alpha = alpha - 0.01;

            context.beginPath();
            let randX = Math.floor((Math.random() * 20) + 1);
            let randY = Math.floor((Math.random() * 20) + 1);

            context.arc(xPos + randX * 10, yPos + randY * 10, randX % 8, 0, 2 * Math.PI, true);
            context.fillStyle = '#1a4271';
            context.fill();
            context.globalAlpha = alpha;


        if(alpha > 0.1) {
            requestAnimationFrame(update);
        }

        else {
            context.clearRect(0, 0, canvas.width, canvas.height)

        }
    }

    update();
};