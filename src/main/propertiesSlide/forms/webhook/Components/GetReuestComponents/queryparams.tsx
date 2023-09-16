import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { ParamInterface } from "../../../../../../store/webhook/webhook";
import { QueryParam } from "./queryparam";

export const QueryParams = () => {
    const querparams : ParamInterface[] = useSelector((state : RootState) => state.webhookSlice.params);
    
    return(
        <>
        {querparams.length > 0 
        ?
        querparams.map((e : ParamInterface) => <QueryParam key={e.id} param={e}/>)        
        : <> No Params</>}
        </>
        
    );
}