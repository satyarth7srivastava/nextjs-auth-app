import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('Connected to database');
        });

        connection.on('error', (error) => {
            console.log('Error connecting to database: ', error);
            process.exit(1);
        });
        
    } catch (error) {
        console.log('Error connecting to database: ', error);
        
    }
}