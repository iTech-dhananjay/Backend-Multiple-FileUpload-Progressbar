import cors from 'cors'
import dotenv from 'dotenv'
import express from "express"
import bodyParser from 'body-parser'
import chunk from './chunk'

dotenv.config()

const app = express();
app.use('/static',express.static('uploads'))


const PORT = 6001;
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/',chunk)


app.get("/healthy", (req, res) => {
  console.log({ req });
  res.send("Hello world");
});



app.listen(PORT, () => {
  console.log(`Port listening on ${PORT}`);
})