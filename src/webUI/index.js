import init from './server';
init(true);

process.on('unhandeledRejection', err => {
    console.log(err);
    process.exit(1);
});
process.on('uncaughtException', err => {
    console.error(err);
    process.exit(1);
});
