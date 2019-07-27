import React from 'react'
import styled from 'styled-components'
import {Draggable} from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid #eee
  border-radius: 2px
  padding: 8px
  margin-bottom: 8px
  background-color: white
`

export default ({card, index, isDragDisabled}) =>
<Draggable draggableId={card.id} index={index} isDragDisabled={isDragDisabled}>
  {(provided) => (
    <Container
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      innerRef={provided.innerRef}
    >
      {card.content}
    </Container>
  )}
  
</Draggable>