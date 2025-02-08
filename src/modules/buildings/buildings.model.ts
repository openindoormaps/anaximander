// Project: Open Indoor Maps
// File: src/modules/buildings/buildings.model.ts

export interface Building {
    id: number;
    name: string;
    desc: string;
    address: any;
    attributes: any; 
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  }