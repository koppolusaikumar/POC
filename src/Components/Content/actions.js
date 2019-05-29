export const deleteCard = (id) => ({
    type: 'DELETE_CARD',
    id
})
 
export const addInnerCard = (id) => ({
    type: 'ADD_INNER_CARD',
    id
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