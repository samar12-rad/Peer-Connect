router.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    req.session.visited = true;
res.status(201).send({msg: "hello from user.js"});
});