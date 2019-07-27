const clients = [
  {
    name: 'José da Silva',
    attributes: [
      {
        category: 'contact',
        type: 'mobile_phone',
        content: '(11) 99966-8246'
      },
      {
        category: 'contact',
        type: 'email',
        content: 'bvodola@gmail.com'
      }
    ],
    products: [
      {
        type: 'DPVAT',
        status: 0
      },
      {
        type: 'Trabalhista',
        status: 2
      },
    ]
  }
];

const kanban = {
  cards: [
    { id: 'card-1', content: 'Card 1'},
    { id: 'card-2', content: 'Card 2'},
    { id: 'card-3', content: 'Card 3'},
  ],
  columns: [
    {
      id: 'column-1',
      title: 'To Do',
      cardIds: ['card-1', 'card-2', 'card-3']
    },
    {
      id: 'column-2',
      title: 'In Progress',
      cardIds: []
    },
    {
      id: 'column-3',
      title: 'Done',
      cardIds: []
    }
  ],
  columnOrder: ['column-1', 'column-2', 'column-3']
}

export { clients, kanban };
