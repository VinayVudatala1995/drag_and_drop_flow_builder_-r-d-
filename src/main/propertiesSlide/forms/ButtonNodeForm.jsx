
import React, { useEffect, useState, useContext } from 'react'
import "./TextNodeForm.css";
import { engineContext } from '../../Manager';
import { useDispatch, useSelector } from "react-redux";

import { v4 as uuidv4 } from 'uuid';
import { addButtonsList, NodeType } from '../../../store/main/mainSlice';

const ButtonNodeForm = (props) => {

    const engine = useContext(engineContext);

    const [formValues, setFormValues] = useState([])
    const [buttonId, setbuttonId] = useState(null)
    const [fieldvalue, setFieldValue] = useState('')
    const dispatch = useDispatch();
    const selectednode = useSelector((state) => state.mainSlice.selectedNode);
    const buttonsList = useSelector((state) => state.mainSlice.buttonslist);
    const a = buttonsList.find(x => x.id === selectednode.options.id);
    

    useEffect(() => {
        a && setFormValues(a.formValues)
    }, [a])
    const deleteButton = (id) => {
        const a = formValues.filter(x => x.id !== id)
        let newFormValues = [...a];
        setFormValues(newFormValues);
    }
    const addButton = (value, index) => {
        const newFormValues = [...formValues, { name: value, id: uuidv4() }]
        setFormValues(newFormValues);
        setFieldValue('')
    }

    const editButton = (buttonId) => {
        const selectedButton = formValues.find(x => x.id === buttonId)
        setbuttonId(selectedButton.id)
        setFieldValue(selectedButton.name)
    }

    const saveEditedButton = (buttonId) => {
        const newFormValues = [...formValues]
        const a = newFormValues.findIndex(x => x.id === buttonId)
        newFormValues.splice(a, 1, { name: fieldvalue, id: buttonId })
        const c = [...newFormValues]
        setFormValues(c)
        setbuttonId('')
        setFieldValue('')
    }

    const saveButtons = () => {
        engine.getModel().getNode(selectednode.options.id).getOptions().buttons = [...formValues]
        engine.repaintCanvas()
        //  { formValues: formValues, id: selectednode.options.id }
        // dispatch(addButtonsList({ formValues: formValues, id: selectednode.options.id }))
       // props.saveForm(NodeType.BUTTON, { formValues: formValues, id: selectednode.options.id })
    }
    return (
        <>
            {([...formValues]).map((x, i) =>
                <div key={i}>
                    <button>{x.name}</button>
                    <button onClick={() => { editButton(x.id) }}>Edit</button>
                    <button onClick={() => { deleteButton(x.id) }}>Delete</button>
                </div>)}
            <div className='form'>
                {<div className='form-row' >
                    <input type='text' name='name' value={fieldvalue} onChange={(e) => setFieldValue(e.target.value)} />
                    <button onClick={() => !buttonId ? addButton(fieldvalue) : saveEditedButton(buttonId)}>Save</button>
                </div>}
            </div>
            <div>
                <button onClick={() => {
                    // //add id
                    // // dispatch(addButtonsList(formValues))
                    // dispatch(addButtonsList({ formValues: formValues, id: selectednode.options.id }))
                    // props.saveForm(NodeType.BUTTON, formValues)
                    saveButtons()
                }}>Save Buttons</button>
            </div>
        </>
    )
}

export default ButtonNodeForm