import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());
app.get('/allElements', async (req, res) => {
    const allElements = await prisma.elements.groupBy({
        by: ['code', 'name'],
        orderBy: {
            name: 'asc',
        },
    });
    if (!allElements) {
        res.status(404).send('Not found');
        return;
    }
    res.json(allElements);
    return true;
});
app.get('/allProperties/:code', async (req, res) => {
    const code = req.params.code;
    const allProperties = await prisma.elements.findMany({
        where: {
            code: code,
        },
        distinct: ['property'],
        select: {
            property: true,
        },
        orderBy: {
            property: 'asc',
        },
    });
    if (!allProperties) {
        res.status(404).send('Not found');
        return;
    }
    res.json(allProperties);
    return true;
});
app.get('/ranges/:code/:property', async (req, res) => {
    const code = req.params.code;
    const property = req.params.property;
    console.log(code, property);
    const ranges = await prisma.elements.findMany({
        where: {
            code: code,
            property: property,
        },
    });
    if (!ranges) {
        res.status(404).send('Not found');
        return;
    }
    res.json(ranges);
    return true;
});
app.get('/', (req, res) => {
    return res.send('IT WORKY');
});
app.listen(8080, () => {
    console.log('Server started on port 3000');
});
