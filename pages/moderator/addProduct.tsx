import React, { use, createRef, useState, forwardRef, useImperativeHandle } from 'react'
import Dialog from '../../components/elements/Dialog'
import Loading from '../../components/elements/Loading'
import {useForm,SubmitHandler} from "react-hook-form"
import { v4 as uuidv4 } from 'uuid';
import {ref, uploadBytesResumable,getDownloadURL} from "firebase/storage"
import {storage} from "../../firebase"
interface props{
    label:string
}
interface IformInput{
    title:string;
    description:string;
    fabric:string;
    price:number;
    image: any;
    size:object[];
}
const CheckBox=forwardRef(({label}:props,_ref)=>{
    const [checked,setChecked]=useState<boolean>(false);
    const [noOfSize,setNoOfSize]=useState<any>("");
    const handlecheck=()=>{
        if(!checked)
        {
            setChecked(true);
            return;
        } 
        setChecked(!checked)
        setNoOfSize(0);
    }
    useImperativeHandle(_ref,()=>({
        getStated:()=>{
            if(checked==false)
            {
              return {
                label:undefined,
                pieces:undefined
              };
            }
            return {
              label:label,
              pieces:noOfSize
            };
        }
    }))
    return (
        <div className='flex items-center space-x-2 justify-center'>
            <div className='space-x-2'>
                <label>{label}</label>
                <input type="checkbox" checked={checked} onChange={handlecheck}/>
            </div>
            <input 
                type="number"
                className="block text-sm py-1 w-8 min-w-8 px-1 rounded-md border outline-none text-center"
                disabled={!checked}
                value={noOfSize}
                onChange={(e)=>setNoOfSize(e.target.value)}
            />
        </div>
    )
})
function AddProduct() {
    const [loading,setLoading]=useState(false);
    const {register,handleSubmit,formState:{errors}}=useForm<IformInput>();
    const [error,setError]=useState("");
    const childChecked1:any=createRef();
    const childChecked2:any=createRef()
    const childChecked3:any=createRef()
    const childChecked4:any=createRef()
    const childChecked5:any=createRef()
    const childChecked6:any=createRef()
    const childChecked7:any=createRef()
    const childChecked8:any=createRef()
    const childChecked9:any=createRef()
    const childChecked10:any=createRef()
    const handleAdd:SubmitHandler<IformInput>=async (data)=>{
        data.size=getChecked();
        if(data.size.length==0){
          setError("Please Fill up the sizes")
          setTimeout(()=>{
            setError('')
          },2000);
          return;
        }
        if(data.image.length==0) 
        {
          setError("Please add the image")
          setTimeout(()=>{
            setError('')
          },2000);
          return;
        }
        if((data.image[0].size/(1024*1024))>15)
        {
          setError("Please select the photo under 15MB")
          setTimeout(()=>{
            setError('')
          },2000);
          return;
        }
        setLoading(true);
        let uid=uuidv4();
        const storageRef=ref(storage,`/data/${uid}/${data.image[0].name}`)
        const uploadtask=uploadBytesResumable(storageRef,data.image[0])
        uploadtask.on("state_changed", fn1, fn2, fn3);
        function fn1(snapshot: { bytesTransferred: number; totalBytes: number }){
          let progress=(snapshot.bytesTransferred / snapshot.totalBytes)*100;
          console.log(`upload is ${progress}`);
        }
        function fn2(_error: any){
          setError("error occured");
          setTimeout(()=>{
            setError('')
          },3000);
        }
        function fn3(){
          getDownloadURL(uploadtask.snapshot.ref).then(async (url)=>{
            data.image=url;
            const res=await fetch("/api/addProduct",{
              method:"post",
              body:JSON.stringify(data)
            })
            const respn:any=res.json();
            if(respn.errorOccured) setError("Server Error Occured");
            setLoading(false);
          })
        }
    }
    const getChecked=()=>{
      let x:any=[];
      x=[...x,{...childChecked1.current.getStated()},{...childChecked2.current.getStated()},{...childChecked3.current.getStated()},{...childChecked4.current.getStated()},
      {...childChecked5.current.getStated()},{...childChecked6.current.getStated()},{...childChecked7.current.getStated()},{...childChecked8.current.getStated()},{...childChecked9.current.getStated()},
      {...childChecked10.current.getStated()}];
      x=x.filter(({label,pieces}:any)=>{
        return pieces!=undefined || label!=undefined;
      })
      return x;
    }
  return (
    <div>
      <div className="relative min-h-screen bg-white-200 flex justify-center items-center">
        <Dialog>
          <form onSubmit={handleSubmit(handleAdd)}>
              <div>
                <h1 className="text-3xl font-bold text-center mb-4">Add Product</h1>
                <p className="text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">Add Product in the catelog with all verified details</p>
              </div>
              <div className="space-y-4">
                <input
                  {...register('title',{required:"The title Field is required"})} 
                  type="text" 
                  placeholder="title" 
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                <textarea 
                  {...register('description',{required:"The description Field is required"})} 
                  placeholder="description" 
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                <input 
                  {...register('fabric',{required:"The fabric Field is required"})}
                  type="text" 
                  placeholder="fabric" 
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                <input 
                  {...register('price',{required:"The price Field is required"})}
                  type="number" 
                  placeholder="price" 
                  className="block text-sm py-3 px-4 rounded-lg w-full border outline-none" />
                <input
                    {...register('image',{required:"the Image field is required"})}
                    placeholder='Image'
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    name="image"
                    className="w-full border px-1 py-1 rounded-lg"
                />
                <div className='grid grid-cols-3 gap-2 content-center'>
                    <CheckBox label="36" ref={childChecked1}/>
                    <CheckBox label="38" ref={childChecked2}/>
                    <CheckBox label="40" ref={childChecked3}/>
                    <CheckBox label="42" ref={childChecked4}/>
                    <CheckBox label="44" ref={childChecked5}/>
                    <CheckBox label="46" ref={childChecked6}/>
                    <CheckBox label="48" ref={childChecked7}/>
                    <CheckBox label="50" ref={childChecked8}/>
                    <CheckBox label="52" ref={childChecked9}/>
                    <CheckBox label="54" ref={childChecked10}/>
                </div>
              </div>
              <div className='flex flex-col p-3'>
                {errors.title && (
                    <span className='text-red-500'>{errors.title.message}</span>
                )}
                {errors.description && (
                    <span className='text-red-500'>{errors.description.message}</span>
                )}
                {errors.fabric && (
                    <span className='text-red-500'>{errors.fabric.message}</span>
                )}
                {errors.price && (
                    <span className='text-red-500'>{errors.price.message}</span>
                )}
                <div className=' text-red-600'>{error}</div>
              </div>
              <div className="text-center mt-3">
                <input type="submit" value="Add"className="transtion duration-300 focus:bg-red-700 py-3 px-10 text-xl text-white bg-red-500 rounded-2xl"/>
              </div>
          </form>
        </Dialog>
      </div>
      <Loading visible={loading}/>
    </div>
  )
}

export default AddProduct