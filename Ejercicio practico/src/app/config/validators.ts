export default {
  required: {
    type: "required",
    message: "VALIDATORS.REQUIRED",
  },
  min: {
    type: "minLength",
    message: "VALIDATORS.MIN",
  },
  max: {
    type: "maxLength",
    message: "VALIDATORS.MAX",
  },
  mail: {
    type: "pattern",
    pattern:
      /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)/,
    message: "VALIDATORS.MAIL",
  },
  phone: {
    type: "pattern",
    pattern: /[679]{1}[0-9]{8}/,
    message: "VALIDATORS.PHONE",
  },
  postal: {
    type: "pattern",
    pattern: /[0-5][1-9]{3}[0-9]/,
    message: "VALIDATORS.POSTAL",
  },
  date: {
    type: "pattern",
    pattern: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/,
    message: "VALIDATORS.DATE",
  },
};
