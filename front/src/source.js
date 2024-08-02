import process from "process";
export const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const devSource = 'http://localhost:3001/backend';
const prodSource = 'https://www.capyano.online/backend';

export const source = development ? devSource : prodSource ;