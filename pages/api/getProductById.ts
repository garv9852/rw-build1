import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../firebase"
import {collection,doc,getDoc} from "firebase/firestore";
interface Data{
    
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) 
{
    try{
        const {id}=JSON.parse(req.body)
        const product=await getDoc(doc(db,"products",id));
        return res.json({
            product:{id:id,...product.data()}
        })
    }
    catch(err:any){
        console.log(err);
      return res.status(401).json({
        errorOccured:true,
        erm:err
      })
    }
}
