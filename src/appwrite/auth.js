import { Client, Account ,ID} from "appwrite";
import config from "../configuration/config";



class AuthService  {
     client = new Client()
     account 

     constructor() {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)

        this.account = new Account(this.client)
     }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create
            (ID.unique(), 
            email, 
            password, 
            name)

            if(!userAccount) {  
                throw new Error("Account not created")
            }
            console.log("Account created successfully", userAccount)
            
            const session =await this.login({email, password})
            if(session) {
                return session
            }
        } catch (error) {
            console.log("Appwrite error while creating account", error)
            throw error
        }

     }

    async login({email, password}) {
        try {
            try {
                const currentUser = await this.getCurrentUser();
                if (currentUser) {
                    return currentUser;
                }
            } catch (getErr) {
            }

            const session = await this.account.createEmailPasswordSession
            (email, password)
            
            if(!session) {
                throw new Error("Invalid credentials")
            }
            return this.getCurrentUser()
        } catch (error) {
            console.error("Appwrite service :: login :: error", error)
            throw error
        }
    }
    
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.error("Appwrite service :: getCurrentUser :: error", error)
            throw error
        }
    }
    async logout() {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error)
            throw error
        }
    }
}    
 
export const authService = new AuthService()

