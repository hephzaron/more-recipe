import { createAction } from '@reduxjs/toolkit';

export const showModal = createAction('modal/show', ({ show, form }) => ({ payload: { show, form } }));
export const hideModal = createAction('modal/hide', ({ show }) => ({ payload: { show, form: '' } }));
