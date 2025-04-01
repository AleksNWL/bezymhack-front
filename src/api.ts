import axios, { AxiosInstance } from 'axios';
import { AuthRequest, Purchase, PurchaseCreate, PurchaseUpdate, User, UserCreate, UserUpdate } from './types/ApiTypes';

export class ApiClient {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "http://localhost:8000/",
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
    }

    private async request<T>(endpoint: string, method: string = 'GET', data?: any): Promise<T> {
        try {
            const response = await this.axiosInstance.request<T>({
                url: endpoint,
                method,
                data,
                withCredentials: true,
            });
            return response.data;
        } catch (error: any) {
            throw new Error(error.response?.data?.message || error.message);
        }
    }

    async createUser(user: UserCreate): Promise<User> {
        return this.request<User>('/api/user/', 'POST', user);
    }

    async getRandomUser(): Promise<User> {
        return this.request<User>('/api/user/random/');
    }

    async getUserById(id: string): Promise<User> {
        return this.request<User>(`/api/user/${id}/`);
    }

    async updateUser(id: string, data: UserUpdate): Promise<User> {
        return this.request<User>(`/api/user/${id}/`, 'PATCH', data);
    }

    async login(authData: AuthRequest): Promise<any> {
        return this.request<any>('/api/token/', 'POST', authData);
    }

    async createPurchase(purchase: PurchaseCreate): Promise<Purchase> {
        return this.request<Purchase>('/api/purchase/', 'POST', purchase);
    }

    async getAllPurchases(): Promise<Purchase[]> {
        return this.request<Purchase[]>('/api/purchase/all/');
    }

    async getPurchaseById(id: string): Promise<Purchase> {
        return this.request<Purchase>(`/api/purchase/${id}/`);
    }

    async updatePurchase(id: string, data: PurchaseUpdate): Promise<Purchase> {
        return this.request<Purchase>(`/api/purchase/${id}/`, 'PATCH', data);
    }

    async deletePurchase(id: string): Promise<string> {
        return this.request<string>(`/api/purchase/${id}/`, 'DELETE');
    }
}
