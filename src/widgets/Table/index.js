import React, { useState, useMemo, useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import TableUI, { SORT_DIRECTION } from '../../components/Table'
import { filterTextState } from '../Filters'
import UserDialog from './UserDialog'
import { filterPosts, sortPosts, updatePost } from './helpers'
import { savePost } from './api'
import { useGetPosts } from './hooks'
import { getConfig } from './config'

const Table = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [sortedBy, setSortedBy] = useState({ column: '', direction: SORT_DIRECTION.ASC, isNumber: false })
  const [editCommentId, setEditCommentId] = useState(null)

  const bodyTextFilter = useRecoilValue(filterTextState)

  const [posts, setPosts] = useGetPosts()

  const filteredPosts = useMemo(() => filterPosts(posts, bodyTextFilter), [bodyTextFilter, posts])
  const sortedPosts = useMemo(() => sortPosts(filteredPosts, sortedBy), [sortedBy, filteredPosts])

  const saveComment = useCallback(async (newComment) => {
    const updatePostGenerator = updatePost(posts, editCommentId, newComment)

    const { value: updatedPost } = updatePostGenerator.next()

    const { data: newPost } = await savePost(updatedPost)

    const { value: updatedPosts } = updatePostGenerator.next(newPost)

    setPosts(updatedPosts)
    setEditCommentId(null)
  }, [posts, editCommentId, setPosts])

  const config = getConfig(
    editCommentId,
    setSelectedUser,
    setEditCommentId,
    saveComment
  )

  return (
    <div className="Table">
      <TableUI
        config={config}
        sortedBy={sortedBy}
        setSortedBy={setSortedBy}
        sortedPosts={sortedPosts}
      />
      <UserDialog
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
    </div>
  )
}

export default Table
