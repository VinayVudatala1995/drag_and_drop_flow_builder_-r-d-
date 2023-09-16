import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { setBody } from '../../../../../store/webhook/webhook';
import '../webhookForm.css';


export const WebHookPostRequest = () => {
    const textAreaRef : any = useRef(null);
    const requestBody : any = useSelector((state : RootState) => state.webhookSlice.body);
    const [body,setbody] = useState(requestBody != null ?requestBody : '');
    const dispatch = useDispatch();

    useEffect(() => {
        if(body != requestBody){            
            setbody(requestBody);
        }
      },[requestBody]);

      const handleBlur= () => {
        if(textAreaRef.current !== document.activeElement){
            if(requestBody.trim() !== body.trim()){
              dispatch(setBody(body));
            }
        }
    }
    return(<div>

        <textarea className="body-textarea" ref={textAreaRef} onBlur={() => handleBlur()} value={body} onChange={(e) => setbody(e.target.value)} placeholder="Please enter your json body"/>

    </div>);
    }