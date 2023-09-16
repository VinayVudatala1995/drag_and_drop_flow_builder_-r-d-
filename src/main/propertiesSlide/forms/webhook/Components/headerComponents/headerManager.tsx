import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { ActionTypes, setHeaderActionType } from "../../../../../../store/webhook/webhook";
import { HeaderForm } from "./headerForm";
import '../../webhookForm.css';
import { Headers } from "./headers";

export const HeaderManager = () => {
    const actionType = useSelector((state: RootState) => state.webhookSlice.headerActionType);
    const dispatch = useDispatch();


    const handleClick = () => {
        if (actionType != ActionTypes.NONE) {
            dispatch(setHeaderActionType(ActionTypes.NONE));
        }
        else {
            dispatch(setHeaderActionType(ActionTypes.CREATE))
        }
    }

    return (
        <div>
            <div className="queryParam">
                <label>List of Header Properties : </label>
                <br />
                <Headers />
                <br />
                <button className="button" onClick={() => handleClick()}>{actionType != ActionTypes.NONE ? 'Cancel' : 'Add Header'}</button>
                {actionType != ActionTypes.NONE ? <HeaderForm /> : <></>}
            </div>
        </div>
    );
}