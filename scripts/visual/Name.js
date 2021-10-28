import { NameAPI } from '../constant.js';
export const GetRndName = async () =>{
    let res;
    await fetch(NameAPI)
    .then(response => response.json())
    .then(data => res = data.name);
    return res;
}