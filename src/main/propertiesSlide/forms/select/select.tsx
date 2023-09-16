import React, { useContext, useLayoutEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Switch from "react-switch";
import { useDispatch, useSelector } from 'react-redux';
import { engineContext } from '../../../Manager';
import { resetForm, VariableInterface } from '../../../../store/main/mainSlice';
import { VariableComponent } from '../../components/variableComponents/variableComponent';




export interface formProps {
    nodeSelected: any;
}

const SelectNodeForm = (props: any) => {
    const engine: any = useContext(engineContext);
    const selectednode = engine.getModel().getNode(props.nodeSelected);
    const  [variable,setVariable] = useState(selectednode?.getOptions()?.variable);
    const [taglist, setTagList] = useState(selectednode.getOptions().items != null ? selectednode.getOptions().items : []);
    const [fieldValue, setFieldValue] = useState('');
    const [togglestatus, setToggleStatus] = useState(selectednode.getOptions().isMulti != null ? selectednode.getOptions().isMulti : false);
    const [tagId, setTagId] = useState('');

    const dispatch = useDispatch();

    
    const addTags = (fieldValue: string) => {
        const newTagList: any = [...taglist, { variable: fieldValue, id: uuidv4() }]
        setTagList(newTagList)
        setFieldValue('')
    }

    const handleCheck = () => {
        setToggleStatus(!togglestatus)
    }

    const saveValues = () => {
//{ isMulti: togglestatus, items: taglist}
        ((engine.getModel().getNode(props.nodeSelected))).getOptions().selected = false;
        ((engine.getModel().getNode(props.nodeSelected))).getOptions().isMulti = togglestatus;
        ((engine.getModel().getNode(props.nodeSelected))).getOptions().items = taglist;
        ((engine.getModel().getNode(props.nodeSelected))).getOptions().variable = variable;
        dispatch(resetForm());
        engine.repaintCanvas()
    }

    const deleteTag = (id: any) => {
        const a = taglist.filter((x: any) => x.id !== id)
        const newTagList = [...a]
        setTagList(newTagList)

    }
    const editTag = (id: any) => {
        const tag: any = taglist.find((x: any) => x.id === id)
        setFieldValue(tag.variable)
        setTagId(tag.id)
    }
    const saveEditedTag = (tagId: any) => {
        const newValues: any = [...taglist]
        const a = newValues.findIndex((x: any) => x.id === tagId)
        newValues.splice(a, 1, { variable: fieldValue, id: tagId })
        const c: any = [...newValues]
        setTagList(c)
        setTagId('')
        setFieldValue('')
    }

    const handleVariable = (variable: VariableInterface) => {
        setVariable(  variable);
    }


    return (
        <>
            <div>
                <div>
                    <Switch onChange={handleCheck} checkedIcon={false} uncheckedIcon={false} checked={togglestatus} width={30} height={18} onColor="#35C792" />
                </div>
                {taglist && taglist.map((x: any, index: number) =>
                    <div key={index}>
                        <button>{x?.variable}</button>
                        <button onClick={() => editTag(x.id)}>Edit</button>
                        <button onClick={() => deleteTag(x.id)}>Delete</button>
                    </div>
                )}
                <br />
                <div>
                    <input type='text' name='tag' value={fieldValue} onChange={e => setFieldValue(e.target.value)} />
                    <button onClick={() => tagId ? saveEditedTag(tagId) : addTags(fieldValue)}>Add</button>
                </div>
            </div>
            <br />
            <br />

            <VariableComponent variable={variable} callBackFun={handleVariable} />

            <br />
            <button onClick={() =>
                 saveValues(
                 )}>Save</button>

        </>
    )
}

export default SelectNodeForm;

// const addSelectedTags = (Value: string) => {
    //     if (selectedTaglist.includes(Value)) {
    //         const newSelectedTagList: any = selectedTaglist.filter(x => x !== Value)
    //         setSelectedTagList(newSelectedTagList)
    //     }
    //     else {
    //         const newSelectedTagList: any = [...selectedTaglist, Value]
    //         setSelectedTagList(newSelectedTagList)
    //     }
    // }
    // onClick={() => addSelectedTags(x.variable)}
    // style={selectedTaglist.includes(x.variable) ? { border: '1px solid black', } : { border: '1px solid white', }}