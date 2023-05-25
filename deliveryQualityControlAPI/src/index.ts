import express, { Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());
app.get('/allElements', async (req, res) => {
	const allElements: object | null = await prisma.elements.groupBy({
		by: ['code', 'name'],
	});
	if (!allElements) {
		res.status(404).send('Not found');
		return;
	}
	res.json(allElements);
	return true;
});
app.listen(3000, () => {
	console.log('Server started on port 3000');
});
