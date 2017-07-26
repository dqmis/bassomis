export interface Post{
    _id: string,
    title: string,
    category: string,
    content: string,
    isImportant: boolean,
    intro: string,
    image: string,
    photo: any,
    dateCreated: string,
    dateEdited: string,
    intialized: Date
}