// Project: Open Indoor Maps
//File: src/modules/permissions/permissions.model.ts

export interface Permission {
    id: number;
    role_id: number;
    permission: any;
    created_at: Date;
    updated_at: Date;
  }