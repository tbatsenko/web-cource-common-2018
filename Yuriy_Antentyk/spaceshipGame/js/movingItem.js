class MovingItem{
    constructor(x, y, radius, view){
        this.x = x
        this.y = y

        this.__radius = radius
        this.__view = view
    }

    get radius(){ return this.__radius }
    get view(){ return this.__view }

    collide(otherItem) { return squaredDistance(this, otherItem) < Math.pow(this.radius + otherItem.radius, 2) }
    destroy() {
        this.view.parentNode.removeChild(this.view)
        return false
    }
    updateView(){
        this.view.style.top = (this.y - this.radius) + "px"
        this.view.style.left = (this.x-  this.radius) + "px"
    }
}
