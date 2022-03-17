// Name: Tools Manager

import "@johnlindquist/kit"

await npm("@iconify/types")
await npm("@iconify/json")
await npm("@iconify/utils")
import { Iconify } from "@iconify/types"
import { lookupCollections, locate, lookupCollection } from '@iconify/json';
// import collections from "@iconify/json/collections.json"

let {collections, write} = await db("tools", { collections:[] })

// let cJson = `${kenvPath('node_modules')}/@iconify/json/collections.json`
//  log(cJson)
let iconCollections = await lookupCollections()
// log(iconCollections)
// for(let collection of iconCollections) {

let allIcons = []

Object.keys(iconCollections).forEach(async (collection) => {
    log(collection)
    let collectionInfo = iconCollections[collection]
    log(collectionInfo)
    let icons = await lookupCollection(collection)
    Object.keys(icons).forEach(async (icon) => {
        // log(icon)
        let iconInfo = icons[icon]
        // log(iconInfo)
        // let iconPath = await locate(iconInfo.icon)
        // log(iconPath)
        // let iconData = await readFile(iconPath)
        // log(iconData)
        // let iconBase64 = iconData.toString('base64')
        // log(iconBase64)
        // let iconBase64Url = `data:${iconInfo.type};base64,${iconBase64}`
        // log(iconBase64Url)
        let iconUrl =`https://iconify.design/${collection}/${icon}`
        // log(iconUrl)
        let i = {
            name: icon,
            // icon: iconBase64Url,
            // url: iconUrl,
            // type: iconInfo.type,
            collection: collection
        }
        allIcons.push(i)
    })
})


let icon = await arg("Find an icon", input => _.find(allIcons, input))

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