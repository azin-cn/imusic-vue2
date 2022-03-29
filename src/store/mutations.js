import { 
  REC_DISCOVERD_DATA
 } from "./mutations_type"


export const mutations = {
  [REC_DISCOVERD_DATA](state,{payload,tags}) {
    tags.forEach( (item,index) => {
      state.DISCOVER_DATA[item] = payload[index]
    });
  },

  
}