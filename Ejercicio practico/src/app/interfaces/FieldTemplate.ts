export type ValidatorTemplate = {
  type: string;
  value?: number;
  message?: string;
};

export type FieldTemplate = {
  label?: string;
  class?: string;
  type: string;
  input_type?: string;
  placeholder?: string;
  data?: any;
  inline?: boolean;
  control?: any;
  value?: string | string[] | boolean;
  validators?: Array<ValidatorTemplate>;
  show?: boolean;
  prop?: string;
  out?: string;
};

export type FormTemplate = {
  name: string;
  theme?: string;
  fields: Array<FieldTemplate>;
};

export type PatternTemplate = {
  [key: string]: string | string[] | boolean;
};

export type JsonValidatorTemplate = {
  [key: string]: ValidatorJsonTemplate;
};

export type ValidatorJsonTemplate = {
  type: string;
  pattern?: RegExp;
  message: string;
};

export type FormOutPutTemplate = {
  nameForm: string;
  valid: boolean;
  controlChanged: string | null | undefined;
  fields: PatternTemplate;
};
