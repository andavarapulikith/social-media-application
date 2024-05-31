import * as UploadApi from '../api/uploadrequest'

export const uploadImage=(data)=>async (dispatch)=>{
    try{
        await UploadApi.uploadImage(data);

    }
    catch(err)
    {
    console.log(err);
    }
}
export const uploadPost=(data)=>async (dispatch)=>{
    dispatch({type:"UPLOAD_START"})
    try{
        console.log('hello')
        const newpost=await UploadApi.uploadPost(data);
        console.log(newpost);
     dispatch({type:"UPLOAD_SUCCESS",data:newpost.data});
    }
    catch(err)
    {
        console.log(err);
        dispatch({type:"UPLOAD_FAIL"})
    }
}
