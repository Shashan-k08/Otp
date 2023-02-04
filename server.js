require('dotenv/config');
const mongoose= require('mongoose');
const app = require('./app');
mongoose.set("strictQuery", false);

MONGODB_URL_LOCAL="mongodb://localhost:27017/auth-system"

mongoose.connect(MONGODB_URL_LOCAL,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
    // useCreateIndex:true
})

.then(()=>console.log("Connected to MongoDb"))
.catch((err)=>
    console.log("MongoDb connection failed")
)
const port = 3001
app.listen(port,()=>{
    console.log(`App is listening on ${port}`)
})