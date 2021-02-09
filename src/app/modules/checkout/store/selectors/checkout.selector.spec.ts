import { CheckoutState } from '../reducers/checkout.reducer';
import { selectCheckout, selectRental } from './checkout.selector';

const state: CheckoutState = {
  rental: {
    vehicleId: '95ef282b-4378-4447-bfe6-bc362184ca66',
    hourlyValue: 20.0,
    hours: 3,
    value: 60.0,
    date: new Date(Date.now()),
  },
  loading: false,
  nextRental: null,
};

const initialState = {
  checkout: state,
};

describe('CheckoutSelector', () => {
  it('deve retornar o store do checkout', () => {
    const result = selectCheckout.projector(initialState.checkout);
    expect(result).toMatchObject(state);
  });

  it('deve retornar o registro de cotação do aluguel', () => {
    const result = selectRental.projector(initialState.checkout);
    expect(result).toMatchObject(state.rental);
  });
});
