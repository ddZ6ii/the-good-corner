import { pluralize } from "@/utils/format";
import { IssueData, RefinementCtx, ZodIssueCode } from "zod";

export const PASSWORD_CONSTRAINTS = {
  minLength: 12,
  maxLength: 40,
  minLowercase: 1,
  minUppercase: 1,
  minNumber: 1,
  minSymbol: 1,
};

const ALLOWED_SYMBOLS = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  "|",
  "\\",
  ":",
  ";",
  '"',
  "'",
  "<",
  ",",
  ">",
  ".",
  "?",
  "/",
];

function toRegExp(symbols: string[]): RegExp {
  const escapeSymbols: string[] = ["-", "]", "/", "\\"];
  const escapedString = symbols
    .map((symbol) => (escapeSymbols.includes(symbol) ? "\\" + symbol : symbol))
    .join("");
  return new RegExp(`[${escapedString}]`, "g");
}

function countUppercase(password: string): number {
  return (password.match(/[A-Z]/g) ?? []).length;
}

function countlowerCase(password: string): number {
  return (password.match(/[a-z]/g) ?? []).length;
}

function countNumber(password: string): number {
  return (password.match(/[0-9]/g) ?? []).length;
}

function countSymbol(password: string): number {
  const pattern = toRegExp(ALLOWED_SYMBOLS);
  return (password.match(pattern) ?? []).length;
}

export function isRobust(password: string, ctx: RefinementCtx): boolean {
  let robust = true;

  const {
    minLength,
    maxLength,
    minLowercase,
    minUppercase,
    minNumber,
    minSymbol,
  } = PASSWORD_CONSTRAINTS;

  const baseCustomIssue: IssueData = {
    code: ZodIssueCode.custom,
  };

  if (password.length < minLength || password.length > maxLength) {
    robust = false;
    ctx.addIssue({
      ...baseCustomIssue,
      message: `Between ${minLength.toString()} and ${maxLength.toString()} ${pluralize("character", minLength)} long`,
    });
  }

  if (countlowerCase(password) < minLowercase) {
    robust = false;
    ctx.addIssue({
      ...baseCustomIssue,
      message: `At least ${minLowercase.toString()} lowercase ${pluralize("letter", minLowercase)}`,
    });
  }

  if (countUppercase(password) < minUppercase) {
    robust = false;
    ctx.addIssue({
      ...baseCustomIssue,
      message: `At least ${minUppercase.toString()} uppercase ${pluralize("letter", minUppercase)}`,
    });
  }

  if (countNumber(password) < minNumber) {
    robust = false;
    ctx.addIssue({
      ...baseCustomIssue,
      message: `At least ${minNumber.toString()} ${pluralize("number", minNumber)}`,
    });
  }

  if (countSymbol(password) < minSymbol) {
    robust = false;
    ctx.addIssue({
      ...baseCustomIssue,
      message: `At least ${minSymbol.toString()} ${pluralize("symbol", minNumber)}`,
    });
  }

  return robust;
}
