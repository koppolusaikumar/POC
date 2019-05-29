
 
const intialState = {
  cardNumber: 0,
  innerStory:1,
  listNumber:1,
  cardArrayNames:[],
}
 
const rootReducer = (state = intialState, action) => {
    switch (action.type) {
      case 'ADD_NEW_CARD':
        return Object.assign({}, state, {
          cardArrayNames: [
            ...state.cardArrayNames,
            {
              name: action.name,
              id:state.cardNumber+1,
              innerCard:[]
            }
          ],
          cardNumber:state.cardNumber+1
        });
 
      case 'DELETE_CARD':
        const filteredNames = state.cardArrayNames.filter((val) => val.id !== action.id)
        return { ...state,
          cardArrayNames: filteredNames}
 
      case 'ADD_INNER_CARD':  
        const tempInnerCard = state.cardArrayNames.map((val)=>{
          if(val.id === action.id){
            return {...val, innerCard:[ 
              ...val.innerCard,
              {
              name:'User Story',
              story:val.innerCard.length+1,
              checkList:[]
            }]}
          }
            return {...val}
        })
      return {...state, cardArrayNames: tempInnerCard}
 
      case 'DELETE_INNER_CARD':
        const filteredInnerCards = state.cardArrayNames.map((val) => {
          if(val.id === action.id){
           const filterInner = val.innerCard.filter((iVal) => iVal.story !== action.storyNo )
           return {...val, innerCard:filterInner}
          }
          return {...val}
        })
        return { ...state,
          cardArrayNames: filteredInnerCards}
          
 
      case 'ADD_NEW_CHECK_LIST':
      const tempInnerCheckCard = state.cardArrayNames.map((val)=>{
        if(val.id === action.id){
          const tempCheckList = val.innerCard.map((iVal) => {
            if(iVal.story === action.story){
              return {...iVal, checkList:[ 
                  ...iVal.checkList,
                  {
                    task: action.task,
                    listNumber:iVal.checkList.length+1,
                    isChecked:false
                }]
              }
            }
            return {...iVal}
          })
          return {...val, innerCard:tempCheckList}
        }
          return {...val}
      })
     return {...state, cardArrayNames: tempInnerCheckCard}
 
      case 'CHECK_BOX_STATUS_UPDATE':
        const updaatedCheckList = state.cardArrayNames.map((val)=>{
          if(val.id === action.id){
            const tempInnerc = val.innerCard.map(iVal =>{
              if(iVal.story === action.story){
                const tempCheckStatus = iVal.checkList.map(iiVal =>{
                  if(iiVal.listNumber === action.listNumber){
                    return {...iiVal, isChecked: !iiVal.isChecked}
                  }
                    return {...iiVal}
                })
                return {...iVal, checkList:tempCheckStatus}
              }
              return{...iVal}
            })
            return {...val, innerCard:tempInnerc}
          }
          return {...val}
        })
        return {...state, cardArrayNames: updaatedCheckList}
 
      default:
        return state
    }
  }
  
  export default rootReducer;