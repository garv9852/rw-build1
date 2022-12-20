import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../firebase"
import {collection,getDocs} from "firebase/firestore";
interface Data{
    product?:any,
    getDoc?:boolean
    erm?:any,
    errorOccured?:boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) 
{
    try{
    const product=await getDocs(collection(db,"products"));
    const x:Object[]=[];
    product.forEach((doc)=>{
        x.push({id:doc.id,...doc.data()});
    })
      return res.status(200).json({
        product:x,
        getDoc:true
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
