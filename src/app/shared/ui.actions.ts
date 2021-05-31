import { createAction } from '@ngrx/store';

export const isLoading = createAction('[UI Component] loading');
export const stopLoading = createAction('[UI Component] Stop loading');