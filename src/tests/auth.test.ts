import {
  signupValidator,
} from "../domains/auth.impl";
import {
  JoinAgreement,
} from "../domains/auth.interface";

describe('회원가입', () => {
  const validator = signupValidator;

  it('필수 동의 정책에 동의해야합니다.', () => {
    const agreement: JoinAgreement = {
      isAgreeService: false,
      isAgreePrivacy: false,
      isAgreeMarketing: false
    }

    let received;

    received = validator.checkRequiredAgreement(agreement);
    expect(received).toBe(false);

    agreement.isAgreeMarketing = true;
    received = validator.checkRequiredAgreement(agreement);
    expect(received).toBe(false);

    agreement.isAgreePrivacy = true;
    received = validator.checkRequiredAgreement(agreement);
    expect(received).toBe(false);

    agreement.isAgreeService = true;
    received = validator.checkRequiredAgreement(agreement);
    expect(received).toBe(true);

    agreement.isAgreeMarketing = false;
    received = validator.checkRequiredAgreement(agreement);
    expect(received).toBe(true);
  });

  it('이메일 입력을 올바르게 했는지 체크합니다.', () => {
    const invalidEmails = [
      'plainaddress',                  // Missing "@" character
      'user@domain',                   // Missing top-level domain (TLD)
      '@domain.com',                   // Missing local part
      'user@domaincom',                // Missing dot in TLD
      'user@domain.',                  // TLD ending with a dot
      'user.@domain.com',              // Local part ending with a dot
      'user@.domain.com',              // Missing local part
      'user@-domain.com',              // Invalid character "-" at the beginning of domain
      'user@domain-.com',              // Invalid character "-" at the end of domain
      'user@sub.-domain.com',          // Invalid character "-" at the end of subdomain
      'user@sub.domain-.com',          // Invalid character "-" at the beginning of domain
      'user@sub..domain.com',          // Double dots in subdomain
      'user@domain..com',              // Double dots in domain
      'user@domain..com',              // Double dots in domain
      'user@[123.123.123.123]',        // IP address without brackets
      'user@[IPv6:::1]',               // Invalid IPv6 address format
      'user@.123.com',                 // Invalid character "." at the beginning of domain
      'user@domain.c-',               // Invalid character "-" at the end of TLD
    ];
    const validEmail = 'user@domain.com'

    invalidEmails.forEach((email) => {
      expect(validator.checkValidEmail(email)).toBe(false);
    });
    expect(validator.checkValidEmail(validEmail)).toBe(true);
  });

  it('비밀번호 입력을 올바르게 했는지 체크합니다.', () => {
    const invalidPasswords = [
      'Abc1@',            // Too short (less than 10 characters)
      'Abcdefghij12345',  // Valid length, but missing special character
      'Abcdefghij12345',  // Valid length, but missing uppercase character
      'ABCDEFGHIJ12345',  // Valid length, but missing lowercase character
      '1234567890@',      // Missing letters
      'abcdefghij@',      // Missing numbers
      'ABCDEFGHIJ@',      // Missing numbers
      'abcd1234@',        // Too short (less than 10 characters)
      'ABCD1234@',        // Too short (less than 10 characters)
      'Abcd12345',        // Missing special character
      'Abcdefghij12345@dafwer', // Too long (more than 20 characters)
    ];
    const validPassword = 'abcd12345@';

    invalidPasswords.forEach((password) => {
      expect(validator.checkValidPassword(password)).toBe(false);
    });
    expect(validator.checkValidPassword(validPassword)).toBe(true);
  });

  it('비밀번호가 일치하지 않는지 검증합니다', () => {
    const inputPassword = 'Abcd12345@';
    let confirmPassword = 'Bacd12345@';
    expect(validator.checkPasswordConfirmed(inputPassword, confirmPassword)).toBe(false);
    confirmPassword = inputPassword;
    expect(validator.checkPasswordConfirmed(inputPassword, confirmPassword)).toBe(true);
  });

  it('전화번호가 올바른지 검증합니다', () => {
    const invalidPhoneNumbers = [
      '110-123-4568',
      '012-1234-5789',
      '016-56-5435',
      '010-1234-567'
    ];
    const validPhoneNumber = '010-5789-4844';
    invalidPhoneNumbers.forEach((phoneNumber) => {
      expect(validator.checkValidPhoneNumber(phoneNumber)).toBe(false);
    });
    expect(validator.checkValidPhoneNumber(validPhoneNumber)).toBe(true);
  });
});
