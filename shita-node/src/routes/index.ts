import { Hono } from 'hono'
import { jwt } from 'hono/jwt'
import type { JwtVariables } from 'hono/jwt'
import prisma from '../../prisma/client/index.js'
import { apiKeyAuth } from '../middleware/auth.js'
import { createPost, deletePost, getPostById, getPosts, updatePost } from '../controllers/PostController.js'

type Variables = JwtVariables
const app = new Hono<{ Variables: Variables }>()

app.use('/*',jwt(
    {
      secret: '5f6fcc7c7dad5c184a529b95ee30a9539399833db549c51d8f1f504a8b4ea902',
    }
  )
)

app.get('/', async (c) => {
  const auth = await prisma.auth.findFirst()
  if (auth) {
      return c.json(
          { 
              statusCode: 200, 
              message: 'Authorized',
              key: auth.key 
          }
      )
  }
})

app.use('*', apiKeyAuth)

app.get('/dataPost', (c) => getPosts(c))
app.post('/dataPost', (c) => createPost(c))
app.get('/dataPost/:id', (c) => getPostById(c))
app.put('/dataPost/:id', (c) => updatePost(c))
app.delete('/dataPost/:id', (c) => deletePost(c))

export const Routes = app;