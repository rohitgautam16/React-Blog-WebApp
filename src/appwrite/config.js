import conf from "../conf/conf";
import { Client, ID , Databases , Storage , Query} from "appwrite";
import { Permission, Role } from 'appwrite';

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)   
    }
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                slug, // Document ID (optional, or use ID.unique() for auto-generated IDs)
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
                [
                    Permission.read(Role.any()), // Public read access for all users
                ],
                [
                    Permission.write(Role.user(userId)), // Only the creator can update or delete
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId))
                ]
            );
        } catch (error) {
            console.log("Appwrite Service :: Create Post :: error", error);
            throw error;
        }
    }


    async updatePost(slug, { title, content, featuredImage, status }, userId) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId, // Database ID
                conf.appwriteCollectionId, // Collection ID
                slug, // Document ID
                {
                    title,
                    content,
                    featuredImage,
                    status,
                },
                [
                    Permission.read(Role.any()) // Public read access
                ],
                [
                    Permission.write(Role.user(userId)), // Only the creator can update or delete
                    Permission.update(Role.user(userId)),
                    Permission.delete(Role.user(userId))
                ]
            );
        } catch (error) {
            console.log("Appwrite Service :: Update Post :: error", error);
            throw error;
        }
    }
    
 

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: delete Post :: error", error)
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite Service :: Get Post :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite Service :: Get Posts ");
            
        }
    }

    // file upload method

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Service :: Upload File :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite Service :: Delete File :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    
}

const service = new Service()

export default service