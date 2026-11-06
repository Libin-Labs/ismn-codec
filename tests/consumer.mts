import { legacyToIsmn } from '@lp-labs/ismn-codec';
if (legacyToIsmn('M060115615') !== '9790060115615') throw new Error('ISMN');
// @ts-expect-error invalid argument must be rejected by declarations
legacyToIsmn(123);
