import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from "../../firebase"
import {addDoc,collection,query, where, getDocs } from "firebase/firestore";
interface jso{
    alreadyExist?:boolean,
    message?:string,
    erm?:any,
    accountCreated?:boolean
}
export default async function handler  (
  req: NextApiRequest,
  res: NextApiResponse<jso>
) 
{
    const {name,email,password,orders}=JSON.parse(req.body);
    try{
        const d=query(collection(db,"users"),where("email","==",email));
        const querySnapshot=await getDocs(d);
        if(!querySnapshot.empty) 
        {
            return res.json({
                alreadyExist:true
            })

        }
    }
    catch(err:any)
    {
        return res.status(500).json({
            message:"Server Error",
            erm:err
        })
    }
    try{
        await addDoc(collection(db,"users"),{
            name,
            email,
            password,
            orders
        }) 
    }
    catch(err:any){
        return res.status(401).json({
            message:"Server Error",
            erm:err
        });
    }
    res.status(200).json({
        accountCreated:true
    });
}
