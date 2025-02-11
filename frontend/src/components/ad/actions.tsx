import { ReactElement } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { RiDeleteBin2Fill } from 'react-icons/ri'

type AdAction = {
  id: number
  title: string
  icon: ReactElement
}

export const ACTIONS: AdAction[] = [
  {
    id: 1,
    title: 'Edit',
    icon: <MdModeEdit />,
  },
  {
    id: 2,
    title: 'Delete',
    icon: <RiDeleteBin2Fill />,
  },
]
