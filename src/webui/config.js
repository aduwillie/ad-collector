const {
    MONGO_URL,
} = process.env;

export default {
    mongo: {
        connectionString: MONGO_URL,
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin',
            useCreateIndex: true,
        },
    },
    useMongo: true,
    saltRounds: 10,
};
