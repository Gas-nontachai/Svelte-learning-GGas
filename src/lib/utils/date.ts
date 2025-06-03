/**
 * แปลงวันที่จาก ISO string (เช่น "2025-06-03T09:03:47.738Z")
 * ให้อยู่ในรูปแบบที่ต้องการ เช่น "DD/MM/YYYY", "YYYY-MM-DD HH:mm:ss"
 *
 * ฟอร์แมตที่รองรับ:
 *  - YYYY: ปี (เช่น 2025)
 *  - MM: เดือน 2 หลัก (เช่น 06)
 *  - DD: วันที่ 2 หลัก (เช่น 03)
 *  - HH: ชั่วโมง (00–23)
 *  - mm: นาที (00–59)
 *  - ss: วินาที (00–59)
 *
 * ตัวอย่างการใช้งาน:
 *  formatDate("2025-06-03T09:03:47.738Z", "DD/MM/YYYY")       -> "03/06/2025"
 *  formatDate("2025-06-03T09:03:47.738Z", "YYYY-MM-DD")       -> "2025-06-03"
 *  formatDate("2025-06-03T09:03:47.738Z", "HH:mm:ss")         -> "09:03:47"
 *  formatDate("2025-06-03T09:03:47.738Z", "YYYY-MM-DD HH:mm") -> "2025-06-03 09:03"
 *
 * @param isoString - วันที่ในรูปแบบ ISO string (เช่น "2025-06-03T09:03:47.738Z")
 * @param format - รูปแบบที่ต้องการให้แสดง (ดูรายการข้างบน)
 * @returns string - วันที่ในรูปแบบใหม่
 */
export function formatDate(isoString: string | Date, format: string = "DD/MM/YYYY"): string {
    if (!isoString) return '';

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';

    const pad = (n: number) => n.toString().padStart(2, '0');

    const components = {
        YYYY: date.getFullYear().toString(),          // ปี เช่น "2025"
        MM: pad(date.getMonth() + 1),                 // เดือน เช่น "06"
        DD: pad(date.getDate()),                      // วันที่ เช่น "03"
        HH: pad(date.getHours()),                     // ชั่วโมง เช่น "09"
        mm: pad(date.getMinutes()),                   // นาที เช่น "03"
        ss: pad(date.getSeconds())                    // วินาที เช่น "47"
    };

    // แทนที่โค้ดใน format ด้วยค่าที่เตรียมไว้
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, match => components[match as keyof typeof components] || match);
}
