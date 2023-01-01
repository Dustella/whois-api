import { transform } from "./transformer";

export const parse=async(domain:string)=>{
    const response=await fetch(`https://seo.chinaz.com/${domain}`);
    const kv = await transform(response);
    return new Response( JSON.stringify( kv));
    // return response
}