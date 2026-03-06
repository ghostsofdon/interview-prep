import express, { type Request, type Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Interview Ready Backend' });
});
//TODO: 
//Get params, find string in title (search by title)
//Print title and body
//React call api-data, pass string to look
//Print in component just title and description in list

app.get('/api-data', async (req: Request, res: Response) => {
  try {
    const searchByTitle = (req.query.search as string);

    const response = await fetch(`https://api.github.com/search/issues?q=repo%3Afacebook%2Freact+${searchByTitle}+in%3Atitle`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json() as { items: { body: any; title: string }[] };
    const mapRelevantData = data.items.map(item => {
      return {
        title: item.title,
        body: item.body
      }
    })
    res.json(mapRelevantData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});





export default app;
