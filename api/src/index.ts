import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connectToDatabase, disconnectDatabase } from './utils/database';
import http from 'http';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: 'Not Found' });
});

app.use(errorHandler);

const startServer = async (): Promise<void> => {
    try {
        await connectToDatabase();
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });

        const gracefulShutdown = async (): Promise<void> => {
            console.log('🛑 Shutting down the server...');
            await disconnectDatabase();
            server.close(() => {
                console.log('🚪 Server shut down gracefully.');
                process.exit(0);
            });
        };

        process.on('SIGINT', gracefulShutdown);
        process.on('SIGTERM', gracefulShutdown);
    } catch (error: unknown) {
        console.error('❌ Error starting server:', error instanceof Error ? error.message : error);
        process.exit(1);
    }
};

startServer();
