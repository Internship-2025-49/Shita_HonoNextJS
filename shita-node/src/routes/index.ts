//import hono
import { Hono } from 'hono';
import { getPosts, createPost } from '../controllers/PostController.js';


//inistialize router
const router = new Hono()

//routes posts index
router.get('/data', (c) => getPosts(c));
router.post('/data', (c) => createPost(c));

export const Routes = router;