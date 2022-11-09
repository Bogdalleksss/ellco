import * as React from 'react';

export type pages = 'users' | 'news' | 'promotions' | 'districts' | 'settlements';

export interface IUser {
  _id?: string
  email: string
  role: 'administrator' | 'moderator'
  displayName: string
  createdAt: Date
}

export interface INews {
  _id?: string
  creatorId?: string
  title: string
  annonce: string
  description: string
  image?: string
  createdAt?: Date
}

export interface IPromotions {
  _id?: string
  creatorId?: string
  title: string
  annonce: string
  description: string
  image?: string
  tariffs?: string
  createdAt?: Date
}

export interface IDistricts {
  _id?: string
  title: string
  createdAt?: Date
}

export interface ISettlement {
  _id?: string
  district: string
  title: string
  tariffs: string
  agent: string | null
  createdAt?: Date
}

export interface IPropsLayout {
  children?: React.ReactNode
}

export interface IDefaultSlice {
  status: string | null
  error: string
}

export interface ISignIn {
  email: string
  password?: string
}

export interface IField {
  value: string
  onChange: (val: string) => void
}

export interface IPropsEdit {
  type: 'EDIT' | 'CREATE' | 'INFO'
}

export interface IData {
  name: pages
  fields: IColumns[]
  data: Array<IUser | INews | IPromotions | IDistricts>
  onRemove: (id: string) => void
}

export interface IColumns {
  id: number
  name: string
}
