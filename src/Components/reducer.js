const intialState = {
  cardNumber: 0,
  innerStory:1,
  listNumber:1,
  cardArrayNames:[],
  innerCard:[],
  checkList:[],
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
            }
          ],
          cardNumber:state.cardNumber+1
        });

       case 'DELETE_CARD':
        const filteredNames = state.cardArrayNames.filter((val) => val.id !== action.id)
        return { ...state,
          cardArrayNames: filteredNames}

      case 'ADD_INNER_CARD':
      return Object.assign({}, state, {
        innerCard: [
          ...state.innerCard,
          {
            name:'User Story',
            id:action.id,
            story:state.innerStory
          }
        ],
        innerStory:state.innerStory+1
      });
      case 'DELETE_INNER_CARD':
        const filteredInnerCards = state.innerCard.filter((val) => val.story !== action.storyNo )
        return { ...state,
          innerCard: filteredInnerCards}

      case 'ADD_NEW_CHECK_LIST':
        return Object.assign({}, state, {
          checkList: [
            ...state.checkList,
            {
              task: action.task,
              id:action.id,
              story:action.story,
              listNumber:state.listNumber
            }
          ],
          listNumber:state.listNumber+1
        });

      default:

        return state

    }

  }

 

  export default rootReducer