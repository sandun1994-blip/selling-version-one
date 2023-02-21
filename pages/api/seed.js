// pages/api/hello.js

import { createRouter} from "next-connect";
import Product from "../../models/Product";
import { data } from "../../utils/data";
import db from "../../utils/db";


// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter();

router
.get(async(req, res) => {
    await db.connect()
    await Product.deleteMany()
    await Product.insertMany(data.products)
    await db.disconnect()
    res.send({message:'send successsfully'});
  })

// create a handler from router with custom
// onError and onNoMatch
export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});