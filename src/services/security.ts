import * as defaultPasswordRules from '../../config/password-rules.json';

export const checkPassword = (
  password: string,
  rules = defaultPasswordRules.rules,
) => {
  const errors: string[] = [];
  for (const rule of rules) {
    const regexRule = rule.regex.replace(/\/\//g, '/');
    if (!new RegExp(regexRule).test(password)) {
      errors.push(rule.message);
    }
  }

  return errors;
};
