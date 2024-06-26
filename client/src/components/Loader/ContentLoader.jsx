import { Skeleton } from '@mui/material'
import React from 'react'

const ContentLoader = () => {
  return (
    <>
        <div className='flex flex-col gap-5'>
            <Skeleton animation="wave" variant="rounded" width={400} height={15} />
            <Skeleton animation="wave" variant="rounded" width={400} height={15} />
            <Skeleton animation="wave" variant="rounded" width={400} height={15} />
            <Skeleton animation="wave" variant="rounded" width={400} height={15} />
            <Skeleton animation="wave" variant="rounded" width={400} height={15} />
            <Skeleton animation="wave" variant="rounded" width={400} height={15} />
            <Skeleton animation="wave" variant="rounded" width={400} height={15} />
            <Skeleton animation="wave" variant="rounded" width={400} height={15} />
        </div>
    </>
  )
}

export default ContentLoader