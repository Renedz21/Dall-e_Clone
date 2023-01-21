import express from 'express';
import dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai';

dotenv.config()

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
})

const openai = new OpenAIApi(configuration)

router.get('/', (req, res) => {
    res.send('Hello from dalle')
})

router.post('/', async (req, res) => {
    try {
        const { prompt } = req.body

        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json',
        })

        const image = response.data.data[0].b64_json;

        res.status(200).json({ photo: image })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' })
    }
})

export default router