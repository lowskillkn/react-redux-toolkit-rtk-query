import React, { useState, useEffect } from 'react'
import { IPost } from '../models/IPost'
import { postAPI } from '../services/PostService'
import PostItem from './PostItem'

const PostContainer = () => {
  const [limit, setLimit] = useState(100)
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery(limit, {
    // pollingInterval: 1000,
  })
  const [createPost, {}] = postAPI.useCreatePostMutation()
  const [updatePost, {}] = postAPI.useUpdatePostMutation()
  const [deletePost, {}] = postAPI.useDeletePostMutation()

  useEffect(() => {
    // setTimeout(() => {
    //   setLimit(3)
    // }, 2000)
  }, [])

  const handleCreate = async () => {
    const title = prompt()
    await createPost({ title, body: title } as IPost)
  }

  const handleUpdate = (post: IPost) => {
    updatePost(post)
  }

  const handleRemove = (post: IPost) => {
    deletePost(post)
  }

  return (
    <>
      <div className="post__list">
        <button onClick={() => refetch()}>REFETCH</button>
        <button onClick={handleCreate}>Add new post</button>
        {isLoading && <h1>Идет загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке!</h1>}
        {posts &&
          posts.map((post) => {
            return (
              <PostItem
                update={handleUpdate}
                remove={handleRemove}
                post={post}
                key={post.id}
              />
            )
          })}
      </div>
    </>
  )
}

export default PostContainer
