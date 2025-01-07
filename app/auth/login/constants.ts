export const emailInputRules = [
  (value: string) => (value.trim() === "" ? "This field is required" : null),
  (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Invalid email format",
];

export const passwordInputRules = [
  (value: string) => (value.trim() === "" ? "This field is required" : null),
  (value: string) =>
    value.length < 8 ? "Password must be at least 8 characters long" : null,
  // (value: string) =>
  //   !/[A-Z]/.test(value)
  //     ? "Password must contain at least one uppercase letter"
  //     : null,
  // (value: string) =>
  //   !/[!@#$%^&*(),.?":{}|<>]/.test(value)
  //     ? "Password must contain at least one special character"
  //     : null,
  (value: string) =>
    /\s/.test(value) ? "Password must not contain spaces" : null,
];


