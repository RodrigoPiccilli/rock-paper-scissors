const express = require('express');
const server = express();
const PORT = 5050;

const CPU = require('./src/CPU.js');


server.get("/cpu", (req, res) => {

    const cpuMove = CPU.getCPUMove();

    res.json({cpuMove : cpuMove})

})




server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`))