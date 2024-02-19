import { FC } from 'react';

import { PageLoadingProps } from './PageLoading.interface';
import './PageLoading.scss';

export const PageLoading:FC<PageLoadingProps> = ({ isLoading }) => {
  return (
    isLoading ? 
      <div className='page-loading'>
        Loading...
      </div> : 
    null
  )
}