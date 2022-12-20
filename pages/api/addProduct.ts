import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../firebase"
import {addDoc,collection} from "firebase/firestore";
interface Data{
    docAdded?:boolean,
    errorOccured?:boolean
    erm?:any,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) 
{
    const {title,size,price,fabric,description,image}=JSON.parse(req.body);
    try{
      await addDoc(collection(db,"products"),{
        title,
        description,
        fabric,
        price,
        image,
        size
      })
      return res.status(200).json({
        docAdded:true
      })
    }
    catch(err:any){
      return res.status(401).json({
        errorOccured:true,
        erm:err
      })
    }

}
