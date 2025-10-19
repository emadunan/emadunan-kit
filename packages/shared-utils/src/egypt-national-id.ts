export function extractBirthdayFromEgyptianNationalId(id: string): string | null {
  const regex = /^[0-9]{14}$/;
  if (!regex.test(id)) return null;

  const centuryCode = id.substring(0, 1);
  const yearPart = id.substring(1, 3);
  const monthPart = id.substring(3, 5);
  const dayPart = id.substring(5, 7);

  const century =
    centuryCode === '1' ? 1800 :
    centuryCode === '2' ? 1900 : 2000;
  const year = century + Number(yearPart);
  const month = Number(monthPart);
  const day = Number(dayPart);

  const testDate = new Date(`${year}-${month}-${day}`);
  if (
    testDate.getFullYear() !== year ||
    testDate.getMonth() + 1 !== month ||
    testDate.getDate() !== day
  ) return null;

  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
