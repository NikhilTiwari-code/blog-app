import { Client ,   Databases ,ID, Storage , Query } from "appwrite";
import config from "../configuration/config";



class AppwriteService {
    client = new Client();
    Databases;
    buckets;

    constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        this.Databases = new Databases(this.client)
        this.buckets = new Storage(this.client)
    }

        // async createPost({title, content, slug,featuredImage,status,userId}) { // WRONG: 'featuredImage' was a typo.
    async createPost({title, content, slug,featureImage,status,userId}) { // FIX: Corrected to 'featureImage' to match the database schema.
        try {
            const post = await this.Databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status,
                    userId
                }
            )
            if (!post) {
                throw new Error("Failed to create post")
            }
            return post;
        } 
        catch (error) {
            console.error("Appwrite service :: createPost :: error", error);
            throw error;
        }
    }

        // async updatePost(slug,{title, content, featuredImage, status}){ // WRONG: 'featuredImage' was a typo.
    async updatePost(slug,{title, content, featureImage, status}){ // FIX: Corrected to 'featureImage' to match the database schema.
        try {
            const post = await this.Databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featureImage,
                    status
                }
            )
            if (!post) {
                throw new Error("Failed to update post")
            }
            return post;
        } 
        catch (error) {
            console.error("Appwrite service :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug){
        try {
            const post = await this.Databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return post;
        } 
        catch (error) {
            console.error("Appwrite service :: deletePost :: error", error);
            throw error;
        }

    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            const posts = await this.Databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
            return posts;
        } 
        catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            // await this.Databases.getDocument( // WRONG: The function was not returning the fetched post data.
            return await this.Databases.getDocument( // FIX: Added the 'return' statement to ensure the post is returned.
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            ) 
        } 
        catch (error) {
            console.error("Appwrite service :: getPost :: error", error);
            throw error;
        }
    }




    // methods for file upload to appwrite bucket
    
    async uploadFile(file,oldFileId=null){
        try {
            if (oldFileId) {
                await this.buckets.deleteFile(
                    config.appwriteBucketId,
                    oldFileId
                )
            }
             
            return await this.buckets.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);   
            return false
        }
    }

    async deleteFile(fileId){
      try {
          await this.buckets.deleteFile(
              config.appwriteBucketId,
              fileId
        )
          return true
    }
    
      catch (error) {
        console.log("Appwrite serive :: deleteFile :: error", error);
        return false
    }
    }

    getFilePreview(fileId) {
        return this.buckets.getFileView(
            config.appwriteBucketId,
            fileId
        )
    }

    async listFiles(){
        try {
            const response = this.buckets.listFiles(
                config.appwriteBucketId
            )
            return response.files
            
        } catch (error) {
            console.log("Appwrite serive :: listFiles :: error", error);
            return []
        }
    }


}

const appwriteService    = new AppwriteService()

export default appwriteService

