// pages/api/hello.js

import { createRouter} from "next-connect";
import User from "../../../models/User";
import db from "../../../utils/db";




// Default Req and Res are IncomingMessage and ServerResponse
// You may want to pass in NextApiRequest and NextApiResponse
const router = createRouter();

router
.post(async(req, res) => {
    await db.connect()
    const {id,role} =req.body
    const user = await User.findById(id)
if (user && role ==='admin') {
    user.isAdmin=true
   
    
}
await user.save()

res.sendDate({message:'user updated'})

    await db.disconnect()

    
    
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