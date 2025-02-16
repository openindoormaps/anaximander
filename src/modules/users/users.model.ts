// Project: Open Indoor Maps
// File: src/modules/users/users.models.ts

export interface User {
    id: number;
    user_name: string;
    first_name: string;
    last_name?: string;
    email: string;
    hashed_password: string;
    is_sso: boolean;
    sso_type_id?: number;
    role_id: number;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  }