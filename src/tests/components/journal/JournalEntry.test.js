import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { JournalEntry } from '../../../components/journal/JournalEntry';
import { activeNote, notesLogout } from '../../../actions/notes';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};

let store = mockStore(initState);

store.dispatch = jest.fn();

const nota = {
  id: 0,
  title: 'hola',
  body: 'mundo',
  url: 'https://foto.com/foto.jpg',
};

const wrapper = mount(
  <Provider store={store}>
    <JournalEntry {...nota} />
  </Provider>
);

describe('Pruebas en <JournalEntry/>', () => {
  test('debed de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe de activar la nota', () => {
    wrapper.find('.journal__entry').prop('onClick')();
    expect(store.dispatch).toHaveBeenCalledWith(activeNote(nota.id, { ...nota }));
  });
});
