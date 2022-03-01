export type PostData = {
    id: number
    message: string
    likesCount: number
}
export type ContactsType = Record<
    'facebook' | 'github' | 'instagram' | 'mainLink' | 'twitter' | 'vk' | 'website' | 'youtube',
    string | undefined
>

export type PhotosType = Record<
    'large' | 'small',
    string | undefined
>

export type ProfileType = {
    aboutMe: string | undefined
    fullName: string | undefined
    lookingForAJob: boolean | undefined
    lookingForAJobDescription: string | undefined
    userId: string | undefined
    contacts: ContactsType
    photos: PhotosType
}
export type UserType = {
    followed: boolean
    id: string
    name: string
    status: string | null
    photos: PhotosType
}