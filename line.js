class Line {
    constructor(begin, end) {
        this.begin = begin;
        this.end = end;

        this.recalculate();
    }   
    draw() {
        drawLine(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }
    recalculate() {
        if(this.begin.x == this.end.x) {
            this.begin.x += 0.1;            
        }
        this.m = (this.begin.y - this.end.y) / (this.begin.x - this.end.x);
        this.b = this.begin.y - this.begin.x * this.m;
    }
}