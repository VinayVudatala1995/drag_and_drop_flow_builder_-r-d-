import { useSelector } from "react-redux";
import { RootState } from "../../../../../../store/store";
import { HeaderInterface } from "../../../../../../store/webhook/webhook";
import { Header } from "./header";


 export const Headers = () => {


    const headers : HeaderInterface[] = useSelector((state : RootState) => state.webhookSlice.headers);
    
    return(
        <>
        {headers.length > 0 
        ?
        headers.map((e : HeaderInterface) => <Header key={e.id} header={e}/>)        
        : <> No Header Properties</>}
        </>
        
    );
 }