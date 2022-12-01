export const isEqualAddress = (
  addressA: string | number | undefined | null,
  addressB: string | number | undefined | null,
) => String(addressA).toLowerCase() === String(addressB).toLowerCase();
