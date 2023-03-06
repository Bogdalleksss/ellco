import * as React from 'react';

export type pages = 'users' | 'news' | 'promotions' | 'districts' | 'settlements' | 'tariffs' | 'orders';

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
  tariffs: string | string[]
  agent: string | null
  createdAt?: Date
}

export interface ITariff {
  _id?: string
  title: string
  category?: string
  description?: string
  type: string
  tags?: string | string[]
  price: number | null
  newPrice?: number | null
  firstMonthFree?: boolean
  showInAllSettlements?: boolean
  priceDisplayType?: string
  priceDisplayCustom?: string
  speedMbs?: number | null
  channelsCount?: number | null
  mobileMinutsDagestan?: string
  cityMinutsDagestan?: string
  localTelephoneСonnectionsType?: string
  firstMinutePrice?: number | null
  externalServices?: string[] | string
  kionServiceDescription?: string
  mtsServiceDescription?: string
  icon?: string
  createdAt?: string
}

export interface IOrder {
  _id?: string
  fullName: string
  phone: string
  connectionAdress: string
  connectionType: string
  tariffs?: string[]
  cctv: {
    buyCams: boolean
    recordKeepDays: number
    camsCountTotal: number
    camsForBuy: ICamForBy[]
  }
  createdAt: string
}

export interface ICamForBy {
  name: string
  count: number
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
  access?: string
  isInfo?: boolean
  isEdit?: boolean
  fields: IColumns[]
  data: Array<IUser | INews | IPromotions | IDistricts | ITariff | IOrder>
  onRemove?: (id: string) => void
}

export interface IColumns {
  id: number
  name: string
}

export interface IFormDataUpdate {
  id: string
  body: FormData
}
