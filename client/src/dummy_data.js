clients = [
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

categories: [
  {
    _id: '1',
    name: 'Contato'
  }
]

attribute_types: [
  {
    _id: '1',
    name: 'Celular',

  },
  {
    _id: '2',
    name: 'Email'
  }
]

export { clients };
