import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column'

class Board extends React.Component {

  onDragEnd = result => {
    const {destination, source, draggableId} = result
    const {onDragEnd, data} = this.props
    if(!destination) return

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const {columns} = data
    let newColumns = [ ...columns ]

    newColumns.find(c => c.id === source.droppableId).cardIds.splice(source.index,1)
    newColumns.find(c => c.id === destination.droppableId).cardIds.splice(destination.index,0,draggableId)

    const newState = {
      ...data,
      columns: newColumns
    }

    onDragEnd(newState, result)
  }

  render() {
    const {data, isDragDisabled} = this.props
    return(
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div style={{display: 'flex'}}>
          {data.columnOrder.map(columnId => {
            const column = data.columns.find(c => c.id === columnId);
            const cards = column.cardIds.map(cardId => data.cards.find(t => t.id === cardId ))
            return <Column key={column.id} column={column} cards={cards} isDragDisabled={isDragDisabled} />
          })}
        </div>
      </DragDropContext>
    )
  }

}

export default Board