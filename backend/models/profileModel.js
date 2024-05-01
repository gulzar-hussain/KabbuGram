import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        birthday: { type: Date },
        major: { type: String },
        minor: { type: String },
        batch: { type: String },
        location: { type: String },
        skills: { type: [String] },
        hobbies: { type: [String] },
        interests: { type: [String] },
        clubs: { type: [String] },
        bio: { type: String },
        website: { type: String },
        experience: [
            {
                title: {
                    type: String,
                    required: true,
                },
                company: {
                    type: String,
                    required: true,
                },
                location: { type: String },
                from: {
                    type: Date,
                    required: true,
                },
                to: { type: Date },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: { type: String },
            },
        ],
        education: [
            {
                school: {
                    type: String,
                    required: true,
                },
                degree: {
                    type: String,
                    required: true,
                },
                fieldofstudy: {
                    type: String,
                    required: true,
                },
                location: { type: String },
                from: {
                    type: Date,
                    required: true,
                },
                to: {
                    type: Date,
                },
                current: {
                    type: Boolean,
                    default: false,
                },
                description: {
                    type: String,
                },
            },
        ],
        social: {
            youtube: { type: String },
            twitter: { type: String },
            facebook: { type: String },
            linkedin: { type: String },
            instagram: { type: String },
            github: { type: String },
        },
    },
    {
        timestamps: true,
    }
);

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;
