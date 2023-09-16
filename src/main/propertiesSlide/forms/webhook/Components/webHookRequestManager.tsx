import '../webhookForm.css'
import { useSelector } from "react-redux";
import { RootState, } from "../../../../../store/store";
import { HeaderInterface, ParamInterface, setResponse, UrlOption } from "../../../../../store/webhook/webhook";
import { UrlType } from "../../../../../utils/props";
import { HeaderManager } from "./headerComponents/headerManager";
import { WebHookGetRequest } from "./webHookGetRequest";
import { WebHookPostRequest } from "./webHookPostRequest";
import { store } from '../../../../../store/store';
import { urlTypeOptions } from './webHookUrl';
import axios from 'axios';
import { useDispatch } from 'react-redux';


export const WebHookRequestManager = () => {
    const requestType: UrlOption | null = useSelector((state: RootState) => state.webhookSlice.requestType);
    const dispatch = useDispatch();

    const handleClick = () => {
        const url: string = store.getState().webhookSlice.url;
        const requestType: UrlOption = store.getState().webhookSlice.requestType;
        const headers: HeaderInterface[] = store.getState().webhookSlice.headers;
        const header: object = {}
        if (headers.length > 0) {
            headers.map((e: HeaderInterface) => {
                header[e.key] = e.value;
            })
        }
        switch (requestType) {
            case urlTypeOptions[0]:
                getRequest(url, header);
                break;
            case urlTypeOptions[1]:
                postRequest(url,header);
                break;
            default: console.log('Default request');

        }
    }

    const getRequest = async (url: string, header: object) => {
        let finalUrl: string = url + '?';
        const params: ParamInterface[] = store.getState().webhookSlice.params;
        if (params.length > 0) {
            params.map((e: ParamInterface, index: number) => {
                if (index != 0) {
                    finalUrl = finalUrl + '&'
                }
                finalUrl = finalUrl + e.param + '=' + e.value
            })
        }

        console.log('finalUrl' + finalUrl);
        console.log('header', header);
        axios.get(finalUrl,header).then((response) => {
            dispatch(setResponse(response.data));
        });

    }

    const postRequest = async (url: string,header: object) => {
        let body: any = store.getState().webhookSlice.body;
        if(body === null || body === undefined ){
            body = {};
        }

        axios.post(url,body,header).then((response) => {
            dispatch(setResponse(response.data));
        });
    }
    return (
        <>
            <br />
            <div className="requestManager">
                <hr />
                <HeaderManager />
                <br />
                {
                    requestType != null ?
                        requestType.value == UrlType.GET ?
                            <><WebHookGetRequest /></> : requestType.value == UrlType.POST ? <WebHookPostRequest /> : <></> : <></>
                }

            </div>
            <br />
            <button className='request-name' onClick={() => handleClick()}>Test the Request </button>

        </>
    );
}