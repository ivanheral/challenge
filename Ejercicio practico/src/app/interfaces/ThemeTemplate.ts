export type ThemesTemplate = {
  [key: string]: ThemeTemplate;
};

export type ThemeTemplate = {
  form: string;
  label: string;
  control: string;
  field: string;
  gutter: string;
};

export type ThemeButtonsTemplate = {
  [key: string]: ThemeButtonTemplate;
};

export type ThemeButtonTemplate = {
  style: string;
  state: string;
};
