// https://stackoverflow.com/questions/1053902/how-to-convert-a-title-to-a-url-slug-in-jquery
export default function StringToSlug(text) {
  return text.toLowerCase()
             .replace(/ /g, '-')
             .replace(/[^\w-]+/g, '');
}