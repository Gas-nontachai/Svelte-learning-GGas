import { v4 as uuidv4 } from 'uuid';

export function generateId(prefix: string): string {
    const shortId = uuidv4().replace(/-/g, '').slice(0, 5); // เอา 5 ตัวแรกแบบไม่มี "-"
    return `${prefix}-${shortId}`;
}
