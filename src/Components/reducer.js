const intialState = {
  cardNumber: 0,
  innerStory:0,
  listNumber:1,
  cardArrayNames:[],
}
 
const rootReducer = (state = intialState, action) => {
    switch (action.type) {
      case 'ADD_NEW_CARD':
        return ({ ...state,
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
            state.innerStory=state.innerStory+1
            return {...val, innerCard:[ 
              ...val.innerCard,
              {
              name:action.cardName,
              story:state.innerStory,
              checkList:[]
            }]}
          }
           return val
        })
      return {...state, cardArrayNames: tempInnerCard}
 
      case 'DELETE_INNER_CARD':
      const filteredInnerCards = state.cardArrayNames.map((val) => {
        if(val.id === action.id){
         const tempInner = val.innerCard.filter((ival)=> ival.story !== action.storyNo)
         return {...val, innerCard:tempInner}
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
 
        case 'CHECKED_ITEMS_DELETE':
        const deleteCheckList = state.cardArrayNames.map((val)=>{
          if(val.id === action.id){
            const checkDeleteInnercard = val.innerCard.map(iVal =>{
              if(iVal.story === action.story){
                const deleteChecked = iVal.checkList.filter(iiVal =>iiVal.isChecked !== true)
                return {...iVal, checkList:deleteChecked}
              }
              return{...iVal}
            })
            return {...val, innerCard:checkDeleteInnercard}
          }
          return {...val}
        })
        return {...state, cardArrayNames: deleteCheckList}
 
        case 'EDIT_CHECK_LIST':
        const editCheckList = state.cardArrayNames.map((val)=>{
          if(val.id === action.id){
            const tempInnerc = val.innerCard.map(iVal =>{
              if(iVal.story === action.story){
                const tempCheckStatus = iVal.checkList.map(iiVal =>{
                  if(iiVal.listNumber === action.listNumber){
                    return {...iiVal, task: action.task}
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
        return {...state, cardArrayNames: editCheckList}
      default:
        return state
    }
  }
  
  export default rootReducer