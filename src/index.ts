function strictText(value: string, max = 16384): void {
  if (typeof value !== 'string') throw new TypeError('Expected string');
  if (value.length > max) throw new RangeError('Text length budget exceeded');
}
function decimal(text: string, length: number): void {
  strictText(text, length);
  if (text.length !== length || /[^0-9]/.test(text))
    throw new RangeError('Exact ASCII digit count required');
}
function mod10(body: string): string {
  let sum = 0;
  for (let i = body.length - 1, weight = 3; i >= 0; i--, weight = 4 - weight)
    sum += Number(body[i]) * weight;
  return String((10 - (sum % 10)) % 10);
}
export function validateIsmn(code: string): boolean {
  decimal(code, 13);
  if (!code.startsWith('9790')) throw new RangeError('ISMN prefix9790 required');
  return mod10(code.slice(0, 12)) === code[12];
}
export function legacyToIsmn(code: string): string {
  strictText(code, 10);
  if (code.length !== 10 || code[0] !== 'M') throw new RangeError('Legacy M plus9digits required');
  decimal(code.slice(1), 9);
  const modern = '9790' + code.slice(1);
  if (!validateIsmn(modern)) throw new RangeError('ISMN checksum mismatch');
  return modern;
}
export function ismnToLegacy(code: string): string {
  if (!validateIsmn(code)) throw new RangeError('ISMN checksum mismatch');
  return 'M' + code.slice(4);
}
