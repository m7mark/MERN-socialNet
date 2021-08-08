export type PostData = {
    id: number
    message: string
    likesCount: number
}
export type ContactsType = {
    facebook: string | undefined
    github: string | undefined
    instagram: string | undefined
    mainLink: string | undefined
    twitter: string | undefined
    vk: string | undefined
    website: string | undefined
    youtube: string | undefined
}
export type PhotosType = {
    large: string | null
    small: string | null
}
export type ProfileType = {
    aboutMe: string | undefined
    fullName: string | undefined
    lookingForAJob: any
    lookingForAJobDescription: string | undefined
    userId: number | null
    contacts: ContactsType
    photos: PhotosType
}
export type UserType = {
    followed: boolean
    id: number
    name: string
    status: string | null
    photos: PhotosType
}