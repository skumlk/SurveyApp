
import { config } from "../config/config";
import mongoose from 'mongoose'

export default async () => {

    const DB_HOST = config.DB_HOST;
    const DB_PORT = config.DB_PORT;
    const DB_NAME = config.DB_NAME;
    
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);

    const connect_url = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
    await mongoose.connect(connect_url);
}