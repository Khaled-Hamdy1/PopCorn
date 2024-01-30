// export const transformCapitalToSmall = (obj: object) => {
//   const data = {}
  
//   if(Array.isArray(obj)) {
//     return obj.map((item) => transformCapitalToSmall(item))
//   }

//   Object.keys(obj).forEach((key) => {
//     const newKey = key.replace(/([A-Z])/g, "_$1").toLowerCase()
//     data[newKey] = obj[key]
//   })

//  return data
// }
