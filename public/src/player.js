class Player {
    constructor(position) {
        this.position = position;
        this.size = new Vector(30, 30);
        this.velocity = new Vector(0, 0);

        this.oldPosition = new Vector(width/2, height/2);

        this.jumpReady = false;
    }
    update() {
        //movement
        const moveSpeedX = 2;
        if (keyIsDown(65)) {
            this.velocity.x += -moveSpeedX;
        }
        if (keyIsDown(68)) {
            this.velocity.x += moveSpeedX;
        }

        // velocity
        this.velocity.y += GRAVITY;
        this.velocity.x *= FRICTION;
        this.velocity.y *= FRICTION;

        // position
        // Y
        this.position.y += this.velocity.y;
        if (this.colision()) {
            this.jumpReady = true;
            this.position.y -= this.velocity.y;
            this.velocity.y *= -.1; // change for restitution
        }
        // X
        this.position.x += this.velocity.x;
        if (this.colision()) {
            this.jumpReady = true;
            this.position.x -= this.velocity.x;
            this.velocity.x *= -.1; // change for restitution
        }

        // finish
        IDEALCAMERAOFFSET.x += this.oldPosition.x - this.position.x;
        IDEALCAMERAOFFSET.y += this.oldPosition.y - this.position.y;

        this.show();
        this.oldPosition.x = this.position.x;
        this.oldPosition.y = this.position.y;
    }
    show() {
        fill(0, 0, 255);
        rect(this.position.x + CURRENTCAMERAOFFSET.x, this.position.y + CURRENTCAMERAOFFSET.y, this.size.x, this.size.y);
    }
    colision() {
        for (let brick of bricks) {
            if (this.position.x + this.size.x > brick.position.x && this.position.x < brick.position.x + brick.size.x) {
                if (this.position.y + this.size.y > brick.position.y && this.position.y < brick.position.y + brick.size.y) {
                    return true;
                }
            }
        }
        return false;
    }
    interprete(key) {
        switch (key) {
            case 'w':
                if (this.jumpReady) {
                    this.velocity.y = -20;
                }
                this.jumpReady = false;
            break;
            // these are depricated and done in the main update function
            // case 'a':
            //     this.velocity.x = 0;
            //     this.velocity.x -= 10;
            // break;
            // case 'd':
            //     this.velocity.x = 0;
            //     this.velocity.x += 10;
            // break;
        }
    }
}