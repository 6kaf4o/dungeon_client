module.exports = class Send{
    constructor(){

    }

    movement(loc){
        //TODO
        client.socket.emit('movement', loc)
    }

    shot(bullet, loc){
        //TODO
        io.emit('shot', {Bullet: {X: bullet.X, Y: bullet.Y, dX: bullet.dX, dY: 0, sX: 0, sY: 0}, Player: {X: loc.X, Y: loc.Y}})
    }
}