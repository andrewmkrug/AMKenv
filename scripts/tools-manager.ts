// Name: Tools Manager

import "@johnlindquist/kit"

await npm("@iconify/json")
await npm("@iconify/utils")
// import { lookupCollections, locate } from '@iconify/json';


let {collections, write} = await db("tools", { collections:[] })


// let t = await lookupCollections()

// async function name(params:type) {
    
// }



// onTab("Create Toolset", async ()=>{
//     let name = await prompt("Name of toolset")
    
//     collections.push({name, tools:[]})
//     await write()
// })

// onTab("Manage Toolset", async ()=>{
//     let tool = await arg("Toolset", collections)
//     while(true) {
//         let toolName = await arg("Name of tool")
//         let choice = await arg("Find an icon ", await lookupCollections())
//         await write()
//     }
// })

// onTab("Delete Toolset", async ()=>{})