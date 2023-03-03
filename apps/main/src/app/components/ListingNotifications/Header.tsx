import { ClearOutlined, DeleteForever, DoneOutline, ExpandLess, ExpandMore, PersonAdd, PersonOff } from '@mui/icons-material';
import { Collapse, IconButton, ListItem, ListItemText } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { writeText, readText } from '@tauri-apps/api/clipboard';

interface Props {
  item: any
}

export const Header = ({ item }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isFolded, setIsFolded] = useState(false);

  const [children, setChildren] = useState<any>([])

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    // TODO: handle deletion logic
  };

  useEffect(() => {
    setChildren(item.items)
  }, [])

  const removeChild = (id: number) => {
    setChildren((curr: any) => {
      console.log(curr)
      return curr.filter((e: any) => e.id !== id)
    })

  }

  return (
    <React.Fragment key={item.name}>
      <ListItem button onClick={() => setIsFolded(!isFolded)}>
        {isFolded ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary={item.name} />

        {!showConfirm ? (
          <IconButton onClick={handleDelete}>
            <DeleteForever />
          </IconButton>
        ) : (
          <>
            <IconButton onClick={handleConfirm}>
              <DoneOutline />
            </IconButton>
            <IconButton onClick={handleCancel}>
              <ClearOutlined />
            </IconButton>
          </>
        )}
      </ListItem>
      <Collapse in={isFolded} timeout="auto" unmountOnExit>
        {children && children.map((item: any, index: any) => (
          <ListItem key={index} button>
            <ListItemText primary={item.msg} style={{ backgroundColor: "red" }} />


            <IconButton onClick={() => removeChild(index)}>
              <PersonAdd />
            </IconButton>

            <IconButton onClick={() => removeChild(index)}>
              <PersonOff />
            </IconButton>

            <IconButton onClick={() => removeChild(index)}>
              <DeleteForever />
            </IconButton>

          </ListItem>
        ))}
      </Collapse>
    </React.Fragment>
  )
}
