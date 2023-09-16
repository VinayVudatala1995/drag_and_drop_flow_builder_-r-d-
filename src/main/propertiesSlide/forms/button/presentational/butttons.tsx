import { DiagramEngine } from "@projectstorm/react-diagrams";

import { useContext } from "react";
import { useSelector } from "react-redux";
import { ButtonInterface } from "../../../../../store/button/buttonSlice";
import { RootState } from "../../../../../store/store";
import { engineContext } from "../../../../Manager";
import { buttonContext } from "../container/buttonForm";
import { Button } from "./button";




export const Buttons = () => {
    const buttons: ButtonInterface[] = useSelector((state: RootState) => state.buttonSlice.buttons);

    return (
        <>
            {buttons.length > 0 ?
                buttons.map((e: ButtonInterface) => <Button key={e.id} button={e} />)
                : <>No Buttons</>
            }

        </>
    );
}