class BubbleService {

    constructor() {
    this.arr = [];
    this.animationId = null;
    }

    getBubbleArr() {
        return this.arr;
    }

    getAnimationId() {
        return this.animationId;
    }

    setAnimationID(id) {
        this.animationId = id;
    }

    stopAnimation() {
        cancelAnimationFrame(this.animationId);
        this.arr = [];
    }
}

export let bubbleService = new BubbleService();