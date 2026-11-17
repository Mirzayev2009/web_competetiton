export function validateName(value: string): string {
  return value.trim() ? "" : "Ismingizni kiriting.";
}

export function validateDays(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "Ijara muddatini kiriting.";
  if (/^-?\d+\.\d+$/.test(trimmed)) return "Kunlar soni butun son bo‘lishi kerak.";
  if (!/^-?\d+$/.test(trimmed)) return "Kunlar sonini raqam bilan kiriting.";
  if (Number(trimmed) < 1 || Number(trimmed) > 7) return "Ijara muddati 1 kundan 7 kungacha bo‘lishi kerak.";
  return "";
}
