export interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
}

export interface UserCreate {
    name: string;
    email: string;
    password: string;
}

export interface UserUpdate {
    name?: string | null;
    email?: string | null;
}

export interface Purchase {
    id: string;
    description: string;
    category: string;
    price: number;
    created_at: string;
    updated_at: string;
    user_id: string;
}

export interface PurchaseCreate {
    description: string;
    category: string;
    price: number;
}

export interface PurchaseUpdate {
    description?: string | null;
    category?: string | null;
    price?: number | null;
}

export interface AuthRequest {
    username: string;
    password: string;
    grant_type?: string | null;
    scope?: string;
    client_id?: string | null;
    client_secret?: string | null;
}
