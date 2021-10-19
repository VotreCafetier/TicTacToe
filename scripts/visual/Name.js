export const GetRndName = async () =>{
    let res;
    await fetch('https://api.namefake.com/')
    .then(response => response.json())
    .then(data => res = data.name);
    return res;
}