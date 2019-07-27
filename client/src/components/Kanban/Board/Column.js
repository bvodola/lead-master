import React from 'react'
import styled from 'styled-components'
import Card from './Card'
import { Droppable } from 'react-beautiful-dnd';


const Container = styled.div`
  margin: 8px
  border: 1px solid gray
  border-radius: 2px
  flex: 1
  display: flex
  flex-direction: column
`

const Title = styled.h3`
  padding: 8px
`

const CardList = styled.div`
  padding: 8px
  background-color: ${props => props.isDraggingOver ? 'lightgray':'inherit'}
  flex-grow: 1
  min-height: 1
`

export default ({column, cards, isDragDisabled}) => (
  <Container>
    <Title>{column.title}</Title>
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <CardList
          isDraggingOver={snapshot.isDraggingOver}
          innerRef={provided.innerRef}
          {...provided.droppableProps}
        >
          {cards.map((card,index) => <Card isDragDisabled={isDragDisabled} key={card.id} card={card} index={index} />)}
          {provided.placeholder}
        </CardList>
      )}
    </Droppable>
  </Container>
)