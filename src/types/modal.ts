import { MutableRefObject } from 'react'
import { User } from './api'

export type IAction = 'create' | 'edit'

export interface IModalProp<T = User.UserItem> {
  mRef: MutableRefObject<{ open: (type: IAction, data: T) => void } | undefined>
  update: () => void
}

export interface IModalProp2<T = User.UserItem> {
  mRef: MutableRefObject<{ open: (data: T) => void } | undefined>
  update: () => void
}
