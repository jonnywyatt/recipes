import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export const tagsData = [
  {
    id: 'fibre',
    label: 'Fibre',
  },
  {
    id: 'meaty',
    label: 'Meaty',
  },

  {
    id: 'side-dish',
    label: 'Side dish',
  },

  {
    id: 'chilli',
    label: 'Chilli',
  },

  {
    id: 'protein',
    label: 'Protein',
  },

  {
    id: 'fish',
    label: 'Fish',
  },
];

export async function GET(req: NextApiRequest) {
  return NextResponse.json(tagsData);
}
