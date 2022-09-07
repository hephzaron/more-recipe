import { createAction } from '@reduxjs/toolkit';

export const showModal = createAction('modal/show', (show) => ({ payload: { show } }));
export const hideModal = createAction('modal/hide', (show) => ({ payload: { show } }));
