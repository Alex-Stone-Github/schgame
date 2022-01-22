class Brick {
    constructor(position, size, collidable) {
        this.position = position;
        this.size = size;
        this.collidable = collidable;
    }
    show() {
        image(TEXTURES.BRICK, this.position.x + CURRENTCAMERAOFFSET.x, this.position.y + CURRENTCAMERAOFFSET.y, this.size.x, this.size.y);
    }
}