const Client = require('/client/Client');

class Packet{
    constructor(){
        this.packet = {Bullet: false, PlayerLoc: false};y
    }


    movement(loc){
        Packet.playerLoc = loc; 
    }

    shot(bullet){
        Packet.shot = bullet;
    }

    send(){
        Client.socket.emit('packet', this.packet);
    }

    addPacket(packet){
        for(key in Object.keys(packet)){
            let parent = Object.keys(packet)[key];
            let value = packet[Object.keys(packet)[key]];
            
            if(this.packet.parent === undefined){
                return Error('The packet ' + p + ' is not a known packet!');
            }

            this.packet.parent = value;
        }
    }

    removePacket(packetParent){
        this.packet.packetParent = false;
    }

    init(){

    }
}

let packet = new Packet();
module.exports = packet;