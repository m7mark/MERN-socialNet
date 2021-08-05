export type PostData = {
    id: number
    message: string
    likesCount: number
}
export type ContactsType = {
    facebook: string | null
    github: string | null
    instagram: string | null
    mainLink: string | null
    twitter: string | null
    vk: string | null
    website: string | null
    youtube: string | null
}
export type PhotosType = {
    large: string | null
    small: string | null
}
export type ProfileType = {
    aboutMe: string | null
    fullName: string | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
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