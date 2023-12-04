'use client'
import {useState, useEffect} from 'react'
import { Peer } from "peerjs";
import { v4 as uuid } from 'uuid';
import axios from 'axios'

const baseUrl = "https://turbo-tribble-44v5rxggpvqf5jjx-3000.app.github.dev/api/peer"

async function createPeer(peerId : string) {
    const res = await fetch(baseUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({peerId: 'aman' }),
    });
}

export default function Call() {
    const [peer, setPeer] = useState();
    const [anotherPeerId, setAnotherPeerId] = useState();

    useEffect(() => {
        setPeer(new Peer(uuid()));
    }, []);

    useEffect(() => {
        if(!peer) {
            return;
        }

        // store peer to server
        createPeer(peer.id);

        // receive
        peer.on("connection", (conn) => {
            conn.on("data", (data) => {
                console.log("data = ", data);
            });
            conn.on("open", () => {
                conn.send("hello!");
            });
        });
    }, [peer])

    useEffect(() => {
        if(anotherPeerId) {
            connectToPeer(anotherPeerId)
        }
    }, [anotherPeerId]);


    const connectToPeer = (peerId) => {
        const conn = peer.connect(peerId);
        conn.on("open", () => {
            conn.send("hi!");
        });
    }

    return (
        <div>
          <h2> Call - </h2>
          <div>
            {peer && (
              <div> Peer ID = {peer.id} </div>
            )}
            <button className="px-4 py-3 rounded bg-slate-200"> connect to stranger </button>
          </div>
        </div>
    )
}

