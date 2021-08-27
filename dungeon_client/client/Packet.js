const Client = require('/client/Client');

class Packet{
    constructor(){
        this.autoPickup = [];
        this.packet = {Bullet: false, PlayerLoc: false};
        this.timeout;
        this.time;
    }

    movement(loc){
        Packet.playerLoc = loc; 
    }

    shot(bullet){
        Packet.shot = bullet;
    }

    addAutoPickup(obj){
        this.autoPickup.push(obj);
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

            this.autoPickup();
        }
    }

    removePacket(packetParent){
        this.packet.packetParent = false;
    }

    stop(){
        this.timeout.clearTimeout();
    }

    start(){
        if(this.time === undefined){
            return Error('You need to call init() first!');
        }

        this.init(this.time).bind(this);
    }

    init(time){
        this.time = time;
        this.timeout = setTimeout(()=>{
           
            this.addPacket(this.autoPickup).bind(this);

            this.send().bind(this);

        }, time)
    }
}

let packet = new Packet();
module.exports = packet;