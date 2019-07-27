import React from 'react'
import Board from './Board'
import withData from '../withRestData'

const Kanban = (props) => {
  
  const {data, loading, kanban} = props
  const cachedBoardData = JSON.parse(localStorage.getItem('boardData'))

  if(loading && !cachedBoardData) {
    return <div>Loading...</div>

  } else {
    const {clients, product} = data
    console.log(clients)
    let boardData

    if(!loading) {
      boardData = {
        cards: clients.map(client => ({id:client._id, content: client.name, ...client})),
        columns: product.status_list.map(status => ({title: status.name, cardIds:[], ...status})),
        columnOrder: product.status_list.map(status => status.id)
      }
   
      boardData.columns.map(c => {
        const filteredClients = clients.filter(client => {
          const clientProduct = client.products.find(p => p.product._id === product._id)
          return clientProduct ? clientProduct.status === c.id : false
        })
        c.cardIds = filteredClients.map(c => c._id)
      })
  
      localStorage.setItem('boardData', JSON.stringify(boardData))

    } else {
      boardData = cachedBoardData
    }

    const onDragEnd = (newState, result) => {
      props.onDragEnd(newState)
      let client = clients.find(c => c._id == result.draggableId)
      let updatedProduct = client.products.find(p => p.product._id === product._id)
      updatedProduct.status = result.destination.droppableId
      console.log(client)
  
      props.submitData('clients',{
        _id: client._id, 
        data: {
          products: [
            ...client.products
          ]
        }
      })
    }
    
    return <Board {...props} data={{...boardData, ...kanban}} onDragEnd={onDragEnd} isDragDisabled={loading} />
  }
}

export default withData(Kanban, [
  {
    name: 'clients',
    url: 'clients?limit=0&sort=name',
  },
  {
    name: 'product',
    url: 'products',
    _id: '5b41298f7997cfafafe2b3c6'
  },
])