 
export const deleteCard = (id) => ({
    type: 'DELETE_CARD',
    id
})
 
export const addInnerCard = (id,cardName) => ({
    type: 'ADD_INNER_CARD',
    id,
    cardName
})
 
export const deleteInnerCard = (id, storyNo) => ({
    type: 'DELETE_INNER_CARD',
    id,
    storyNo
})
 
export const addCkeckList = (task, id, story) => ({
    type: 'ADD_NEW_CHECK_LIST',
    task,
    id,
    story
  })
 
  export const handleCheckBox = (id, story, listNumber) => ({
    type: 'CHECK_BOX_STATUS_UPDATE',
    id,
    story,
    listNumber
  })
 
  export const deleteChecked = (id, story) => ({
    type: 'CHECKED_ITEMS_DELETE',
    id,
    story,
  })
 
  export const editCkeckList = (task, id, story, listNumber) => ({
    type: 'EDIT_CHECK_LIST',
    task,
    id,
    story,
    listNumber
  })