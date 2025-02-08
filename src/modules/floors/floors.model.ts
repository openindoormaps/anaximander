// Project: Open Indoor Maps
// File: src/modules/floors/floors.model.ts
export interface Floor {
    id: number;
    building_id: string;
    name: string;
    desc: string;
    elevation: number;
    floor_map: string;
    attributes: any;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
  }