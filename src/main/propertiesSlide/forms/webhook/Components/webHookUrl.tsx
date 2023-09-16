import { createRef, useEffect, useRef, useState } from "react"
import '../webhookForm.css'
import CreatableSelect from 'react-select/creatable';
import { UrlType } from "../../../../../utils/props";
import { setRequestType, setRequestUrl, UrlOption } from "../../../../../store/webhook/webhook";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";



export const urlTypeOptions :  UrlOption[] = [
    { value: UrlType.GET, label: UrlType.GET },
    { value: UrlType.POST, label: UrlType.POST},
]

export const WebHookUrl = () => {
    const textAreaRef : any = useRef(null);
    const requestType : UrlOption | null = useSelector((state : RootState) => state.webhookSlice.requestType);
    const requestUrl  : string = useSelector((state : RootState) => state.webhookSlice.url);
    const  [url,setUrl] = useState(requestUrl);
    const dispatch = useDispatch();
    

    useEffect(() => {
        if(url != requestUrl){            
            setUrl(requestUrl);
        }
      },[requestUrl]);
    const handleBlur= () => {
        if(textAreaRef.current !== document.activeElement){
            if(requestUrl.trim() !== url.trim()){
              dispatch(setRequestUrl(url));
            }
        }
    }

    const handleSelect = (e : any) => {
        dispatch(setRequestType(e));
    }

    return(
    <div>
    <label>Enter Your Url : </label>
    <br/>
    <input ref={textAreaRef}  className="webhook-textarea" value={url} onBlur={() => handleBlur()} onChange={(e) => setUrl(e.target.value)}/> 
    <label>Request Type : </label> <br/>
    <CreatableSelect className="webhook-select" value={requestType} isClearable options={urlTypeOptions}  onChange={(e : any) => handleSelect(e)}/>
    </div>)

}