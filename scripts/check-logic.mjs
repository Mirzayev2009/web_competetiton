import assert from "node:assert/strict";
import { TOOLS, getTool, formatSom } from "../lib/tools.ts";
import { validateDays, validateName } from "../lib/validation.ts";

assert.equal(TOOLS.length, 6);
assert.deepEqual(TOOLS.map(({ id, name, description, dailyPrice }) => ({ id, name, description, dailyPrice })), [
  { id: "A01", name: "Drel", description: "Teshish ishlari uchun", dailyPrice: 30000 },
  { id: "A02", name: "Narvon", description: "Uy ichidagi ishlar uchun", dailyPrice: 20000 },
  { id: "A03", name: "Proyektor", description: "Taqdimot uchun", dailyPrice: 100000 },
  { id: "A04", name: "Mikrofon", description: "Kichik tadbir uchun", dailyPrice: 40000 },
  { id: "A05", name: "Tikuv mashinasi", description: "Oddiy tikish ishlari uchun", dailyPrice: 60000 },
  { id: "A06", name: "Gilam tozalagich", description: "Gilam tozalash uchun", dailyPrice: 80000 },
]);
assert.equal(formatSom(getTool("A01").dailyPrice * 3), "90 000 so‘m");
assert.equal(formatSom(getTool("A03").dailyPrice * 2), "200 000 so‘m");

for (const value of ["1", "2", "3", "4", "5", "6", "7"]) assert.equal(validateDays(value), "", value);
for (const value of ["", "0", "8", "-1", "1.5", "1.0", "abc"]) assert.notEqual(validateDays(value), "", value);
assert.notEqual(validateName("   "), "");
assert.equal(validateName("  Dilshod  "), "");

console.log("Mantiq tekshiruvi o‘tdi: 6 asbob, narxlar va maydon tekshiruvi.");
