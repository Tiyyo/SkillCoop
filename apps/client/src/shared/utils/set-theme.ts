export function setLightTheme() {
  document.querySelector('html')?.setAttribute('data-theme', 'light');
}

export function setDarkTheme() {
  document.querySelector('html')?.setAttribute('data-theme', 'dark');
}
