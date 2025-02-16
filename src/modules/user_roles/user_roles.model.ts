// Project: Open Indoor Maps
//File: src/modules/user_roles/user_roles.model.ts
export interface UserRole {
    id: number;
    name: string;
    desc: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  }