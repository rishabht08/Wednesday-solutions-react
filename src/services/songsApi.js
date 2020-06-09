import { generateApiClient } from '../utils/apiUtils';
const songsApi = generateApiClient('itunes');


export const getSongs = name =>{

 return  songsApi.get(`https://itunes.apple.com/search?term=${name}`);
}
