export const EMAIL_MAX_LENGTH = 254;
export const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const PASSWORD_MAX_LENGTH = 20;
export const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,20}$/;

export const NAME_MAX_LENGTH = 254;

export const PHONE_NUMBER_MAX_LENGTH = 15;
export const PHONE_NUMBER_REGEX = /^01([0|1|6|7|8|9])-\d{3,4}-\d{4}$/;

export const NAME_REGEX = /^[가-힣]+$/;
