import { useDispatch, useSelector } from 'react-redux';
import { makeNewTicket } from '../reducers/TicketReducer';
import { useState } from 'react';

const NewTicketForm = ({ show }) => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const token = useSelector((state) => state.token);
  const [description, setDescription] = useState('');
  const [type, setType] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description === '') return;
    // add new ticket stuff - dispatch etc.
    console.log(token);

    // dismiss modal
    showHideModal(e);
  };
  // continue html work on add ticket form -- need to center the div, give more area for description, and handle submission (and clicking x button to dismiss modal)

  const showHideModal = (e) => {
    e.preventDefault();

    // toggle modal visibility
    const modalClasses = document.getElementById(
      'authentication-modal',
    ).classList;
    // could use visibility = gone instead?
    // consider resetting fields to blank?
    if (modalClasses.contains('hidden')) {
      modalClasses.remove('hidden');
      show(true);
    } else {
      modalClasses.add('hidden');
      show(false);
    }
  };

  return (
    <>
      <div
        id='authentication-modal'
        tabIndex='-1'
        aria-hidden='true'
        className='fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'>
        <div className='relative w-full max-w-md max-h-full'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <button
              type='button'
              className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white'
              data-modal-hide='authentication-modal'
              onClick={showHideModal}>
              <svg
                aria-hidden='true'
                className='w-5 h-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'></path>
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
            <div className='px-6 py-6 lg:px-8'>
              <h3 className='mb-4 text-xl font-medium text-gray-900 dark:text-white'>
                Add a new ticket:
              </h3>
              <form
                className='space-y-6'
                action='#'>
                <div>
                  <label
                    htmlFor='issue'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Issue Type:
                  </label>
                  <select
                    id='issue'
                    name='issue'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/3 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    onChange={({ target }) => setType(target.value)}>
                    <option value='Epic'>Epic</option>
                    <option value='Story'>Story</option>
                    <option value='Task'>Task</option>
                    <option value='Subtask'>Subtask</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor='description'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Description:
                  </label>
                  <input
                    type='description'
                    name='description'
                    id='description'
                    value={description}
                    onChange={({ target }) => setDescription(target.value)}
                    placeholder='I need it to be 50% smaller and 100% more on time.'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white'
                    required
                  />
                </div>
                <div className='flex justify-between'>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'></div>
                  </div>
                </div>
                <button
                  type='submit'
                  className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                  onClick={handleSubmit}>
                  Add Ticket
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTicketForm;
