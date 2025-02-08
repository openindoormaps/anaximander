// Project: Open Indoor Maps
// File: src/modules/audit/audit.model.ts

export interface AuditLogMetaData {
    user?: string;
    operation?: string;
    details?: any;
    status?: 'success' | 'failure';
    error?: string;
    [key: string]: any;
}