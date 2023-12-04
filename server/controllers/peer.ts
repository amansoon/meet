import{ Request, Response } from 'express'

let peers : string[] = [];


class Peer {
    static createPeer(req: Request, res: Response) {
        const {peerId}  = req.body;

        if(!peerId) {
            res.json({status: "FAILED", message: "Peer Id is required!"})
        }
        
        console.log(peerId)

        peers.push(peerId);
        res.json({data :  peerId})
    }

    static deletePeer(req: Request, res: Response) {
        const { id } = req.params;
        
        if(id) {
            peers = peers.filter((peer) => peer != id)
        }
        res.json({status: "SUCCESS", data : null, message: "deleted peer"});
    }

    static getRandomPeer(req: Request, res: Response) {
        const id = peers[Math.floor(Math.random() * peers.length)];

        if(id) {
            res.json({status: "SUCCESS", data : {peerId : id}, message: "got random peer id"});
        } else {
            res.json({status: "FAILED", data : null, message: "No one is online!"});
        }
    }
}

export default Peer;