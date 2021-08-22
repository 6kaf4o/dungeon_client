class Sheet{
    constructor(sheet, x, y, w, h){
        this.sheet = new Image();
        this.sheet.src = 'images/' + sheet;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}
