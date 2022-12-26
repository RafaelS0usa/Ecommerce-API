const middleware = (app, Express, cors)=>{
    app.use(Express.json());

    const options = {
        origin: ["*"]
    }

    app.use(cors(options))
}

export default middleware;