module.exports = class Client{
    constructor(){
        this.socket = io();
        this.allPlayers = [];
    }

    init(){
        //Server sends every players info to the current player
        this.socket.on('players', (players)=>{
            
            this.allPlayers = [];
            for(let key in players){
                if(players[key].id !== this.socket.id){
                    this.allPlayers[this.allPlayers.length] = players[key];
                }
            }
            
        })
    }

    getId(){
        return this.socket.id;
    }

    getAllPlayers(){
        return this.allPlayers;
    }
    getPlayer(index){
        return this.allPlayers[index];
    }
    getPlayerId(id){
        for(let key in this.allPlayers){
            if(this.allPlayers[key] == id){
                return this.allPlayers[key];
            }
        }
    }
    removePlayer(index){
        this.allPlayers.splice(index, 1)
    }
    removePlayerId(id){
        this.allPlayers = this.allPlayers.filter(p => p.id != socket.id);
    }
}