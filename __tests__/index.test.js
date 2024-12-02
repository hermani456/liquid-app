import { checkRut } from "@/utils/index";

describe("checkRut", () => {
  test("valid RUTs should return true", () => {
    const validRuts = [
      "12.345.678-5",
      "9.876.543-3",
      "1-9",
      "11.111.111-1",
      "29.963.945-2",
      "20.481.584-4",
      "7.616.417-7",
      "18.197.282-3",
    ];

    validRuts.forEach((rut) => {
      expect(checkRut(rut)).toBe(true);
    });
  });

  test("invalid RUTs should return false", () => {
    const invalidRuts = [
      "12.345.678-9",
      "9.876.543-0",
      "1-0",
      "11.111.111-2",
      "29.963.945-0",
      "20.481.584-2",
      "abcdefgh-i",
      "12345678",
      "",
      "12.345.678-",
      "-5",
      "12..345.678",
      "12.345.678",
      "19.876.543-K",
    ];

    invalidRuts.forEach((rut) => {
      expect(checkRut(rut)).toBe(false);
    });
  });

  test("handles lowercase verification digits", () => {
    const rut = "12.322.292-k";
    expect(checkRut(rut)).toBe(true);
  });

  test("handles RUTs without dots and dash", () => {
    const rut = "238715016";
    expect(checkRut(rut)).toBe(true);
  });

  test("handles RUTs with extra spaces", () => {
    const rut = " 15.445.894-8 ";
    expect(checkRut(rut)).toBe(true);
  });

  test("returns false for RUTs with too long numbers", () => {
    const rut = "123456789-0";
    expect(checkRut(rut)).toBe(false);
  });

  test("returns false for RUTs with 2 verification digits", () => {
    const rut = "11.425.144-55";
    expect(checkRut(rut)).toBe(false);
  });

  test("returns false for RUTs with 2 verification digits, and no dots and dash", () => {
    const rut = "1142514455";
    expect(checkRut(rut)).toBe(false);
  });

  test("returns false for RUTs with non-numeric characters in the body", () => {
    const rut = "12A345678-5";
    expect(checkRut(rut)).toBe(false);
  });
});
