import { createRef, useContext, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setQuestion } from '../../../../../store/button/buttonSlice';
import { RootState } from '../../../../../store/store';
import { engineContext } from '../../../../Manager';
import '../buttonForm.css'
import { buttonContext } from '../container/buttonForm';



export const ButtonText = () => {    
    const [text,setText] = useState(''); 
    const question = useSelector((state : RootState) => state.buttonSlice.question);
    const dispatch = useDispatch();
    const areaRef : any = useRef(null);
    
      useEffect(() => {
        if(text != question){            
            setText(question);
        }
      },[question]);
    

        const handleBlur= () => {
            if(areaRef.current !== document.activeElement){
                if(question.trim() !== text.trim()){
                    dispatch(setQuestion(text));
                }
            }
        }

        

    return(
        <div className="button-text">
            <textarea ref={areaRef} value={text}  onBlur={handleBlur}  onChange={(e) => {setText(e.target.value)} } placeholder='Please enter here'/>
        </div>
    );
}