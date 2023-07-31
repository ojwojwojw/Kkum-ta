const app = require('./app');
const PORT = 8080;
app.listen(PORT, ()=>console.log(`Server listens on port ${PORT}`));

module.exports = app;