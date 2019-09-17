import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Inert from "@hapi/inert";
import Pug from "pug";

const init = async start => {
    const server = Hapi.Server({
        port: process.env.PORT || 3000,
        host: "localhost"
    });

    await server.register(Vision);
    await server.register(Inert);
    server.views({
        engines: {
            pug: Pug
        },
        relativeTo: __dirname,
        path: "./webUI/views"
    });

    server.route({
        method: "GET",
        path: "/",
        handler: (request, h) => {
            return h.view("index");
        }
    });

    if (start) {
        await server.start();
        console.log("Server running on %s", server.info.uri);
    }
};

process.on("unhandeledRejection", err => {
    console.log(err);
    process.exit(1);
});
process.on("uncaughtException", err => {
    console.error(err);
    process.exit(1);
});

export default init;
