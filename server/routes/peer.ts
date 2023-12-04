import {Router} from 'express'
import Peer from '../controllers/peer';

const router = Router();

router.get('/', Peer.getRandomPeer);
router.post('/', Peer.createPeer);
router.delete('/:id', Peer.deletePeer);

export default router;
