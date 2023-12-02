import mongoose from 'mongoose'
import {SocialLink} from "@/interfaces";

export interface User extends mongoose.Document {
    address: string
    name: string
    biography: string
    avatar: string
    links: SocialLink[]
}

const UserSchema = new mongoose.Schema<User>({
    address: {
        type: String,
        required: [true, 'Please provide an id for this user.'],
    },
    name: {
        type: String,
        required: [true, 'Please provide a name for this user.'],
        maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    biography: {

        type: String,
        required: [true, "Please provide the user owner's name"],
        maxlength: [60, "Bio cannot be more than 60 characters"],
    },
    avatar: {

        type: String,
        required: [true, 'Please specify the avatar.']
    },
    links: {
        type: [String],
        required: [true, 'Please provide the links.'],
    },
})

export default mongoose.models.User || mongoose.model<User>('User', UserSchema)
