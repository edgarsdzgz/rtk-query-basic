import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Contact } from '../typeInterfaces/contactInterface'

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3006'
  }),
  endpoints:(builder) => ({
    getContacts: builder.query<Contact[], void>({
      query:() => `/contacts`
    }),
    getOneContact: builder.query<Contact, string>({
      query:(id) => `/contacts/${id}`
    })
  })
})

export const {
  useGetContactsQuery,
  useGetOneContactQuery,
} = contactsApi;
