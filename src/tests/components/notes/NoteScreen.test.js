import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { activeNote } from '../../../actions/notes';
import { NoteScreen } from '../../../components/notes/NoteScreen';

jest.mock('../../../actions/notes', () => ({
  activeNote: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: '1',
    name: 'Andres',
  },
  ui: {
    loading: false,
    msgError: null,
  },
  notes: {
    active: {
      id: 123,
      title: 'Hola',
      body: 'mundo',
      date: 0,
    },
    notes: [],
  },
};

let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <NoteScreen />
  </Provider>
);

describe('Prueba en <NoteScreen />', () => {
  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de evaluar el activeNote', () => {
    wrapper.find('input[name="title"]').simulate('change', {
      target: {
        name: 'title',
        value: 'Hola de nuevo',
      },
    });

    expect(activeNote).toHaveBeenLastCalledWith(
        123,
        {
            title: 'Hola de nuevo',
            body: 'mundo',
            id: 123,
            date: 0, 
        }
    );
  });
});
