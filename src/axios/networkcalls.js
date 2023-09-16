import Axios from "axios"


let callApi = async ({url,method,data}) => {
    // console.log('api call data',url,method,data)
        return await Axios({url,method,data});
};


export default callApi;