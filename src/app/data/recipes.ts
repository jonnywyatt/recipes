export const recipesData = [
  {
    id: '1',
    title: 'Kale & sausage casserole',
    images: [
      { fileName: 'kale-sausage-640.jpg', width: 640 },
      { fileName: 'kale-sausage-1100.jpg', width: 1600 },
    ],
    tags: [
      {
        id: 'fibre',
        label: 'Fibre',
      },
      {
        id: 'meaty',
        label: 'Meaty',
      },
    ],
    preparationTimeMin: 45,
    ingredients: {
      main: [
        {
          id: '1',
          quantity: { min: 2, max: 4 },
        },
        {
          id: '2',
          quantity: 1,
        },
        {
          id: '3',
          quantity: 1,
        },
        {
          id: '4',
          quantity: 1,
        },
        {
          id: '5',
          alternatives: [{ id: '6' }],
          quantity: { min: 1, max: 2 },
        },
        {
          id: '7',
          quantity: 1,
          alternatives: [{ id: '8' }],
        },
        {
          id: '9',
          quantity: { min: 2, max: 3 },
        },
        {
          id: '10',
          quantity: 1,
        },
        {
          id: '11',
          quantity: 3,
        },
      ],
      flavourBoosters: [
        {
          id: '12',
          description:
            'Dry white wine - mix with the water to cook the pearl barley',
        },

        {
          alternatives: [{ id: '13' }, { id: '14' }],
          description:
            'Herbs - try sage, oregano or a bay leaf. Fresh herbs will add more flavour, but dried will work too.',
        },
      ],
    },
    steps: [
      'Chop the garlic and onion then fry in the olive oil on a low heat until soft.',
      'Add pearl barley, stock cube and a litre of water (white wine  can also be added). Keep the heat low and simmer until the grains are plump and soft (around 30 min).',
      'Chop the carrots then add to the pan after 15 minutes of simmering.',
      'Meanwhile grill the sausages then add to the pan.',
      '5 minutes before the pearl barley is cooked, add the kale.',
    ],
  },
  {
    id: '2',
    title: 'Roasted squash',
    images: [
      { fileName: 'squash-pancetta-640.jpg', width: 640 },
      { fileName: 'squash-pancetta-1600.jpg', width: 1600 },
    ],
    tags: [
      {
        id: 'fibre',
        label: 'Fibre',
      },
      {
        id: 'side-dish',
        label: 'Side dish',
      },
    ],
    preparationTimeMin: 35,
    ingredients: {
      main: [],
      flavourBoosters: [],
    },
  },
  {
    id: '3',
    title: 'Nasi goreng',
    images: [
      { fileName: 'nasi-goreng-640.jpg', width: 640 },
      { fileName: 'nasi-goreng-1600.jpg', width: 1600 },
    ],
    tags: [
      {
        id: 'chilli',
        label: 'Chilli',
      },
    ],
    preparationTimeMin: 30,
    ingredients: {
      main: [],
      flavourBoosters: [],
    },
  },
  {
    id: '4',
    title: 'Broad bean salad',
    images: [
      { fileName: 'broad-bean-salad-640.jpg', width: 640 },
      { fileName: 'broad-bean-salad-1600.jpg', width: 1600 },
    ],
    tags: [
      {
        id: 'fibre',
        label: 'Fibre',
      },
      {
        id: 'protein',
        label: 'Protein',
      },
    ],
    preparationTimeMin: 20,
    ingredients: {
      main: [],
      flavourBoosters: [],
    },
  },
  {
    id: '5',
    title: 'Tuna niçoise',
    images: [
      { fileName: 'tuna-nicoise-640.jpg', width: 640 },
      { fileName: 'tuna-nicoise-1600.jpg', width: 1600 },
    ],
    preparationTimeMin: 25,
    tags: [
      {
        id: 'fish',
        label: 'Fish',
      },
      {
        id: 'protein',
        label: 'Protein',
      },
    ],
    ingredients: {
      main: [],
      flavourBoosters: [],
    },
  },
];
