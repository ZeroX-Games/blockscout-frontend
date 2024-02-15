import type { UpdateInterpretationResponse } from 'types/api/updateInterpretation';

export const UPDATE_INTERPRETATION: UpdateInterpretationResponse = {
  data: {
    summaries: [
      {
        amount: 123,
        collection: {
          name: 'Azuki',
          // eslint-disable-next-line max-len
          imgUrl: 'https://i.seadn.io/gae/H8jOCJuQokNqGBpkBN5wk1oZwO7LM8bNnrHCaekV2nKjnCqw6UB5oaH8XyNeBDj6bA_n1mjejzhFQUP3O1NfjFLHr3FOaeHcTOOT?auto=format&dpr=1&w=48 48w',
        },
        domain: {
          name: 'GTA V',
          imgUrl: 'https://i.pinimg.com/564x/72/b6/08/72b608e2d9760300ca8773481a7a509a.jpg',
        },
      },
    ],
  },
};
