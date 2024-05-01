import mongoose from 'mongoose';
const localDbURI = 'mongodb://localhost:27017/hugram';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(localDbURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.bold);
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

export default connectDB;
